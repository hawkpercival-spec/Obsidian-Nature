/**
 * Pillar V — The Name, The Senex.
 *
 * Lacanian Symbolic register: language, law, and the Other. Tracing the
 * signifiers — roles, labels, expectations, prohibitions — placed on you before
 * you could refuse them, and letting your own speech begin to name you.
 *
 * Paired with the Jungian SENEX: the mature, wise, authoritative figure of
 * structure, boundaries, and order — contrasted with the Puer Aeternus (the
 * eternal child). Where the Name is Lacanian law-in-language, the Senex is its
 * inner archetypal carrier: the ordering, limit-giving elder within.
 *
 * Grounded psychology throughout. Content is summarised faithfully from
 * standard Lacanian / Jungian reference material.
 */

export const NAME_PURPOSE =
  'To trace the signifiers placed on you before you could refuse them — the words, roles, prohibitions, and repetitions of the Other that still speak through you — and to begin to take up your own name. Alongside this, to relate consciously to the Senex, the inner elder of order and limit, without becoming him or being ruled by him.';

export type LessonCard = { term: string; gloss: string };

/** The Lesson — Lacanian + Senex coordinates of the Symbolic. */
export const NAME_LESSON: LessonCard[] = [
  {
    term: 'The Senex (Jungian)',
    gloss:
      'The archetype of the mature, wise, authoritative figure — structure, boundaries, order. Contrasted with the Puer Aeternus (the eternal child). The Senex gives limit and form; its shadow is rigidity, dogma, and the killing of new life.',
  },
  {
    term: 'The big Other',
    gloss:
      'Not a person but the field of language, law, and social order that pre-exists you. It speaks first; you enter its speech. You address demands to it and receive judgement from it, often without knowing it is not a face.',
  },
  {
    term: 'Signifier & signification',
    gloss:
      'A signifier is not the thing itself; signifiers exist only in opposition to other signifiers and their meaning slides. Signification is not a stable bond but a process — meaning always refers to another meaning, pinned only briefly by the “points de capiton.” The names placed on you carry weight not because they are true but because they are the ones that were used.',
  },
  {
    term: 'The Name-of-the-Father (Nom-du-Père)',
    gloss:
      'The paternal function — not the literal father — that installs law, limit, and separation. Lacan plays on the homophony of “nom” (name) and “non” (no): it is the signifier of the No that also opens speech and difference. As the fundamental signifier that lets signification proceed, it names the subject and marks the Oedipal prohibition; where it is foreclosed, the result is psychosis. In the paternal metaphor, this signifier substitutes for the desire of the mother.',
  },
  {
    term: 'Symbolic debt',
    gloss:
      'The debt you enter simply by being born into a family and a language — what is asked of you, what is unspeakable, what you are expected to become. Naming the debt is the first step in owing it consciously — or refusing it.',
  },
  {
    term: 'The optical model',
    gloss:
      'A “provisional idea” Lacan borrows from Freud: a plane mirror and a concave mirror produce a virtual image visible only from a certain angle. The angle of the plane mirror is the subject’s position in the Symbolic; it determines how the Imaginary is articulated with the Real. Analysis works less by changing the image than by rotating the mirror.',
  },
  {
    term: 'Part-object',
    gloss:
      'You never quite relate to a whole other, but to partial objects that carry drive — Klein’s breast and faeces, plus Lacan’s additions: the phoneme, the gaze, the voice, and “the nothing.” These have no specular image. They cannot be assimilated into the ego’s illusion of completeness; later Lacan reads them as figures of the object-cause of desire, objet petit a.',
  },
  {
    term: 'Passage à l’acte',
    gloss:
      'Different from acting out. Acting out remains inside the scene as a symbolic message addressed to the big Other; the passage à l’acte is an exit from the scene altogether — a flight from the Other into the Real. For a moment the subject becomes a pure object, falls (as in Freud’s young homosexual patient) like a leftover of signification. Watch for both in your own repetitions.',
  },
  {
    term: 'Projection',
    gloss:
      'A neurotic mechanism — an internal desire, thought, or feeling displaced onto another (the unfaithful person who accuses their partner of infidelity). Lacan distinguishes it sharply from foreclosure (a signifier not incorporated in the Symbolic, the hallmark of psychosis). Projection lives in the imaginary dual relation between ego and counterpart.',
  },
  {
    term: 'Punctuation',
    gloss:
      'Meaning is not intrinsic to what is said — it is fixed retroactively by the listener’s punctuation. The mother punctuates the infant’s scream into hunger or fear; the analyst punctuates the analysand’s speech to show them they are “saying more than they think.” Where the pauses fall changes the sentence, and the life.',
  },
  {
    term: 'Repetition',
    gloss:
      'The insistence of the signifier — certain signifiers return in your life again and again despite your resistance. Freud’s Wiederholungszwang; Lacan later reads it also as the return of jouissance beyond the pleasure principle. You are condemned to repeat what you have forgotten; naming lets you remember instead of re-stage.',
  },
];

