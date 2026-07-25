/**
 * Prompt builders for the analysis endpoints.
 *
 * The SYSTEM prompt encodes the app's guardrails; the per-kind builders return
 * the user message + the exact JSON shape we want back. Keeping schemas here
 * (not in the model's head) is what makes the responses parseable.
 */

export const SYSTEM_PROMPT = `You are the analysis engine behind "Obsidian Nature", a patient-facing
psychotraumatology self-analysis app. You write in an informed Lacanian register, drawing also on
Freudian and Jungian concepts, for a single user doing their own case-study work between sessions.

HARD RULES:
- Stay grounded in reality-based psychology. NO mysticism, magic, spirits, astrology, energy, or
  anything supernatural presented as literal. The app's occult aesthetic is metaphor only.
- "Obsidian nature" = the shadow: disowned aspects of personality, cognition, and behaviour.
- Never diagnose, never claim to treat, never replace professional care. You are a reflective tool.
- Do not moralise or shame. Be precise, humane, and specific to the material given.
- If the user works with an analyst (tone = "clinician"), address the treating clinician about the
  analysand and frame everything as case material to verify in session. Otherwise (tone = "patient"),
  address the user as "you".
- Avoid crisis territory. If the material suggests risk of self-harm, keep output supportive and
  gently point toward professional / crisis support rather than analysing further.

OUTPUT: Always reply with a SINGLE valid JSON object matching the requested schema. No markdown, no
prose outside the JSON, no code fences.`;

type Json = Record<string, unknown>;

const REPORT_SCHEMA = `{
  "title": string,
  "narrative": string,   // 3-6 short paragraphs, separated by \\n\\n
  "focusAreas": string[] // 3-6 concise items to cultivate/strengthen
}`;

const GRADED_REPORT_SCHEMA = `{
  "title": string,
  "narrative": string,
  "focusAreas": string[],
  "grade": {
    "letter": "A" | "B" | "C" | "D" | "Incomplete",
    "registers": { "imaginary": number, "symbolic": number, "real": number }, // 0-100
    "commentary": string
  }
}`;

