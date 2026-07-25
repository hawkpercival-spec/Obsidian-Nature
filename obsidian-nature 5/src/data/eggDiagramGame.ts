/**
 * Pillar I — "The Egg Diagram and the Self" game (psychosynthesis).
 *
 * A dialogue-in-seven-points around Assagioli's Egg. Each round asks the player
 * how they would meet a moment in the work; every option is tagged to one or
 * more Assagioli-native dimensions. The player's pattern of choices produces a
 * short profile that is folded into the Pillar I comprehensive analysis report.
 *
 * Content is grounded psychology; the metaphysics are held as symbols, not
 * literal claims (per Assagioli's own caution that "a diagram is not the truth").
 */

export type EggDim = 'Presence' | 'Dialogue' | 'Depth' | 'Harmony' | 'Will' | 'Care';

export const EGG_DIM_DESC: Record<EggDim, string> = {
  Presence: 'being here for the encounter, without agenda',
  Dialogue: 'understanding over opposing, even where diversity is free',
  Depth: 'both high and low — refusing to make the Self an idol on a pedestal',
  Harmony: 'the inside job — synthesis without erasing what is particular',
  Will: 'the Self as skilful conductor, choosing action over drift',
  Care: 'keeping the dashed line between Ego and Self — the bridge of care and love',
};

export type EggOption = { id: string; label: string; note: string; tags: EggDim[] };
export type EggRound = {
  id: string;
  pointName: string; // e.g. "Presence"
  situation: string; // second-person setup
  prompt: string;
  options: EggOption[];
};