export type NameExercise = { id: string; title: string; exercise: string; journalPrompt: string };

/** Journal & interactive exercises. */
export const NAME_EXERCISES: NameExercise[] = [
  {
    id: 'names_placed_on_you',
    title: 'Names Placed On You',
    exercise:
      'List the words your family used to name you — roles, labels, expectations (“the responsible one,” “the sensitive one,” “our little professor”). Include the flattering ones and the wounding ones.',
    journalPrompt:
      'Which of these signifiers still speaks through you today? Where does one make choices for you before you notice?',
  },
  {
    id: 'internal_judge',
    title: 'Whose Voice Judges You',
    exercise:
      'When you judge yourself harshly, listen. Write, verbatim, what the judge says — in the exact words used. Then note who first spoke that phrase to you.',
    journalPrompt:
      'What changes when you can name whose tongue is speaking? What does the judge want from you?',
  },
  {
    id: 'name_of_the_father',
    title: 'The Name — and the No',
    exercise:
      'Name a “No” that shaped you — a prohibition, limit, or law you inherited. Where did it come from, and what did it also make possible?',
    journalPrompt:
      'Which of these “Nos” are structural — the limits without which you could not desire — and which are simply borrowed prohibitions you can question?',
  },
  {
    id: 'symbolic_debt',
    title: 'The Symbolic Debt',
    exercise:
      'Name three things you were expected to become, be, or avoid — the unspoken contract of your family or culture. Which have you paid, which have you refused, and which are still open?',
    journalPrompt:
      'Which of these expectations is yours to keep, and which belong to the Other and can be handed back?',
  },
  {
    id: 'senex_and_puer',
    title: 'The Senex and the Puer',
    exercise:
      'Sketch your inner Senex — the elder who imposes order, structure, and limit — and your inner Puer, the eternal youth who resists all of it. Describe how they meet in you (or refuse to).',
    journalPrompt:
      'Where does the Senex serve you as wise structure, and where has it hardened into dogma or self-tyranny? What does the Puer need the Senex to protect, not crush?',
  },
  {
    id: 'punctuation',
    title: 'Punctuation',
    exercise:
      'Take a sentence you often say to yourself. Rewrite it three times with the pauses in different places — the emphasis, the cut. Notice how each punctuation gives a different meaning.',
    journalPrompt:
      'Which punctuation is nearer the truth of your speech? What have you been saying more than you thought?',
  },
  {
    id: 'repetition',
    title: 'The Insistence of the Signifier',
    exercise:
      'Name a scene that keeps happening to you in different forms — the same role, the same ending, new actors. Try to name it in a single sentence.',
    journalPrompt:
      'What signifier is insisting here? What has been forgotten that keeps returning as action?',
  },
  {
    id: 'passage_a_lacte',
    title: 'Acting Out vs Passage à l’Acte',
    exercise:
      'Recall a time you exited a scene entirely rather than staying inside it — walked out, cut off, disappeared. Then recall a time you stayed and “acted out” instead. Describe both.',
    journalPrompt:
      'What was unbearable to speak, that had to be done? What would putting it into speech make possible now?',
  },
  {
    id: 'take_your_name',
    title: 'Taking Up Your Own Name',
    exercise:
      'Write the name — the signifier, phrase, or single sentence — that you want to answer to now, chosen rather than inherited. It does not have to be your legal name; it has to be true.',
    journalPrompt:
      'What would change if you began, quietly, to answer to that name instead of the old ones?',
  },
];
