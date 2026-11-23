# Product plan

## ICP and JTBD

The ICP is a family organizer with a milestone event in 30 days, responsible for entertaining 50-100 mixed-age guests. When they have volunteered to make the event personal, help them turn scattered memories into a polished, easy-to-host 20-30 minute show so the room laughs and connects without the organizer becoming a producer.

## MVP

Story intake with contributor/source, explicit publish approval, structured fact check, three deterministic round formats, editable host cues, timed run of show, large-type host view, and rehearsal checklist. Concierge staff retain editorial control. Exclude open-ended auto-generation, photo recognition, payments, guest PII import, and recurring SaaS until the paid service works.

## Data model

`Event`, `Honoree`, `Organizer`, `Contributor`, `Story`, `Consent`, `Fact`, `MediaAsset`, `Round`, `Prompt`, `Answer`, `HostCue`, `ShowVersion`, `Rehearsal`, and `ReferralPartner`. A round references approved fact/version IDs; publication requires consent and fact-check state.

## Technical architecture

Next.js exports the demo and future organizer review surface. FastAPI validates structured stories and compiles approved facts into a versioned run of show. Object storage and PostgreSQL arrive only with real customers; signed upload URLs, per-event isolation, retention controls, audit logs, and encrypted backups are mandatory before accepting family media. A worker can render slides/PDFs asynchronously.

## AI/model strategy

No model is required for this demo. Later, transcription can create attributed drafts and an LLM can propose questions/cues from approved facts, but humans approve every factual statement and sensitive story. Log source span, prompt/model version, edits, and approval. Never infer identities, relationships, medical history, or consent. Deterministic templates remain the safe fallback.

## Economics

Ladder: free sample; $29 PDF; $249 Signature Show; $399 rehearsal package. At $249, five operator hours implies $49.80 gross revenue/hour before acquisition and overhead; eight hours drops to $31.13. The operating target is under five hours through structured intake and reusable production blocks. The report's $5,760/90-day model depends on unverified Etsy, Reddit, and venue conversions.

## Validation, moat, and risks

Charge for ten concierge productions before building more. Measure sample-to-pay, operator minutes by stage, correction rate, show completion, referral source, and venue repeat. Moat can compound through a trusted venue channel, permissioned format performance data, and a production workflow; generic prompts are not a moat. Risks: episodic demand, cheap-template anchors, sensitive-story harm, media privacy, copyright, large-room failure, labor gravity, and incumbent services.

## 30/60/90 days

- **30:** 15 qualified organizer calls, 10 sample rounds, first three paid shows; instrument production time and revision causes.
- **60:** deliver 10 paid shows, sign three venue/planner partners, standardize consent/fact-check/rehearsal; require median time below five hours.
- **90:** reach 10 orders at $200+ AOV, test partner referral economics and the $399 tier; stop or reframe if partner referrals and labor targets miss.