export function buildPrompt(kind: string, payload: Json): { user: string; schema: string } {
  switch (kind) {
    case 'intake-report':
      return {
        schema: REPORT_SCHEMA,
        user: `Write the INTAKE case formulation from a Freudian + Lacanian self-analysis intake.
The answer keys map to: Freudian domains — presenting concerns (f_presenting, f_symptoms), affect
(f_affect_response, f_coping, f_emotion_manage), history/origins (f_childhood_echo, f_family,
f_parents, f_earliest), inner conflict/defenses (f_conflict, f_avoidance, f_patterns), relationships/
transference (f_support, f_power, f_gossip), plus a free-association opener (free_association);
Lacanian fundamental questions — origins (l_origins), death/aliveness (l_death), meaning of the
symptom (l_meaning), the body (l_body), desire (l_desire, l_desire_scale), the Good (l_good), and the
pivotal self-as-symptom/repetition question (l_repetition). Move the reader from "why me?" to "what is
my hand in this?". Weave in the assessment results (enneagram/cognition/temperament/archetypes) where
present. Put 3-6 concrete things to cultivate in focusAreas.
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${REPORT_SCHEMA}`,
      };
    case 'archetype-report':
      return {
        schema: REPORT_SCHEMA,
        user: `From the user's favourite media, surface the archetypal field (Jungian, read also as
Lacanian positions). Name specific archetypes and what to work with an analyst. Put the archetype
names in focusAreas.\nInputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${REPORT_SCHEMA}`,
      };
    case 'pillar-report':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Grade and formulate this pillar submission against a Lacanian rubric across the three
registers (imaginary/symbolic/real, 0-100). "Incomplete" if under ~25 substantive words. Note any
area of lack to refine in the year-long arc.\nInputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'homework-grade':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Grade this weekly homework submission for the given pillar against the same Lacanian
rubric.\nInputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'self-pillar-report':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Pillar I — "The Self" (Jungian training). The analysand has completed interactive
exercises (often Active Imagination) and journal entries across modules on the Self, Ego, Persona,
Shadow, Anima/Animus, Collective Unconscious, Individuation, Dream Analysis, Active Imagination,
Symbol Interpretation, Confronting Archetypes, Balancing Opposites, and Self-Realization — plus an
Assagioli / psychosynthesis strand (the evolutionary criterion in an imperfect universe; the Egg
diagram as a map not the truth; where the Self is — high/low/inward; the incompleteness of the soul;
superconscious ≠ Self, the door and the motionless hinge; the Climb / verticality; the Self as
orchestra conductor; the seven points — Presence, Dialogue, Depth, Harmony, Will, Self, Care; the
necessity and impossibility of the map; and the Ego–Self dashed line). If an "egg" object is present
(the Egg Diagram game result), read it as how the subject relates to the Self under pressure — its
dominant dimensions (top) and least-called ones (missing). Read ALL of it and write a COMPREHENSIVE
Jungian + psychosynthesis progress + analysis report: how conscious the Ego/Persona have
become, the Shadow work and what it wants integrated, the Anima/Animus, active archetypes, the tension
of opposites, and movement of individuation toward the Self. Grade progress across the three
registers (map imaginary→integration, symbolic→conscious articulation, real→orientation to wholeness).
"Incomplete" if fewer than half the modules are worked. Note that this report is archived and combined
into the full pillar report when all modules are done.
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'name-pillar-report':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Pillar V — "The Name, The Senex" (Lacanian Symbolic + Jungian Senex). Read the
analysand's exercises + journals and write a Lacanian-with-Jungian formulation covering:
  · the signifiers placed on the subject before it could refuse them (family names, roles, labels);
  · the big Other and the internalised voice of the Other (whose tongue is the superego speaking?);
  · the Name-of-the-Father as the paternal function (le nom / le non) — distinguish the STRUCTURAL
    limit that lets desire circulate from BORROWED prohibitions that can be questioned;
  · symbolic debt — what belongs to the subject, what can be handed back;
  · the Senex (Jungian) — the inner elder of order/limit vs the Puer Aeternus; note where Senex
    hardens into rigidity, dogma, or self-tyranny, and where Puer needs Senex to protect what it
    carries rather than crush it;
  · punctuation — where the cut falls fixes meaning; the subject is "saying more than they think";
  · repetition — the insistence of the signifier; what is forgotten returns as action;
  · acting out vs passage à l'acte — remaining in the scene as a message to the Other vs exiting into
    the Real; both as last resorts against anxiety;
  · projection (neurotic; imaginary dual relation) and NOT foreclosure (psychotic);
  · optional touches when the material invites them: the optical model (the angle of the plane mirror
    = the subject's position in the Symbolic), part-object (breast, faeces, phoneme, gaze, voice,
    "nothing" — no specular image).
Close with the movement of TAKING UP ONE'S OWN NAME — being the subject of one's own speech.
Grade progress (map symbolic→articulation of the signifiers, imaginary→provenance of the voice / whose
mouth is speaking, real→authorship: beginning to answer to one's own name).
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'desire-pillar-report':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Pillar IV — "Desire & Lack" (Lacanian). Read the analysand's exercises + journals and
write a formulation oriented toward ARTICULATING THE TRUTH OF DESIRE IN SPEECH (not reliving or
discharging affect). Cover: the chain of substitutions and the object-cause (objet petit a) behind the
chased objects; jouissance vs desire; the structuring lack of the barred subject (desire arises from
division, not a missing thing); the desire of the Other (whose recognition is sought); and the
subject's own part in what repeats (the "beautiful soul" — own complicity WITHOUT collapsing into
guilt, so desire can be reclaimed). Keep it a reflective Lacanian frame, not mysticism. Grade progress
(map symbolic→articulation of desire, imaginary→relation to fantasy/objet a, real→proximity to lack/
jouissance).
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'temperament-pillar-report':
      return {
        schema: GRADED_REPORT_SCHEMA,
        user: `Pillar III — "The Blood, The Bile, & The Nightingale" (four temperaments / four humors).
Read the analysand's exercises + journals (and intakeTemperament if present). Write a progress +
analysis report on rebalancing their temperamental EXCESS via the Doctrine of Opposites (framed as the
evidence-based "opposite action"). Cover: which temperament leads (sanguine/blood, choleric/yellow
bile, melancholic/black bile, phlegmatic/phlegm), the excess and its secondary gain, the opposite-
action ritual and what felt unnatural, and sensory regulation. If a "game" object is present (the
bedchamber projective exercise), read it as behavioural data: which role they chose (Doctor of Physic
= learned/distancing; Plague Doctor = exposed/proximate), the tools/actions they picked, and the
dominant psyche tendencies (top) — relate these to the temperament as how the excess behaves under
pressure. If game.loadout is present, read the pre-entry choices (which patient they went to first,
tools, rosary, medicinal items, and the cure they named in advance) as INTENTION preceding action. If
game.gathered is present, read what they picked up while walking the chamber unprompted (candle,
linen, basin, crucifix, ledger, dagger…) as a quiet inventory of what they believe will help. If
game.resonantQuotes is present, the player chose a Shakespeare line that resonated for
each tool — read those chosen lines as projective material (the line a person picks names, in borrowed
words, what they cannot yet say plainly). IMPORTANT: treat historical cures (bloodletting, purging, dietary mood-cures) as history
only — never endorse them as health advice.
Grade progress (map symbolic→awareness, real→opposite-action practice, imaginary→felt balance).
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${GRADED_REPORT_SCHEMA}`,
      };
    case 'archetypal-pattern':
      return {
        schema: REPORT_SCHEMA,
        user: `Pillar II — "Analyze through Jungian Lens". Read this free-text reflection (experiences,
dreams, life patterns) and identify which Jungian archetypes are ACTIVE in the psyche — from the
structural set (Ego, Persona, Shadow, Anima, Animus, Self) and the figures (Great Mother, Father,
Wise Old Man/Senex, Divine Child, Kore/Maiden, Hero, Trickster, Wounded Healer, Syzygy, Puer
Aeternus, Mana Personality, Rebirth). For each active archetype, note how it appears and its shadow
form. Frame the work as individuation (integrate, don't be possessed). Do NOT fix a single universal
meaning; give working material. Put the active archetype names in focusAreas.
Inputs:\n${JSON.stringify(payload, null, 2)}\nReturn JSON: ${REPORT_SCHEMA}`,
      };
    case 'dream':
      return {
        schema: `{
  "tone": "patient" | "clinician",
  "highlights": [{ "fragment": string, "note": string }],
  "symbols": [{ "symbol": string, "amplification": string }],
  "stageMap": { "exposition": string, "development": string, "lysis": string },
  "summary": string
}`,
        user: `Analyse this dream in Jungian dramatic structure (exposition, development/peripeteia,
lysis). Amplify symbols WITHOUT fixing a single universal meaning; give the user working material for
their analyst.\nInputs:\n${JSON.stringify(payload, null, 2)}`,
      };
    case 'nightly':
      return {
        schema: `{ "journalPrompt": string, "analysisPrompt": string, "elderGuidance"?: string }`,
        user: `Generate ONE fresh before-bed inventory for tonight: a journal prompt and a separate
Freudian/Lacanian analysis prompt. If age is 70-100, add "elderGuidance" on end-of-life integration
(Jungian/Freudian/Lacanian + relevant Erikson late stage).\nInputs:\n${JSON.stringify(payload, null, 2)}`,
      };
    case 'daily-ritual':
      return {
        schema: `{ "checkIn": string, "exercise": string }`,
        user: `Compose today's customised daily ritual from all the user's results/focus areas: a
short check-in and a single concrete exercise.\nInputs:\n${JSON.stringify(payload, null, 2)}`,
      };
    default:
      throw new Error(`unknown analysis kind: ${kind}`);
  }
}
