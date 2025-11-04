import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mic, Square, Play, Volume2, Star } from 'lucide-react'
import { useAppStore } from '../state/store'

function autoCorrelate(buf: Float32Array, sampleRate: number) {
  // Basic ACF pitch detector; returns frequency or -1
  let SIZE = buf.length
  let rms = 0
  for (let i=0; i<SIZE; i++) {
    const val = buf[i]
    rms += val*val
  }
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.01) return -1

  let r1 = 0, r2 = SIZE-1, thres = 0.2
  for (let i=0; i<SIZE/2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break }
  for (let i=1; i<SIZE/2; i++) if (Math.abs(buf[SIZE-i]) < thres) { r2 = SIZE-i; break }
  const buf2 = buf.slice(r1, r2)
  SIZE = buf2.length

  const c = new Array(SIZE).fill(0)
  for (let i=0; i<SIZE; i++) {
    for (let j=0; j<SIZE-i; j++) c[i] = c[i] + buf2[j]*buf2[j+i]
  }
  let d = 0; while (c[d] > c[d+1]) d++
  let maxval = -1, maxpos = -1
  for (let i=d; i<SIZE; i++) {
    if (c[i] > maxval) { maxval = c[i]; maxpos = i }
  }
  let T0 = maxpos
  const x1 = c[T0-1], x2 = c[T0], x3 = c[T0+1]
  const a = (x1 + x3 - 2*x2)/2
  const b = (x3 - x1)/2
  if (a) T0 = T0 - b/(2*a)
  return sampleRate / T0
}

export default function Studio(){
  const { t } = useTranslation()
  const addSession = useAppStore(s => s.addSession)
  const [isRec, setIsRec] = useState(false)
  const [refWord, setRefWord] = useState('für')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pitchRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const dataRef = useRef<Float32Array | null>(null)
  const rafRef = useRef<number | null>(null)

  const TARGETS: Record<string, [number, number]> = {
    'ich': [200, 300],   // target band (Hz) placeholder for fricative 'ç' (using energy proxy)
    'für': [180, 260],   // band suited to ü vowel F1 proxy via pitch - approximate
    'Bach': [100, 200],
    'schön': [170, 240],
    'rot': [120, 200]
  }

  function speak(word: string){
    try {
      const u = new SpeechSynthesisUtterance(word)
      u.lang = 'de-DE'; u.rate = 0.9
      speechSynthesis.cancel(); speechSynthesis.speak(u)
    } catch {}
  }

  async function start(){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStreamRef.current = stream
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioCtxRef.current = ctx
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    analyserRef.current = analyser
    const src = ctx.createMediaStreamSource(stream)
    src.connect(analyser)
    dataRef.current = new Float32Array(analyser.fftSize)
    setIsRec(true)
    loop()
  }

  function stop(){
    setIsRec(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    mediaStreamRef.current?.getTracks().forEach(t => t.stop())
    audioCtxRef.current?.close()
    mediaStreamRef.current = null
    audioCtxRef.current = null
    analyserRef.current = null
  }

  function loop(){
    const analyser = analyserRef.current
    if (!analyser) return
    const buf = dataRef.current!
    analyser.getFloatTimeDomainData(buf)

    // draw waveform
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    ctx.clearRect(0,0,c.width,c.height)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#1c7ed6'
    ctx.beginPath()
    const slice = c.width / buf.length
    for (let i=0;i<buf.length;i++){
      const x = i * slice
      const y = (0.5 + buf[i]/2) * c.height
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)
    }
    ctx.stroke()

    // pitch detection
    const pitchHz = autoCorrelate(buf, audioCtxRef.current!.sampleRate) // -1 if none
    const p = pitchRef.current!
    const pctx = p.getContext('2d')!
    pctx.clearRect(0,0,p.width,p.height)
    // draw target band
    const [lo, hi] = TARGETS[refWord] || [120, 240]
    pctx.fillStyle = 'rgba(18,184,134,0.2)'
    const yLo = p.height - (lo/500)*p.height
    const yHi = p.height - (hi/500)*p.height
    pctx.fillRect(0, Math.min(yLo,yHi), p.width, Math.abs(yHi-yLo))
    // draw current value
    if (pitchHz > 0 && pitchHz < 500){
      pctx.strokeStyle = '#1c7ed6'
      pctx.lineWidth = 4
      const y = p.height - (pitchHz/500)*p.height
      pctx.beginPath(); pctx.moveTo(0,y); pctx.lineTo(p.width,y); pctx.stroke()
      // score
      const center = (lo+hi)/2
      const dist = Math.abs(pitchHz - center)
      const rad = (hi - lo)/2
      const s = Math.max(0, 1 - dist / rad)
      setScore(Math.round(s*100))
    } else {
      setScore(0)
    }

    // schedule
    rafRef.current = requestAnimationFrame(loop)
  }

  async function save(){
    addSession({ ts: new Date().toISOString(), target: refWord, score })
  }

  async function recordOnce(){
    // quick recording to blob
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mr = new MediaRecorder(stream)
    const chunks: Blob[] = []
    mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data) }
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      stream.getTracks().forEach(t=>t.stop())
    }
    mr.start()
    setTimeout(()=> mr.stop(), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1" value={refWord} onChange={(e)=>setRefWord(e.target.value)}>
          {Object.keys(TARGETS).map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <button className="px-3 py-2 rounded bg-accent text-white flex items-center gap-2" onClick={()=>speak(refWord)}>
          <Play className="w-4 h-4"/>{t('play_ref')}
        </button>
        {!isRec ? (
          <button className="px-3 py-2 rounded border flex items-center gap-2" onClick={start}><Mic className="w-4 h-4"/>{t('record')}</button>
        ) : (
          <button className="px-3 py-2 rounded bg-red-500 text-white flex items-center gap-2" onClick={stop}><Square className="w-4 h-4"/>{t('stop')}</button>
        )}
        <button className="px-3 py-2 rounded border flex items-center gap-2" onClick={recordOnce}><Volume2 className="w-4 h-4"/>Demo</button>
        <div className="ml-auto flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500"/><span className="font-semibold">{t('score')}: {score}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-slate-600 mb-1">{t('wave')}</div>
          <canvas ref={canvasRef} width={600} height={180} className="w-full border rounded"/>
        </div>
        <div>
          <div className="text-sm text-slate-600 mb-1">{t('pitch_hit')}</div>
          <canvas ref={pitchRef} width={600} height={180} className="w-full border rounded"/>
        </div>
      </div>
      {audioUrl && <audio controls src={audioUrl} className="w-full"/>}
      <div className="flex justify-end">
        <button className="px-3 py-2 rounded border" onClick={save}>Zapisz sesję</button>
      </div>
    </div>
  )
}