export const EGG_ROUNDS: EggRound[] = [
  {
    id: 'presence',
    pointName: 'Presence',
    situation:
      'You come to the meeting on the Self. Others are gathered. Something delicate is about to be spoken.',
    prompt: 'How do you take your seat?',
    options: [
      { id: 'arrive', label: 'Arrive fully, breathing, before anyone speaks', note: 'Presence as the ground of encounter.', tags: ['Presence'] },
      { id: 'observe', label: 'Sit at the edge and observe the room first', note: 'Care and caution — reading the atmosphere.', tags: ['Care', 'Depth'] },
      { id: 'lead', label: 'Begin by naming the theme and setting the tone', note: 'Will taking a shape as leadership.', tags: ['Will', 'Presence'] },
    ],
  },
  {
    id: 'dialogue',
    pointName: 'Dialogue',
    situation:
      'A friend proposes removing the star of the Self from the Egg diagram. It matters to them; it matters to you differently.',
    prompt: 'What do you do?',
    options: [
      { id: 'understand', label: 'Ask them to say more, until you understand from inside', note: 'Dialogue as the key to non-opposition.', tags: ['Dialogue', 'Care'] },
      { id: 'defend', label: 'Argue the tradition — someone has to keep the sign', note: 'Will, but risking opposition.', tags: ['Will'] },
      { id: 'concede', label: 'Nod and let it go; disagreement makes you uneasy', note: 'A false harmony that skips the encounter.', tags: [] },
    ],
  },
  {
    id: 'depth',
    pointName: 'Depth',
    situation:
      'Someone says the Self should be at the centre, not the top. You feel your own attachment to the star at the apex.',
    prompt: 'Where do you go with the disagreement?',
    options: [
      { id: 'both', label: '“Both high and low” — the mountain AND the roots', note: 'Depth: refusing the false choice between top and centre.', tags: ['Depth', 'Harmony'] },
      { id: 'top', label: 'Hold that the apex is the place of command', note: 'Will, with the danger of hierarchy for its own sake.', tags: ['Will'] },
      { id: 'tip', label: 'Tip the map — you gain pro-depth by turning it', note: 'Depth as new dimension, not new dogma.', tags: ['Depth'] },
    ],
  },
  {
    id: 'harmony',
    pointName: 'Harmony',
    situation:
      'You notice kaleidoscopic pieces of yourself pulling in different directions.',
    prompt: 'How do you move toward unity?',
    options: [
      { id: 'inside_job', label: 'Do the inside job — bring the parts into dialogue', note: 'Harmony as continuous creation.', tags: ['Harmony', 'Dialogue'] },
      { id: 'command', label: 'Impose order from outside and settle it', note: 'Will without harmony — a suppression, not a synthesis.', tags: ['Will'] },
      { id: 'wait', label: 'Wait for the noise to subside on its own', note: 'A passive peace that leaves the pieces scattered.', tags: [] },
    ],
  },
  {
    id: 'will',
    pointName: 'The Self That Wants',
    situation:
      'A subpersonality you had mistaken for yourself has just been seen through. It has caused suffering.',
    prompt: 'Where do you find strength?',
    options: [
      { id: 'ego', label: 'In the small point of you where you feel whole and free — the personal Ego, growing in awareness and love', note: 'Will meets Harmony: the Ego as a bridge, not a scope.', tags: ['Will', 'Harmony'] },
      { id: 'confess', label: 'In naming the harm and beginning to make amends', note: 'Care for the relationships wounded.', tags: ['Care'] },
      { id: 'shame', label: 'In the shame that hardens into resolve', note: 'Willed change on brittle ground; watch the price.', tags: ['Will'] },
    ],
  },
  {
    id: 'self',
    pointName: 'The Self',
    situation:
      'A moment of recognition arrives quietly — “There is just one Aristocracy, that of the Heart; one Democracy, the Agreement; one new order, that of Sharing; one Culture, that reveals the Beauty of Synthesis.”',
    prompt: 'How do you receive it?',
    options: [
      { id: 'heart', label: 'Let it be kept in the Heart, without turning it into a doctrine', note: 'The Self held, not seized.', tags: ['Care', 'Depth'] },
      { id: 'share', label: 'Share it aloud so others can meet it with you', note: 'Dialogue and Presence made outward.', tags: ['Dialogue', 'Presence'] },
      { id: 'record', label: 'Write it down as a rule to remember tomorrow', note: 'Necessary map; risk of parallel reality if held rigidly.', tags: [] },
    ],
  },
  {
    id: 'care',
    pointName: 'The Relationship of Care',
    situation:
      'You must decide how to draw the diagram for your own life. Ego alone at the centre? Star of the Self at the top? Both, with a dashed line?',
    prompt: 'Which sign do you keep?',
    options: [
      { id: 'dashed', label: 'Both — Ego at the centre, star of the Self at the top, dashed line between', note: 'The bridge of care and love: personal to Universal.', tags: ['Care', 'Depth', 'Harmony'] },
      { id: 'ego_only', label: 'Ego only at the centre — trust the mutability', note: 'Risks confusing the Ego with the Self.', tags: [] },
      { id: 'self_only', label: 'Star only at the apex — trust the height', note: 'Risks making the Self an idol on a pedestal.', tags: ['Will'] },
    ],
  },
];

/** Score across the six dimensions and produce a short profile string. */
export function scoreEgg(choices: Record<string, string>) {
  const tags: Record<EggDim, number> = { Presence: 0, Dialogue: 0, Depth: 0, Harmony: 0, Will: 0, Care: 0 };
  for (const round of EGG_ROUNDS) {
    const opt = round.options.find((o) => o.id === choices[round.id]);
    opt?.tags.forEach((t) => (tags[t] += 1));
  }
  const top = (Object.keys(tags) as EggDim[])
    .filter((k) => tags[k] > 0)
    .sort((a, b) => tags[b] - tags[a])
    .slice(0, 2);
  const missing = (Object.keys(tags) as EggDim[]).filter((k) => tags[k] === 0);
  const profile =
    top.length >= 2
      ? `Your dialogue with the Egg leaned toward ${EGG_DIM_DESC[top[0]]} and ${EGG_DIM_DESC[top[1]]}.`
      : top.length === 1
        ? `Your dialogue with the Egg leaned toward ${EGG_DIM_DESC[top[0]]}.`
        : 'Your choices were evenly distributed across the seven points.';
  const growth = missing.length
    ? ` The dimensions least called on: ${missing.join(', ')} — worth watching for on the climb.`
    : '';
  return { tags, top, missing, profile: profile + growth };
}
