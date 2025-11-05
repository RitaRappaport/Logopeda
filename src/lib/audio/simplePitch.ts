/**
 * Bardzo lekki szacunek tonu podstawowego (pitch) metodą autokorelacji.
 * Zwraca Hz dla okna ~20ms; gdy brak tonu  0.
 */
export function estimatePitch(samples: Float32Array, sampleRate: number): number {
  // Hamming + autokorelacja
  const N = samples.length;
  const w = new Float32Array(N);
  for (let i=0; i<N; i++) w[i] = samples[i] * (0.54 - 0.46 * Math.cos((2*Math.PI*i)/(N-1)));

  const minF = 70, maxF = 450;
  const minLag = Math.floor(sampleRate / maxF);
  const maxLag = Math.floor(sampleRate / minF);

  let bestLag = 0, bestR = 0;
  for (let lag = minLag; lag <= Math.min(maxLag, N-1); lag++) {
    let r = 0;
    for (let i = 0; i < N - lag; i++) r += w[i] * w[i + lag];
    if (r > bestR) { bestR = r; bestLag = lag; }
  }
  return bestLag ? sampleRate / bestLag : 0;
}