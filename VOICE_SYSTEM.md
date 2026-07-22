# DFN AI — Voice System

## Phase 1 (implemented): browser-native voice

The AI widget's voice input and output run entirely on browser APIs — no
backend, no API key, no per-use cost, works offline once the page has
loaded. Implementation lives in `initAIChat()` in `script.js`.

**Voice input** — the mic button (`#dfn-ai-mic`) calls the
[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)'s
`SpeechRecognition` (`webkitSpeechRecognition` on Chrome/Safari). Transcribed
speech populates the input field and sends automatically.

**Voice output** — the speaker toggle (`#dfn-ai-voice-toggle`) calls
`speechSynthesis.speak()` on each bot reply when enabled. Off by default —
autoplaying audio without explicit opt-in is bad practice regardless of how
good the feature is.

**Browser compatibility:** `SpeechRecognition` has real gaps — solid on
Chrome and Edge (desktop and Android), unsupported on Firefox, and Safari's
support has historically been inconsistent across versions. `speechSynthesis`
has materially broader support. Both buttons are **feature-detected and
hidden entirely** when unsupported (`hidden` attribute removed only after
checking `window.SpeechRecognition || window.webkitSpeechRecognition` /
`'speechSynthesis' in window`) — visitors on unsupported browsers simply
never see a voice control that wouldn't work. No error states, no dead
buttons.

**Security considerations:** microphone access requires a user gesture (the
mic button click) and the browser's own permission prompt — nothing in this
implementation requests or retains microphone access outside that. No audio
is recorded, stored, or transmitted anywhere; `SpeechRecognition` returns
transcribed text directly to the page. `speechSynthesis` reads text that's
already public (the bot's own reply) — no data leaves the browser for
either feature.

**Performance:** zero added page weight. Both are native browser APIs
referenced conditionally at click-time, not libraries loaded on page load.

## Phase 2 (not implemented): swappable provider architecture

The spec called for an abstraction layer so a cloud voice provider (OpenAI,
ElevenLabs, Google Cloud TTS, Azure Speech) could later replace the browser
engine without rebuilding the interface. That abstraction is straightforward
in principle — wrap `speak(text)` and the recognition-start call behind an
interface with two implementations (`browserVoiceProvider`,
`cloudVoiceProvider`) and a config flag selecting which one loads — but
building it now, with no cloud provider actually wired up, means designing
against a contract with no real implementation to validate it against. That
usually produces an abstraction shaped wrong for the API it never actually
met.

**The real prerequisite is the same one in `AI_SYSTEM.md`: a backend.** Every
cloud voice provider listed requires a server-side API key for the same
reason a cloud text model does — it can't live in client JavaScript. Once
there's a backend serving the conversational AI (Phase 2 of the AI system
generally), adding a `voiceProvider` config flag to route `speak()` through
either `speechSynthesis` or a fetch to that backend is a small addition, not
a redesign. Sequenced in `ROADMAP.md` as part of the same backend milestone,
not a separate one — building voice-provider abstraction before the backend
it's abstracting over would be solving a problem that doesn't exist yet.

## Phase 3 (not implemented): an official DFN voice

Contingent on Phase 2 existing, plus a properly authorized voice model
trained on the founder's own recordings, plus whichever provider's consent
and usage terms govern that. Not a code task at this stage — it's a
content/licensing/consent question that has to be resolved before any
implementation work is worth doing. Listed in `ROADMAP.md`'s long-term
section for exactly that reason.

## Accessibility

Both controls are real `<button>` elements — keyboard-reachable, with
`aria-label`s that update based on state (`Mute spoken replies` vs.
`Read replies aloud`), and `aria-pressed` on the voice toggle so screen
readers announce its current state correctly. The mic button gets a
`.listening` class (pulsing animation, respects `prefers-reduced-motion`
via the site-wide rule) while actively capturing speech, so there's a visual
status indicator beyond just the button having been clicked.
