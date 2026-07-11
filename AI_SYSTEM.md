# The DFN AI Widget

## What it actually is today

A keyword-matched FAQ bot with real navigation actions and optional voice
I/O. Not a language model. Not connected to any API. Runs entirely in the
visitor's browser, in `AI_KB` and `aiAnswer()` in `script.js` — no server,
no API key, no per-message cost, works offline once the page has loaded.

**How matching works:** each `AI_KB` entry has `keys` (trigger substrings)
and `ans` (the reply). `aiAnswer()` lowercases the question and returns the
first entry where any key appears anywhere in it. This is fast and has zero
failure modes (it can't hallucinate, can't go off-brand, can't leak
anything, can't run up a bill) but it is exactly as limited as it sounds: it
matches text patterns, not intent. Ask it something adjacent to a known
topic in different words and it falls through to the generic
"email us" response.

**What's new in this pass:**
- **Navigation actions.** Any `AI_KB` entry can carry a `nav: {label, href}`.
  The chat renders a real button under the reply — click it and it either
  smooth-scrolls to an in-page section or navigates to another page. This is
  the "AI can navigate the site" capability from the spec, implemented
  honestly: the AI suggests, the visitor clicks, nobody gets redirected out
  from under themselves mid-read.
- **Voice input.** A mic button (hidden unless the browser supports
  `SpeechRecognition`/`webkitSpeechRecognition`) transcribes speech into the
  input field and sends it automatically.
- **Voice output.** A toggle (hidden unless `speechSynthesis` exists) reads
  bot replies aloud via the browser's built-in text-to-speech. Off by
  default — autoplaying audio without a clear opt-in is bad practice.

Both voice features are genuinely free and require no backend: they call
browser APIs directly. That's also their ceiling — quality and language
support depend entirely on the visitor's browser and OS, not on anything
DFN Worldwide controls.

## What it is not (yet)

It doesn't understand the books' actual content, can't hold a real
back-and-forth conversation, can't answer anything not explicitly
anticipated in `AI_KB`, and can't take real actions beyond "show a link"
(it can't submit a form, look anything up, or reason about a question it
hasn't seen a version of before). The "AI Omega" vision — a system that
actually understands the books, reasons about visitor intent, and holds a
real conversation — is a fundamentally different thing to build, not an
upgrade to this one.

## What closing that gap actually requires

A real conversational AI needs a language model call per message, and a
language-model API key can never live in client-side JavaScript — anyone
who opens dev tools would have it within seconds, and it would be used on
someone else's dime by the end of the week. There is no way around this; it
is not a DFN-specific limitation, it's how API authentication works.

That means: **a backend.** Concretely, one of:
- A small serverless function (Cloudflare Workers, Vercel/Netlify
  Functions) that the chat widget calls instead of matching `AI_KB`
  locally. The function holds the API key, calls an LLM API (Anthropic,
  OpenAI, or others all work the same way here), and returns the reply.
  This is the lightest-weight real option — no server to patch or restart,
  usage-based cost, can often run on a free tier at this traffic level.
- A small persistent server (Node/Python) if you want more control —
  more to maintain, no real benefit over serverless at this scale.

Either way, the effort is roughly: stand up one function, feed it the
book content and site knowledge as context (or as a small retrieval index
if the content grows), point the existing chat UI at it instead of
`aiAnswer()`, keep `AI_KB` as an instant, zero-cost fallback for when the
API is unreachable. The UI in this repo — messages, typing indicator,
action buttons, voice I/O — barely changes; only where the reply comes
from does.

This is sequenced in `ROADMAP.md` rather than attempted here, because doing
it without a real budget and content-ingestion decision would mean either
faking it (an API call to something that doesn't exist) or quietly
skipping it — neither is honest engineering.
