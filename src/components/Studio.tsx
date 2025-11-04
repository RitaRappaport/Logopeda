import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mic, Square, Play, Upload, Save, Star } from 'lucide-react'
import { useAppStore } from '../state/store'

function autoCorrelate(buf: Float32Array, sampleRate: number) {
  let SIZE = buf.length
  let rms = 0
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.01) return -1

  let r1 = 0, r2 = SIZE - 1, thres = 0.2
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break }
  const buf2 = buf.slice(r1, r2)
  SIZE = buf2.length

  const c = new Array(SIZE).fill(0)
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) c[i] += buf2[j] * buf2[j + i]
  }
  let d = 0; while (c[d] > c[d + 1]) d++
  let maxval = -1, maxpos = -1
  for (let i = d; i < SIZE; i++) { if (c[i] > maxval) { maxval = c[i]; maxpos = i } }
  let T0: number = maxpos
  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1]
  const a = (x1 + x3 - 2 * x2) / 2, b = (x3 - x1) / 2
  if (a) T0 = T0 - b / (2 * a)
  return sampleRate / T0
}
const smooth = (prev: number, next: number, alpha = 0.3) => (prev < 0 ? next : prev * (1 - alpha) + next * alpha)

type TargetBand = [number, number]

export default function Studio() {
  const { t } = useTranslation()
  const addSession = useAppStore(s => s.addSession)

  const [refWord, setRefWord] = useState('für')
  const TARGETS: Record<string, TargetBand> = {
    ich: [200, 320],
    für: [170, 260],
    Bach: [100, 200],
    schön: [170, 240],
    rot: [120, 200],
  }

  // UŻYTKOWNIK — nagrywanie i analiza
  const [isRec, setIsRec] = useState(false)
  const [maxSeconds, setMaxSeconds] = useState(0) // 0 = bez limitu
  const [recordUrl, setRecordUrl] = useState<string | null>(null)

  const mediaStreamRef = useRef<MediaStream | null>(null)
  const mediaRecRef = useRef<MediaRecorder | null>(null)
  const micChunksRef = useRef<Blob[]>([])
  const stopTimerRef = useRef<number | null>(null)

  const micCtxRef = useRef<AudioContext | null>(null)
  const micAnalyserRef = useRef<AnalyserNode | null>(null)
  const rafMicRef = useRef<number | null>(null)
  const micWaveRef = useRef<HTMLCanvasElement>(null)
  const micPitchRef = useRef<HTMLCanvasElement>(null)
  const micPitchSmoothed = useRef(-1)

  // WZORZEC (native) — wgrywany plik i analiza
  const [refFileUrl, setRefFileUrl] = useState<string | null>(null)
  const audioElRef = useRef<HTMLAudioElement>(null)
  const refCtxRef = useRef<AudioContext | null>(null)
  const refAnalyserRef = useRef<AnalyserNode | null>(null)
  const rafRefRef = useRef<number | null>(null)
  const refWaveRef = useRef<HTMLCanvasElement>(null)
  const refPitchRef = useRef<HTMLCanvasElement>(null)
  const refPitchSmoothed = useRef(-1)

  // Zgodność (0–100)
  const [compat, setCompat] = useState(0)

  const drawWave = (cnv: HTMLCanvasElement, buffer: Float32Array, color = '#1c7ed6') => {
    const ctx = cnv.getContext('2d')!
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    ctx.lineWidth = 2
    ctx.strokeStyle = color
    ctx.beginPath()
    const slice = cnv.width / buffer.length
    for (let i = 0; i < buffer.length; i++) {
      const x = i * slice
      const y = (0.5 + buffer[i] / 2) * cnv.height
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const drawPitch = (cnv: HTMLCanvasElement, pitchHz: number, band: TargetBand, color = '#1c7ed6', bandColor = 'rgba(18,184,134,0.2)') => {
    const ctx = cnv.getContext('2d')!
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    const [lo, hi] = band
    const yLo = cnv.height - (Math.min(lo, 500) / 500) * cnv.height
    const yHi = cnv.height - (Math.min(hi, 500) / 500) * cnv.height
    ctx.fillStyle = bandColor
    ctx.fillRect(0, Math.min(yLo, yHi), cnv.width, Math.abs(yHi - yLo))
    if (pitchHz > 0 && pitchHz < 500) {
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      const y = cnv.height - (pitchHz / 500) * cnv.height
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cnv.width, y); ctx.stroke()
    }
  }

  async function startRec() {
    setRecordUrl(null) // czyść poprzednie

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStreamRef.current = stream

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    micCtxRef.current = ctx
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    micAnalyserRef.current = analyser
    const src = ctx.createMediaStreamSource(stream)
    src.connect(analyser)

    // MediaRecorder
    const mr = new MediaRecorder(stream)
    mediaRecRef.current = mr
    micChunksRef.current = []
    mr.ondataavailable = (e) => { if (e.data.size) micChunksRef.current.push(e.data) }
    mr.onstop = () => {
      const blob = new Blob(micChunksRef.current, { type: 'audio/webm' })
      setRecordUrl(URL.createObjectURL(blob))
    }
    mr.start()

    setIsRec(true)
    loopMic()

    if (maxSeconds > 0) stopTimerRef.current = window.setTimeout(() => stopRec(), maxSeconds * 1000)
  }

  function loopMic() {
    const analyser = micAnalyserRef.current
    if (!analyser || !micCtxRef.current || !micWaveRef.current || !micPitchRef.current) return

    // LOKALNY bufor = brak konfliktów typów
    const buf = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(buf)

    drawWave(micWaveRef.current, buf, '#1c7ed6')

    const pitch = autoCorrelate(buf, micCtxRef.current.sampleRate)
    micPitchSmoothed.current = smooth(micPitchSmoothed.current, pitch, 0.35)
    drawPitch(micPitchRef.current, micPitchSmoothed.current, TARGETS[refWord], '#1c7ed6')

    // zgodność jeśli mamy też wzorzec
    if (refPitchSmoothed.current > 0 && micPitchSmoothed.current > 0) {
      const [lo, hi] = TARGETS[refWord]
      const center = (lo + hi) / 2
      const rad = Math.max(20, (hi - lo) / 2)
      const dRef = Math.abs(refPitchSmoothed.current - center)
      const dMic = Math.abs(micPitchSmoothed.current - center)
      const sRef = Math.max(0, 1 - dRef / rad)
      const sMic = Math.max(0, 1 - dMic / rad)
      setCompat(Math.round(100 * (0.5 * sRef + 0.5 * sMic)))
    } else {
      setCompat(0)
    }

    rafMicRef.current = requestAnimationFrame(loopMic)
  }

  function stopRec() {
    setIsRec(false)
    if (rafMicRef.current) cancelAnimationFrame(rafMicRef.current)
    if (stopTimerRef.current) { clearTimeout(stopTimerRef.current); stopTimerRef.current = null }
    mediaRecRef.current?.stop()
    mediaStreamRef.current?.getTracks().forEach(t => t.stop())
    micCtxRef.current?.close()
    micAnalyserRef.current = null
    mediaRecRef.current = null
    mediaStreamRef.current = null
    micCtxRef.current = null
  }

  function saveSession() {
    addSession({ ts: new Date().toISOString(), target: refWord, score: compat })
  }

  function speak(word: string) {
    try {
      const u = new SpeechSynthesisUtterance(word)
      u.lang = 'de-DE'
      u.rate = 0.9
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    } catch {}
  }

  function onPickRefFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setRefFileUrl(URL.createObjectURL(f))
  }

  async function setupRefAnalyser() {
    if (!audioElRef.current) return
    refCtxRef.current?.close()
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    refCtxRef.current = ctx
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    refAnalyserRef.current = analyser
    const src = ctx.createMediaElementSource(audioElRef.current)
    src.connect(analyser)
    analyser.connect(ctx.destination)
    loopRef()
  }

  function loopRef() {
    const analyser = refAnalyserRef.current
    if (!analyser || !refCtxRef.current || !refWaveRef.current || !refPitchRef.current) return

    const buf = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(buf)

    drawWave(refWaveRef.current, buf, '#0ea5e9')
    const pitch = autoCorrelate(buf, refCtxRef.current.sampleRate)
    refPitchSmoothed.current = smooth(refPitchSmoothed.current, pitch, 0.35)
    drawPitch(refPitchRef.current, refPitchSmoothed.current, TARGETS[refWord], '#0ea5e9', 'rgba(18,184,134,0.15)')

    rafRefRef.current = requestAnimationFrame(loopRef)
  }

  useEffect(() => {
    return () => {
      if (rafMicRef.current) cancelAnimationFrame(rafMicRef.current)
      if (rafRefRef.current) cancelAnimationFrame(rafRefRef.current)
      mediaStreamRef.current?.getTracks().forEach(t => t.stop())
      micCtxRef.current?.close()
      refCtxRef.current?.close()
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Sterowanie */}
      <div className="flex flex-wrap items-center gap-2">
        <select className="border rounded px-2 py-1" value={refWord} onChange={(e) => setRefWord(e.target.value)}>
          {Object.keys(TARGETS).map(k => <option key={k} value={k}>{k}</option>)}
        </select>

        <button className="px-3 py-2 rounded bg-accent text-white flex items-center gap-2" onClick={() => speak(refWord)}>
          <Play className="w-4 h-4" /> Odtwórz wzorzec (TTS)
        </button>

        {!isRec ? (
          <button className="px-3 py-2 rounded border flex items-center gap-2" onClick={startRec}>
            <Mic className="w-4 h-4" /> Start nagrywania
          </button>
        ) : (
          <button className="px-3 py-2 rounded bg-red-500 text-white flex items-center gap-2" onClick={stopRec}>
            <Square className="w-4 h-4" /> Stop
          </button>
        )}

        <label className="text-sm ml-2">
          Limit (sek):
          <input
            type="number"
            min={0}
            className="ml-1 w-16 border rounded px-1 py-0.5"
            value={maxSeconds}
            onChange={(e) => setMaxSeconds(Math.max(0, Number(e.target.value)))}
            title="0 = bez limitu"
          />
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">Zgodność: {compat}%</span>
        </div>
      </div>

      {/* Wzorzec (native) */}
      <div className="border rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <label className="px-3 py-2 rounded border flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Wgraj plik wzorcowy (native)</span>
            <input type="file" accept="audio/*" onChange={onPickRefFile} className="hidden" />
          </label>
          {refFileUrl && (
            <audio ref={audioElRef} src={refFileUrl} controls onPlay={setupRefAnalyser} className="ml-2" />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">Wzorzec — fala</div>
            <canvas ref={refWaveRef} width={600} height={140} className="w-full border rounded" />
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Wzorzec — pitch / pasmo</div>
            <canvas ref={refPitchRef} width={600} height={140} className="w-full border rounded" />
          </div>
        </div>
      </div>

      {/* Użytkownik */}
      <div className="border rounded p-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">Użytkownik — fala</div>
            <canvas ref={micWaveRef} width={600} height={140} className="w-full border rounded" />
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Użytkownik — pitch / pasmo</div>
            <canvas ref={micPitchRef} width={600} height={140} className="w-full border rounded" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-slate-600">
            Po „Stop” pojawi się nagranie do odsłuchu i pobrania.
          </div>
          <button className="px-3 py-2 rounded border flex items-center gap-2" onClick={saveSession}>
            <Save className="w-4 h-4" /> Zapisz sesję
          </button>
        </div>

        {recordUrl && (
          <div className="mt-2">
            <audio controls src={recordUrl} className="w-full" />
            <a className="text-sm underline" href={recordUrl} download={`nagranie-${Date.now()}.webm`}>Pobierz nagranie</a>
          </div>
        )}
      </div>
    </div>
  )
}
