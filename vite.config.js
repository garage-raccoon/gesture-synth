import { defineConfig } from "vite";

const MEDIAPIPE_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/";
const MEDIAPIPE_MODELS = "https://storage.googleapis.com/mediapipe-models/";

const devContentSecurityPolicy = [
  "default-src 'none'",
  `script-src 'self' 'wasm-unsafe-eval' ${MEDIAPIPE_WASM}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob: mediastream:",
  `connect-src 'self' ws://localhost:5173 ${MEDIAPIPE_WASM} ${MEDIAPIPE_MODELS}`,
  "base-uri 'none'",
  "form-action 'none'",
].join("; ");

export default defineConfig({
  server: {
    port: 5173,
    // ws:// in the policy is tied to this port, so fail rather than drift to another one.
    strictPort: true,
    headers: { "Content-Security-Policy": devContentSecurityPolicy },
  },
});
