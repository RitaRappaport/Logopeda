import React, { useEffect, useRef, useState } from 'react';
import { estimatePitch } from '../lib/audio/simplePitch';

type Unit = {
  phoneme: string;
  letter: string;
  examples: string[];
  hint_articulation: string;
  native_sample?: string;
};

export default function ExercisePlayer({ unit }: { unit: Unit }) {
  const [recStream, setRecStream] = useState<MediaStream | null>(null);
  const [recChunks, setRecChunks] = useState<Blob[]>([]);
  const [recUrl, setRecUrl] = useState<string | null>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const nativeRef = useRef<HTMLAudioElement | null>(null);
  const userRef = useRef<HTMLAudioElement | null>(null);

  // prosta wizualizacja: pitch na żywo, porównanie po odtworzeniu
  const [nativePitch, setNativePitch] = useState<number>(0);
  const [userPitch, setUserPitch] = useState<number>(0);
  const [similarity, setSimilarity] = useState<number>(0);

  // prosta analiza z WebAudio
  function analyzePitch(el: HTMLAudioElement, set: (v: number) => void) {
    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(el);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    src.connect(analyser);
    analyser.connect(ctx.destination);

    const buf = new Float32Array(analyser.fftSize);
    let raf = 0;
    const tick = () => {
      analyser.getFloatTimeDomainData(buf);
      const hz = estimatePitch(buf, ctx.sampleRate);
      set(hz || 0);
      raf = requestAnimationFrame(tick);
    };
    el.onplay = () => {
      raf = requestAnimationFrame(tick);
    };
    el.onpause = el.onended = () => {
      cancelAnimationFrame(raf);
    };
  }

  useEffect(() => {
    if (nativeRef.current) analyzePitch(nativeRef.current, setNativePitch);
    if (userRef.current) analyzePitch(userRef.current, setUserPitch);
  }, []);

  useEffect(() => {
    if (!nativePitch || !userPitch) {
      setSimilarity(0);
      return;
    }
    // bardzo prosty wskaźnik zgodności ~ im bliżej, tym lepiej
    const ratio = Math.min(nativePitch, userPitch) / Math.max(nativePitch, userPitch);
    setSimilarity(Math.round(ratio * 100));
  }, [nativePitch, userPitch]);

  async function startRec() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setRecStream(stream);
    const mr = new MediaRecorder(stream);
    mediaRecRef.current = mr;
    const chunks: Blob[] = [];
    setRecChunks(chunks);
    mr.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setRecUrl(url);
    };
    mr.start();
  }
  function stopRec() {
    mediaRecRef.current?.stop();
    recStream?.getTracks().forEach((t) => t.stop());
    setRecStream(null);
  }

  return (
    <div className="p-4 rounded-2xl border border-gray-200">
      <div className="text-xl font-semibold mb-1">
        /{unit.phoneme}/ {unit.letter}
      </div>
      <div className="text-sm opacity-70 mb-2">{unit.hint_articulation}</div>
      <div className="text-sm mb-3">
        <b>Przykłady:</b> {unit.examples.join(', ')}
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        {unit.native_sample ? (
          <>
            <audio ref={nativeRef} src={unit.native_sample} controls preload="none" />
            <span className="text-xs">Pitch native: {Math.round(nativePitch)} Hz</span>
          </>
        ) : (
          <div className="text-xs opacity-60">Brak nagrania native (dodamy później)</div>
        )}

        <div className="flex items-center gap-2">
          {!recStream ? (
            <button onClick={startRec} className="px-3 py-1 rounded-lg border">
              Start
            </button>
          ) : (
            <button onClick={stopRec} className="px-3 py-1 rounded-lg border">
              Stop
            </button>
          )}
          {recUrl && (
            <>
              <audio ref={userRef} src={recUrl} controls />
              <span className="text-xs">Pitch user: {Math.round(userPitch)} Hz</span>
            </>
          )}
        </div>

        <div className="ml-auto text-sm">
          Zgodność (pitch): <b>{similarity}%</b>
        </div>
      </div>
    </div>
  );
}
