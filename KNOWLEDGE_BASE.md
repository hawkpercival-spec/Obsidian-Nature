# Pillar II Knowledge Base

`src/data/archetypesKnowledge.ts` — the sourced background sent with every
`archetypal-pattern` request as the `knowledge` field, composed by
`archetypeKnowledgeBriefing()` (~14,200 characters).

Its purpose is narrower than Pillar I's. Pillar II's characteristic failure mode is
**inflation** — the reader recognising themselves in an archetype and quietly
concluding they are special. The knowledge base exists largely to let the model
*name that accurately when it sees it*.

---

## Exports

| Export | Contents |
|---|---|
| `ARCHETYPE_KNOWLEDGE` | 9 entries |
| `FRYE_MODES` | Northrop Frye's 5 fictional modes, as a diagnostic |
| `SEASONAL_ARCHETYPES` | Frye's 4 seasons → plot → mythic goal → psychological reading |
| `ARCHETYPE_QUOTES` | 6 attributed quotations |
| `ARCHETYPE_SOURCES` | 13 sources |
| `archetypeKnowledgeFor(id)` | Look up the entry attached to an archetype |
| `archetypeKnowledgeBriefing()` | Compose everything into the model briefing |

Alongside it, `src/data/archetypes.ts` carries **18 archetypes** — 6 structural (Ego,
Persona, Shadow, Anima, Animus, Self) and 12 figures (Great Mother, Father, Wise Old
Man/Senex, Divine Child, Kore/Maiden, Hero, Trickster, Wounded Healer, Syzygy, Puer
Aeternus, Mana Personality, Rebirth) — each with a shadow form, plus the **5
individuation movements**.

---

## The 9 entries

| id | Topic |
|---|---|
| `von_franz_method` | Von Franz's hermeneutic — how to read archetypal material |
| `pygmalion_effect` | Prophecy by expectation — the Pygmalion Effect |
| `frye_modes` | Frye's five modes and the deconstruction of the hero |
| `inflation_and_safety` | Inflation, the mana personality, and why this pillar stays grounded |
| `chosen_one_scholarship` | Peer-reviewed finding: collective belief *disrupts* individuation |
| `arrakis_as_psyche` | Arrakis as a map of the psyche |
| `seeker_and_liminality` | The Seeker, sacred restlessness, and liminality |
| `fairy_tales_and_diamond_body` | Fairy tales, the Gretel moment, and the diamond body |
| `maternal_imago_and_projection` | Shadow projection and the maternal imago |

## The method the prompt is built on

Von Franz's four steps, which structure every `archetypal-pattern` report:

1. **Expositional diagnosis** — the starting deficit or ossification in the conscious attitude
2. **Systematic psychic mapping** — protagonist = emerging ego; king = dominant conscious attitude; monsters = shadow; helpers = mediating functions
3. **Symbolic amplification** — connect motifs outward to myth so meaning exceeds personal association
4. **Psychodynamic synthesis** — did the psyche integrate, or regress?

## Frye's modes as an inflation diagnostic

The five modes are used here not as literary taxonomy but as a read on how a person
narrates their own life:

```
High Mimetic → Romance → Myth      ascent into inflation
Myth ──────────────────► Ironic    inflation collapses into captivity
Low Mimetic                        the grounded return
```

Someone narrating themselves upward through those modes is the pattern the model is
asked to name.

---

## A recorded disagreement

This one matters and is deliberately left unresolved in the material.

**Widyadhana & Haryanti (2026)**, *Language Literacy* — peer-reviewed, DOI
`10.30743/ll.v10i1.13847` — find that Paul Atreides' individuation **does not follow
Jung's ideal model**: his identity becomes "increasingly shaped by collective
expectations rather than personal integration." They read Herbert as *critiquing*
messianism, and argue Jungian criticism should attend to how collective belief
**disrupts** individuation.

This contradicts one of the source documents supplied for this pillar, *The Jungian
Architecture of Paul Atreides*, which holds that Paul successfully individuates.

Both readings are recorded, and the disagreement is itself the teaching point — being
recognised by a collective as exceptional is precisely what can *prevent* the inner
work, rather than evidence of it. That is the most useful thing this pillar can say to
someone who has started to feel chosen.

---

## Safety constraints baked into the material

Enforced in `SYSTEM_PROMPT` and in the `archetypal-pattern` prompt itself:

- **Archetypes are patterns to relate to, never identities to assume.** Stated
  explicitly in the prompt, not just implied by the material.
- **Inflation gets named.** The prompt directs the model: if the material shows someone
  feeling *chosen or special* rather than *more responsible*, say so plainly and gently.
- **Reality-based only.** Mythic and alchemical language is used as Jung used it — a
  symbolic vocabulary for psychological process, never a claim about the world. No
  prophecy, no destiny, no literal supernatural agency.
- **No fixed universal meanings.** The prompt forbids resolving a symbol to one
  meaning; it asks for working material instead.
- **No diagnosis, no treatment claims, no substitute for care.**

## Adding to it

1. Append to `ARCHETYPE_KNOWLEDGE` with an `id` matching an archetype in `archetypes.ts`.
2. Add sources to `ARCHETYPE_SOURCES` with author and date where known.
3. `archetypeKnowledgeBriefing()` picks up new entries automatically.
4. Watch the briefing size — it is sent on every `archetypal-pattern` request.
