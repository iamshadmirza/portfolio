---
title: "We Were Writing One-Pagers. Nobody Was Reading Them."
description: "I built to-onepager, a Cursor skill that turns research and decision chats into short, typed one-pagers and publishes them where your team already reads."
date: 2026-09-17
tag: cursor, skills, knowledge-sharing, writing
canonical: https://iamshadmirza.com/posts/to-onepager
---

Our team already shared one-pagers for findings, knowledge dumps, and proposals. That was not the problem.

The problem was everything around them.

Docs ran long, so review turned into skim-and-approve. Structure drifted with whoever wrote last, which usually meant whoever asked an LLM to "make a doc." Links lived in Slack threads and DMs. Two weeks later, the useful page was gone and someone re-litigated the same claim from chat scrollback.

So I built **to-onepager**: a Cursor skill that turns a research or decision conversation into a short, typed one-pager, grounds every claim in the transcript, and publishes it to one place your team already opens (local Markdown, Google Docs, or Confluence).

```bash
npx skills add iamshadmirza/to-onepager -g -a cursor
```

Then `/to-onepager` on the current chat, or pass a transcript path.

## The four failures we kept hitting

1. **People did share.** Knowledge sharing was not missing. The format was broken.
2. **Length killed review.** If a cold reader cannot get the claim in seconds, they will not give a real Ground pass. They will nod and move on.
3. **No shared spine.** Without a fixed structure, every doc became "whatever the model found fit." Same team, incompatible shapes, no muscle memory for where Finding, Confidence, or Alternatives live.
4. **No central home.** A good page in a random Drive folder or a Slack paste is a temporary object. Search fails. Reuse fails. Cross-team sharing fails.

> **I needed pages that are short enough to review, structured enough to scan, grounded enough to trust, and stored where the next person can find them.**

## What I ship instead of "summarize this"

`/to-onepager` is a pipeline, not a vibes prompt:

| Step | Job |
| --- | --- |
| **Setup** | One destination: `local`, `google-docs`, or `confluence` |
| **Mine** | Intent, assumptions, sourced facts, open questions |
| **Route** | Exactly one page type |
| **Distill** | Fill that type's template for easy reading |
| **Ground** | Fail and edit until quality checks pass |
| **Publish** | Land in the configured store (or Markdown fallback) |

Hard constraints that map to the pain above:

* **One-page budget:** about 600 words of prose. Cut ideas. Do not shrink type. Keep experiment smoking-gun tables.
* **Lead with the claim:** title and Finding open with the number, verdict, or bet. Context follows.
* **No invented follow-ups:** closed research can say Recommendation: `None`. The model does not invent a week plan to look complete.
* **Grounded or it does not ship:** every factual cell/bullet traces to the transcript.
* **Publish once, find later:** Docs/Confluence folder (or a local `one-pagers/` dir) becomes the accumulation point instead of Slack archaeology.

Use the page as a **meeting pre-read**: share ahead or read in silence at the start, then discuss. The page carries context so the meeting does not.

## One master template was the first wrong turn

I started with a single spine for everything. That felt efficient. It broke fast.

A research spike that answers "what is true?" is not the same object as a decision bet that asks for a path. Stuffing both into one master doc produced hybrids: soft Problem sections on pure measurements, fake How sections on closed findings, and reviewers who never knew which section was load-bearing.

So I typed the pages and shipped **two** templates first:

| Page type | Job |
| --- | --- |
| `research-finding` | Empirical claim: Question, Answer, Findings (or an experiment spine when you compare N conditions) |
| `proposal` | Decision bet: Problem / What / Why / How, plus Alternatives |

Route announces the choice before drafting. Prefer `research-finding` when unclear. Ask once if both fit.

For multi-condition experiments (caps, modes, A/B arms), research pages use a dedicated **experiment spine**: Finding as a verdict ladder, one section per condition (Verdict then Analysis), proof tables preserved. That is still the same page type, not a third template, because the job is still "what is true?"

## How this helps teams move fast (and share across teams)

**Faster review.** Short + fixed Answer chrome (Finding, Confidence, So what) means a reviewer can reject or accept the claim without reading a novel.

**Faster meetings.** Pre-read replaces "let me recreate the deck from memory." Discussion starts at disagreement, not re-narration.

**Faster handoff across teams.** Same spines mean a stranger knows where the bet, the evidence, and the alternatives live. Cross-sharing stops depending on who wrote the doc.

**Faster search later.** Publish to one configured destination. The useful page accumulates in a folder/space instead of evaporating in chat.

**Honest closure.** Not every session needs next steps. Saying `None` is a feature. Invented roadmaps were one reason docs got long and untrustworthy.

## What is next

Live set stays at **two** until a real transcript cannot fit without lying. I parked the catalog exploration in [issue #1](https://github.com/iamshadmirza/to-onepager/issues/1) so we do not re-debate from scratch. **Do not implement a third type** until a blind test or real session forces it.

Strong next candidates when forced:

| Page type | Use when | Why it earns a slot |
| --- | --- | --- |
| `verification` | QA / bakeoff / regression against a known bar | Pass/Fail/Blocked + coverage gaps; research spine invents fake assumptions |
| `architecture` | Structural change with alternatives and consequences | ADR-lite; proposal How gets overloaded |
| `incident` / `postmortem` | Outage or near-miss write-up | Timeline, impact, root cause, actions |
| `decision-log` | Single decision already made; need the record | Lighter than proposal; "we chose X because…" |

Inclusion rule: add a type only when it is a **new speech act** and a cold reader needs a **different first screen**. Same speech act with extra fields means fill notes, not a new template. Six-pagers, RFCs, and deep dives stay as Go deeper links. Speculative types (`customer-insight`, `hiring`, `status`, and friends) stay YAGNI until those sessions actually repeat.

Suggested order when we do start:

1. Keep 2 until blind tests hurt.
2. Add `verification` first if the next miss is QA-shaped.
3. Add `architecture` or `incident` next, whichever transcripts actually produce.
4. Everything else stays Go deeper until a miss repeats.

## Call for use

If your team already "does one-pagers" but review is weak, structure is random, and good pages disappear after share, try the pipeline on a real transcript:

```bash
npx skills add iamshadmirza/to-onepager -g -a cursor
```

Run `/to-onepager setup`, point publish at your team folder, then `/to-onepager` on the session you would otherwise paste into Slack.

* Repo: https://github.com/iamshadmirza/to-onepager
* Listing: https://skills.sh/iamshadmirza/to-onepager

## Feedback I want

* Did length + Ground make review real again?
* Did typed spines beat one master template for your sessions?
* Did central publish make last month's finding findable?
* Which forced miss are you hitting first: verification, architecture, incident, or decision-log?

Open an issue or PR. Use and adapt. The bet is simple: short typed pages in one place beat long freeform docs scattered across chat.
