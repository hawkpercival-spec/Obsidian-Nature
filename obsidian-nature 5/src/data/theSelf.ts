/**
 * Pillar I — The Self.
 *
 * Two complementary traditions:
 *   • Jungian training — the Self as central archetype and the psyche's totality,
 *     reached through Individuation: the lifelong integration of conscious
 *     aspects (Ego, Persona) and unconscious aspects (Shadow, Anima/Animus, the
 *     Collective Unconscious).
 *   • Assagioli / psychosynthesis strand — the evolutionary criterion in an
 *     imperfect universe; the Egg diagram (Lower/Middle/Superconscious, the
 *     Field of Awareness, the personal "I", the surrounding Collective) as a
 *     MAP not the truth; where the Self is (high, low, inward — the mountain,
 *     the roots, the sphere); the incompleteness of the soul (each life a ray
 *     recovering a piece of the whole); superconscious ≠ Self (the door and the
 *     motionless hinge); the Climb / verticality; the Self as skilful orchestra
 *     conductor; the seven points (Presence, Dialogue, Depth, Harmony, Will,
 *     Self, Care); the necessity and impossibility of the map; and the Ego-Self
 *     bridge — the dashed line that keeps us from confusing them.
 *
 * Each module pairs a teaching (the concept) with an interactive exercise and a
 * journal entry. Submit runs a comprehensive Jungian + psychosynthesis analysis
 * over everything (see analysis/self.ts and the 'self-pillar-report' server
 * prompt) and archives a progress + analysis report.
 *
 * Content is grounded psychology; symbols are treated as psychological, not
 * supernatural.
 */

export type SelfGroup = 'psyche' | 'technique' | 'goal';

export type SelfModule = {
  id: string;
  group: SelfGroup;
  title: string;
  /** Teaching text shown in the module card. */
  concept: string;
  /** Interactive exercise prompt (Active Imagination, mapping, dialogue…). */
  exercise: string;
  /** Journal-entry prompt. */
  journalPrompt: string;
};

export const SELF_GROUP_LABEL: Record<SelfGroup, string> = {
  psyche: 'The Self & the Psyche',
  technique: 'Methods & Techniques',
  goal: 'Goal & Approach',
};

