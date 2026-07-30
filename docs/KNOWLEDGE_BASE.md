# Pillar I Knowledge Base

`src/data/theSelfKnowledge.ts` — the sourced background that rides along with every
Pillar I analysis request as the `knowledge` field, composed by `knowledgeBriefing()`
(~23,600 characters).

The purpose is narrow and worth stating plainly: it exists so the model **names
correctly what it observes in the analysand's material**, rather than improvising
plausible-sounding Jungian language. The prompt instructs it not to lecture — the
theory serves the reading of this person's work.

---

## Exports

| Export | Contents |
|---|---|
| `SELF_KNOWLEDGE` | 12 keyed entries, each tied to a curriculum module |
| `EMPIRICAL_STUDIES` | 21 outcome studies and historical cases |
| `CORE_COMPETENCIES` | 6 competencies from the Jungian competencies research |
| `TRAINING_PARAMETERS` | Analyst training thresholds — hours, supervision, pathways |
| `FOUNDATIONAL_SOURCES` | 16 primary works with topic tags |
| `SELF_CITATIONS` | 4 direct quotations with attribution |
| `SELF_BIBLIOGRAPHY` | 95 entries (43 PDF, 46 URL, 5 Markdown, 1 video) |
| `knowledgeFor(moduleId)` | Look up the entry attached to a module |
| `knowledgeBriefing()` | Compose everything into the model briefing |

---

## The 12 knowledge entries

| id | Topic |
|---|---|
| `active_imagination_alchemy` | The alchemy of active imagination and individuation |
| `active_imagination_architecture` | Jung and the architecture of active imagination (Chodorow) |
| `psychosynthesis_bridge` | Assagioli, Jung, and the psychosynthetic map |
| `subpersonality_harmonization` | Subpersonalities and the phases of harmonization (Vargiu) |
| `history_and_structure` | Historical context and the structure of the "I" |
| `lacanian_distinctions` | Theoretical precision: the I, the Ego, and the Subject |
| `empirical_foundations` | Empirical foundations of analytical psychology (Roesler) |
| `iaap_research_strategy` | Toward a coherent research strategy |
| `clinical_formation` | Professional training and clinical formation |
| `common_factors` | The Common Factors model |
| `long_term_benefits` | Long-term treatment and delayed benefit |
| `risks_and_ethics` | Risks of ineffective therapy — the ethical imperative |

The last four are deliberate. A self-analysis app that only carries the flattering
literature would be misleading, so the knowledge base also states what the outcome
evidence actually shows, that therapy can harm as well as help, and where the
practitioner competencies lie that this tool does not and cannot supply.

## Empirical studies (21)

Outcome research — PAL (Switzerland), PAP-S, the Berlin Jungian Study, Konstanz,
San Francisco, Stuttgart / German Institute (Roesler et al., 2025), and a systematic
review and meta-analysis of Jungian analysis — alongside historical case material:
Jung's own self-healing experiment (1913–16), the analysis of Miss X, the University
Man from the Tavistock Lectures, and the Word Association Experiment. Adjacent
evidence covers the Massachusetts General Hospital meditation study, the Beauregard
emotional-regulation studies, psychosynthesis counselling and training research, and
cinemeducation in psychiatric training.

## Recorded disagreements

Where sources conflict, the conflict is recorded rather than resolved silently. The
one live in this pillar: **Vargiu's phases of subpersonality harmonization** are given
as four in the source document supplied (recognition, acceptance, inclusion,
synthesis) and as five or six in the wider literature, which adds coordination and
integration. Both are noted in the entry, and the discrepancy is the teaching point.

---

## Safety constraints baked into the material

Enforced in `SYSTEM_PROMPT` (`server/prompts.ts`) and observed throughout the
knowledge base and curriculum:

- **Reality-based only.** No mysticism, magic, spirits, astrology, or energy presented
  as literal. Alchemical language appears strictly as Jung used it — as a symbolic
  vocabulary for psychological process — never as a claim about the world.
- **"Obsidian nature" = the shadow**, meaning disowned aspects of personality,
  cognition and behaviour.
- **No diagnosis, no treatment claims, no substitute for care.**
- **Crisis material** turns the output supportive and directs toward professional
  support rather than deeper analysis.

## Adding to it

1. Append to `SELF_KNOWLEDGE` with a `moduleId` matching an id in `theSelf.ts`.
2. Add sources to `SELF_BIBLIOGRAPHY` with the correct `kind`.
3. `knowledgeBriefing()` picks up new entries automatically — no wiring needed.
4. Watch the briefing size. It is sent on every request, so it costs tokens on every
   report; prune before it doubles.
