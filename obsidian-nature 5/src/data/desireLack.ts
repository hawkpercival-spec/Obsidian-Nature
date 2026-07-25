/**
 * Pillar IV — Desire & Lack (Lacanian).
 *
 * The barred subject and objet petit a: studying what you chase and how the
 * chasing organises you. The aim, in Lacan's terms, is not to relive the past
 * or discharge feeling but to ARTICULATE IN SPEECH THE TRUTH OF DESIRE — and so
 * to re-connect with desire from a place free of wounding, unconscious guilt,
 * and binding affect.
 *
 * Grounding: this is Lacanian theory presented as a reflective framework, not a
 * metaphysics. Concepts are summarised faithfully from standard Lacanian
 * reference material.
 */

export const DESIRE_PURPOSE =
  'To understand desire, and to re-connect with it from a place free of wounding, unconscious guilt, and the affects that feel binding.';

/** The orienting note on affect (Lacan): speech, not abreaction, is the path. */
export const AFFECT_NOTE =
  'Lacan holds that affect and thought are not opposed, and that the aim of the work is neither to relive the past nor to discharge feeling, but to articulate in speech the truth about desire. Affects can be lures; do not be tricked by them — put them into words.';

export type LessonCard = { term: string; gloss: string };

/** The Lesson — core coordinates of desire, plus the surrounding concepts. */
export const DESIRE_LESSON: LessonCard[] = [
  {
    term: 'objet petit a',
    gloss: 'The object-cause of desire — not the thing you want, but the missing “something” that sets wanting in motion. It cannot be obtained, only circled; every object you chase is its stand-in.',
  },
  {
    term: 'The barred subject ($)',
    gloss: 'You are a divided subject, split by language and never whole. Desire arises from this division itself, not from the absence of any particular object.',
  },
  {
    term: 'The desire of the Other',
    gloss: '“Man’s desire is the desire of the Other.” You desire what you imagine others desire, and you desire their recognition. The question to hold: whose desire are you living?',
  },
  {
    term: 'Fantasy ($ ◊ a)',
    gloss: 'The private scenario that frames how you relate to the object-cause. Fantasy teaches desire how to want. Like the word, it is “a presence made of absence.”',
  },
  {
    term: 'Absence & Presence',
    gloss: 'The symbolic order rests on absence — as in the child’s fort!/da! game, sounds modulated on presence and absence. A word is a presence made of absence: it stands in for the thing that is gone. Even “the nothing” can be an object.',
  },
  {
    term: 'Acting Out',
    gloss: 'What is not remembered is repeated. When the past is repressed, it returns by expressing itself in action. The work breaks the cycle by bringing it into speech instead of re-staging it.',
  },
  {
    term: 'Aggressivity',
    gloss: 'A tension born in the mirror stage, present even in apparently loving acts — the interdependence of love and hate. It underlies not only violence but the idealist, the reformer, the one who means well.',
  },
  {
    term: 'Aphanisis (fading)',
    gloss: 'The disappearance, or “fading,” of the subject before the object — the division that institutes the dialectic of desire. It is precisely this that the neurotic aims at, shielding himself from desire by setting it aside.',
  },
  {
    term: 'The autonomous ego — a caution',
    gloss: 'The ego’s “autonomy,” its air of mastery, is a narcissistic illusion. It is the symbolic order, not the ego, that is autonomous. Strengthening the ego is not the goal of this work.',
  },
  {
    term: 'The Beautiful Soul',
    gloss: 'The one who projects their own disorder onto the world and denounces it there, not recognising their own part in the disorder they condemn. The ethics here: recognise your own complicity in your suffering.',
  },
  {
    term: 'Bejahung',
    gloss: 'A primordial “yes” — the first act of symbolisation that lets a thing exist in your world at all, prior to any judgement about whether it is or is not.',
  },
  {
    term: 'Captation',
    gloss: 'The captivating-and-capturing power of the image: it seduces and imprisons at once, fixing the subject in a fascination that can disable. What image holds you?',
  },
];

export type DesireExercise = { id: string; title: string; exercise: string; journalPrompt: string };

export const DESIRE_EXERCISES: DesireExercise[] = [
  {
    id: 'desire_jouissance',
    title: 'Desire & Jouissance',
    exercise:
      'Name something you enjoy that also costs or harms you — a satisfaction you return to against your own interest. That painful enjoyment is jouissance, distinct from desire, which keeps moving.',
    journalPrompt: 'What would it mean to loosen this jouissance? What rises in the space it leaves?',
  },
  {
    id: 'desire_associations',
    title: 'Desire — Your Associations',
    exercise:
      'Write “What I want most is…” and keep going, uncensored, letting each answer point to the next thing behind it. Follow the chain of substitutions without deciding where it should end.',
    journalPrompt: 'Where did the chain lead that surprised you? What sat behind the first, obvious want?',
  },
  {
    id: 'lack',
    title: 'Lack',
    exercise:
      'Describe a lack you feel at your core — not a specific missing thing, but a sense of something absent. Then describe how the chasing to fill it organises your days.',
    journalPrompt: 'What if the lack is not a flaw to be fixed, but the very engine of your desire?',
  },
  {
    id: 'objet_a',
    title: 'The Object-Cause',
    exercise:
      'Recall something you were certain would complete you — and got. What happened to the wanting afterward? Name the next object it moved to.',
    journalPrompt: 'What does the pattern of moving objects reveal about the cause behind them all?',
  },
  {
    id: 'desire_of_other',
    title: 'The Desire of the Other',
    exercise:
      'Take one major want and trace whose desire it answers — a parent, a partner, a culture. Whose recognition are you really seeking through it?',
    journalPrompt: 'What might you want if no one were watching, and no approval were at stake?',
  },
  {
    id: 'your_part',
    title: 'Your Part',
    exercise:
      'Name a recurring situation you complain about as if it merely happens to you. Now write your own part in it — your complicity, beyond bad luck.',
    journalPrompt:
      'To re-connect with desire is to own it without guilt. What becomes possible when you stop being only the victim of the scene?',
  },
];