export const SELF_MODULES: SelfModule[] = [
  // ---- Jung's views on the Self & psyche ----
  {
    id: 'self', group: 'psyche', title: 'The Self',
    concept: 'The Self is the ultimate goal — the archetype of wholeness and the regulating centre of the whole psyche, encompassing both conscious and unconscious. It is often imaged as a mandala, a circle, or a union of opposites.',
    exercise: 'Active Imagination: close your eyes and let an image of “wholeness” arise on its own. Describe it in detail — shape, colour, movement — without forcing or interpreting it.',
    journalPrompt: 'When in your life have you felt most whole — most yourself? What conditions made it possible?',
  },
  {
    id: 'ego', group: 'psyche', title: 'The Ego',
    concept: 'The Ego is the conscious centre — your sense of identity and the seat of waking will. It is essential, but only a small part of the total psyche; mistaking it for the whole is the root of one-sidedness.',
    exercise: 'List the identities you carry — complete “I am ___” ten times, quickly, without editing.',
    journalPrompt: 'Where does your sense of “I” feel too small for the whole of who you are?',
  },
  {
    id: 'persona', group: 'psyche', title: 'The Persona',
    concept: 'The Persona is the social mask — the role you play to meet the world’s expectations. It is necessary, but when you identify with it completely, the true Self is hidden even from yourself.',
    exercise: 'Name the different masks you wear — at work, with family, with strangers, online. Describe how each one behaves.',
    journalPrompt: 'Which mask is hardest to take off? What would it cost to be seen without it?',
  },
  {
    id: 'shadow', group: 'psyche', title: 'The Shadow',
    concept: 'The Shadow holds the disowned, darker, or unlived aspects — desires and flaws you refuse to see. What is not integrated is projected onto others. Wholeness requires meeting the Shadow, not defeating it.',
    exercise: 'Active Imagination: picture a figure who embodies a trait you most despise in others. Let them speak. Write the dialogue between you and them, unplanned.',
    journalPrompt: 'What did the figure want? Where does that same trait, in some form, live in you?',
  },
  {
    id: 'anima_animus', group: 'psyche', title: 'The Anima / Animus',
    concept: 'The Anima (unconscious feminine in men) and Animus (unconscious masculine in women) are the contrasexual inner figures — carriers of soul, feeling, meaning, and relatedness. Relating to them consciously brings balance.',
    exercise: 'Describe your inner contrasexual figure as an image — appearance, voice, mood. If none comes, describe the kind of person you are repeatedly drawn to.',
    journalPrompt: 'How does this figure show up in who you fall for, admire, or resent? What is it asking of you?',
  },
  {
    id: 'collective', group: 'psyche', title: 'The Collective Unconscious',
    concept: 'Beneath the personal unconscious lies a shared reservoir of universal patterns — archetypes — that shape all human experience, appearing in myth, religion, dream, and art across every culture.',
    exercise: 'Recall a myth, fairytale, or story that grips you more than it should. Retell its core in a few lines.',
    journalPrompt: 'Which universal pattern does your own life seem to repeat? Where have you lived this story?',
  },

  // ---- Methods & techniques ----
  {
    id: 'individuation', group: 'technique', title: 'Individuation',
    concept: 'Individuation is the central process — becoming a unique, whole individual by integrating all parts of the psyche and bringing unconscious elements into consciousness. It is a lifelong movement, not an achievement.',
    exercise: 'Draw a simple map (in words): which parts of you are lived consciously, and which stay in the dark? Place Ego, Persona, Shadow, and the inner figure on it.',
    journalPrompt: 'What part of yourself is asking to be brought into consciousness now?',
  },
  {
    id: 'dream_analysis', group: 'technique', title: 'Dream Analysis',
    concept: 'Jung called dreams a bridge to the unconscious. Interpreting their images, emotions, and archetypal messages uncovers conflicts and compensations the waking ego overlooks.',
    exercise: 'Record a recent dream as plainly as you can. Then list its three most charged images or symbols.',
    journalPrompt: 'What waking conflict or one-sidedness might this dream be compensating for?',
  },
  {
    id: 'active_imagination', group: 'technique', title: 'Active Imagination',
    concept: 'Active Imagination is conscious, creative engagement with unconscious imagery — through writing, art, or visualization — allowing a real dialogue with inner figures such as the Shadow, without the ego steering the outcome.',
    exercise: 'Let an inner figure appear and write a spontaneous conversation with it. Do not plan the replies — let them surprise you.',
    journalPrompt: 'What surprised you in what the figure said? What did you learn that you did not already know?',
  },
  {
    id: 'symbol_interpretation', group: 'technique', title: 'Symbol Interpretation',
    concept: 'Symbols carry meaning that concepts cannot. Reading the universal symbols and metaphors in life and dreams — not reducing them to fixed “codes” — opens their deeper significance.',
    exercise: 'Choose a symbol that keeps recurring for you (an object, animal, place). Free-associate: write every word and memory it calls up.',
    journalPrompt: 'What deeper meaning begins to emerge from those associations?',
  },
  {
    id: 'confronting_archetypes', group: 'technique', title: 'Confronting Archetypes',
    concept: 'Recognizing and integrating universal figures — the Hero, the Mother, the Trickster, the Wise Old Man — lets you relate to their energy consciously rather than being unknowingly driven by it.',
    exercise: 'Name the archetype most active in your life right now. Describe a recent situation it shaped.',
    journalPrompt: 'How does this archetype help you — and where does it possess or mislead you?',
  },
  {
    id: 'balancing_opposites', group: 'technique', title: 'Balancing Opposites',
    concept: 'Psychological health comes from holding opposites together — introversion/extraversion, thinking/feeling, light/shadow — rather than amputating one side. The tension of opposites is where the Self forms.',
    exercise: 'Name a pair of opposites alive in you (e.g. thinking vs feeling). Describe how each side behaves when it takes over.',
    journalPrompt: 'What would it look like to honour both sides at once, rather than choosing?',
  },

  // ---- Goal & approach ----
  {
    id: 'self_realization', group: 'goal', title: 'Self-Realization',
    concept: 'The goal is self-realization — a fulfilled life in which the Ego aligns with the Self, moving beyond mere habit or fear. The approach is holistic: valuing personal experience and universal pattern alike, treating life as a journey of deep self-discovery.',
    exercise: 'Describe a version of your life in which your Ego serves the Self — what you would do, refuse, and release, beyond habit and fear.',
    journalPrompt: 'One concrete move toward that alignment you can make this week.',
  },

  // ---- Assagioli / psychosynthesis strand ----
  {
    id: 'evolutionary_criterion',
    group: 'goal',
    title: 'The Evolutionary Criterion',
    concept:
      '“We are in an imperfect universe, on an imperfect planet, in an imperfect humanity.” (Assagioli.) Psychosynthesis takes this imperfection as the ground of the work, not as an accusation. The movement toward synthesis is not only individual — it concerns every form of life, and it happens in magical moments of encounter (an I and a Thou), in beauty caught in a face or a shape or a work of art, in joy, love, compassion, in inspiration and creativity, in freely-shared feeling — what Maeterlinck called “invisible goodness,” an “embrace of souls.”',
    exercise:
      'Recall one recent moment of synthesis — an encounter, a piece of beauty, a shared feeling — where something exceeded you. Describe it as plainly as you can.',
    journalPrompt:
      'What does noticing such moments change about the imperfection you were mourning yesterday?',
  },
  {
    id: 'egg_diagram',
    group: 'goal',
    title: 'The Egg Diagram — a map, not the truth',
    concept:
      'Assagioli’s Egg diagram sketches the psyche in levels: the Lower Unconscious (Inconscio Inferiore), the Middle Unconscious (Inconscio Medio), the Superconscious (Inconscio Superiore), the Field of Awareness and Will, the personal “I” (Io), and, ringing the whole ovoid, the Collective Unconscious. The star of the Self stands at the top and radiates toward the whole. Remember: a diagram is not the truth — it is an analogy for what has no “high” or “low” in inner space, chosen to show a direction of growth and maturity.',
    exercise:
      'Place yourself, right now, on the Egg. Where is your Field of Awareness most alive? Where is a level (lower, middle, or higher unconscious) knocking that you rarely open?',
    journalPrompt:
      'What does the diagram help you see about your life — and where might it, if held rigidly, stand in for it?',
  },
  {
    id: 'where_is_the_self',
    group: 'goal',
    title: 'Where Is the Self? — High, Low, and Inward',
    concept:
      '“If we really want to know what the Self is, we should go and meet it in its home.” (Assagioli.) He uses many families of dynamic symbols for the Self and the superconscious — only one is the ascent (the mountain). Others include the DESCENT (into the roots of being; Mère spoke of the soul as something sweet and still, perceived by descending into depth), and the INWARD move (from the periphery to the centre — the sphere). Both high and low, both outer and inner: the evolution of consciousness is circular and global, and its goal is totality.',
    exercise:
      'Try each of the three approaches to the Self in one sentence: an ascent (“from up high I see…”), a descent (“at the root I feel…”), and an inward move (“at the centre of me…”).',
    journalPrompt:
      'Which of the three came most easily — and which is most needed by you right now?',
  },
  {
    id: 'incompleteness_of_soul',
    group: 'goal',
    title: 'The Incompleteness of the Soul',
    concept:
      'Assagioli hints at a theory of the “almost-complete” Self: each individual is a ray or reflection sent into existence to recover particles of soul still unfinished, still potential. Each reflection carries a spiritual-genetic blueprint — a task, a mission, a vocation. The goal is not fusion into the whole but harmony: every particle keeps its individuality and participates in the composition of the whole. “We can only vaguely guess the supreme purpose of the great cosmic drama…”',
    exercise:
      'What is the piece of the puzzle that seems to have been given to you to recover? A gift, a wound, a task you keep circling — describe it without over-explaining.',
    journalPrompt:
      'If your life were a small ray sent to complete a larger design, what part of yourself is still “in potential” and asking to be lived?',
  },
  {
    id: 'superconscious_vs_self',
    group: 'goal',
    title: 'Superconscious ≠ Self',
    concept:
      'The Self is pure consciousness, empty of content — beyond culture, our face before we were born. The superconscious is full of contents: a flash of intuition, oneness with nature, the ecstasy of music, communion with another, “the love that moves the sun and the other stars.” The superconscious is an EMANATION of the Self, not the Self itself. Or, in an image: the superconscious is a door that opens and shuts; the Self is the motionless hinge upon which the door swings.',
    exercise:
      'Name a recent superconscious experience (intuition, beauty, love, awe). Then, gently: what quiet, contentless awareness was underneath it — the hinge, not the door?',
    journalPrompt:
      'What changes if you stop mistaking the door — however luminous — for the hinge?',
  },
  {
    id: 'the_climb',
    group: 'goal',
    title: 'The Climb — Verticality & the Self at the Apex',
    concept:
      'Assagioli, a mountain lover taken on Alpine walks as a frail child, treated the climb as an act of will — a symbol of self-conquest and overcoming his own weaknesses. Verticality runs through his thought. Placing the Self at the apex of the Egg is not authoritarian: at height we are lighter (having let the weight of what we thought we were fall away, like Dante above the mount of Purgatory), we see farther and more serenely, and — as Firman and others have questioned — we still allow ourselves to be led. The apex is the place of command; not all elements of the personality carry the same executive power.',
    exercise:
      'Describe the “climb” you are on in your life right now, and what weight you are carrying. Which of those things could you set down at the next switchback?',
    journalPrompt:
      'What would you see from higher up that you cannot see from where you stand? What is your act of will today?',
  },
  {
    id: 'orchestra_conductor',
    group: 'goal',
    title: 'The Self as Orchestra Conductor',
    concept:
      'The Self is chief; the Self is will. It is not a dictator, not an unreasonable boss — it is a skilful orchestra conductor with a wide-ranging vision of the piece to be played, drawing many instruments into a single music.',
    exercise:
      'Name the instruments of your inner orchestra — the parts, roles, and voices in you. Which are currently loud? Which are silent? Which is not yet listening to the conductor?',
    journalPrompt:
      'If the Self is conducting rather than commanding, what note do you need to give the loud players — and what invitation to the silent ones?',
  },
  {
    id: 'seven_points',
    group: 'goal',
    title: 'The Seven Points — Presence, Dialogue, Depth, Harmony, Will, Self, Care',
    concept:
      'A path in seven movements. (1) PRESENCE — being here, together, for a real encounter. (2) DIALOGUE — understanding as the alternative to opposition, even where diversity is free. (3) DEPTH — both high and low; the Self is not an idol on a pedestal but radiates into the whole. (4) HARMONY — a dynamic inside job, driven by will, not imposed from outside. (5) THE SELF THAT WANTS — reconciliation with the parts you had exiled; recomposing the shattered pot, as in Raku, with the blood of pain and the gold of the soul. (6) THE SELF — held in the Heart. (7) THE RELATIONSHIP OF CARE — keeping the sign that connects the personal Ego to the Universal, so we do not confuse them and lose our wonder.',
    exercise:
      'For each of the seven, write a single line for yourself right now — Presence, Dialogue, Depth, Harmony, Will, Self, Care — a sentence long, no more.',
    journalPrompt:
      'Which of the seven is your growing edge this season? Which is already alive in you?',
  },
  {
    id: 'the_map',
    group: 'goal',
    title: 'The Map — Necessity and Impossibility',
    concept:
      'Two truths sit alongside each other. NECESSITY: we build mind-maps with the rational mind, and they orient us — to have a hypothesis of something empowers the possibility of experiencing it. But we can also build a “parallel reality” in our own mind, and we know it well. IMPOSSIBILITY: because the higher Self exceeds the concrete mind, every step toward it can only try to draw nearer, to overshadow it cognitively. We will never fully define it — and on that impossibility we are, apparently, unanimous.',
    exercise:
      'Draw (or write) the current map of your inner life. Then mark two things: where the map is helping you orient, and where the map has quietly replaced the territory.',
    journalPrompt:
      'Which of your maps is due to be loosened? Where can you hold the hypothesis lightly, and let the Self remain undefined?',
  },
  {
    id: 'ego_self_bridge',
    group: 'goal',
    title: 'Ego / Self — the Dashed Line',
    concept:
      'An Egg diagram with only the Ego at the centre and no other reference can confuse us into taking the Ego’s mutability for the Self and suffering the substitution. Keeping the Ego at the centre AND the star of the Self at the top, joined by a dashed line, gives sign and substance to a symbol of care and love: the personal is a bridge to the Universal, and the bridge is a function, not a scope. Then wonder is safe.',
    exercise:
      'Sketch, in words, the dashed line between your Ego and the Self — what runs along it today? Ask, and answer, or reception, or a longing?',
    journalPrompt:
      'Where in your life have you mistaken the Ego for the Self, and what did it cost? Where can you re-hang the dashed line so care can travel it?',
  },
];

export const getSelfModule = (id: string) => SELF_MODULES.find((m) => m.id === id);
