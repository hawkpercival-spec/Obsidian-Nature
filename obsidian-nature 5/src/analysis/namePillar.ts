import { AnalysisTone, LacanianReport, PillarGrade } from '@/types';

/**
 * Pillar V — "The Name" comprehensive analysis (Lacanian).
 *
 * Reads the user's exercise + journal entries and writes a formulation about
 * the signifiers placed on them, the internalised voice of the Other, the
 * symbolic debt, and the movement of taking up one's own name. Offline
 * generator; analysis/remote.ts → analyzeNamePillar routes to the LLM when
 * configured.
 */

export type NameEntry = { id: string; title: string; exercise: string; journal: string };

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function grade(entries: NameEntry[]): PillarGrade {
  const filled = entries.filter((e) => (e.exercise + e.journal).trim().length > 0).length;
  const coverage = filled / Math.max(entries.length, 1);
  const words = entries.reduce((n, e) => n + (e.exercise + ' ' + e.journal).trim().split(/\s+/).filter(Boolean).length, 0);
  const depth = ['my mother', 'my father', 'they said', 'i was told', 'expected', 'should', 'my name', 'whose voice', 'i realised', 'i realized']
    .reduce((n, m) => n + (entries.map((e) => e.exercise + ' ' + e.journal).join(' ').toLowerCase().includes(m) ? 1 : 0), 0);

  const articulation = clamp(45 + coverage * 40 + words / 14); // signifiers named in speech
  const provenance = clamp(35 + depth * 6 + coverage * 20); // whose voice / where it came from
  const authorship = clamp(30 + coverage * 35 + depth * 3); // taking up your own name

  const avg = (articulation + provenance + authorship) / 3;
  const letter: PillarGrade['letter'] =
    coverage < 0.5 ? 'Incomplete' : avg >= 82 ? 'A' : avg >= 68 ? 'B' : avg >= 52 ? 'C' : 'D';

  const commentary =
    letter === 'Incomplete'
      ? 'Not enough of the material is written yet. Return and put the signifiers into your own words before the formulation can form.'
      : provenance < 55
        ? 'You can list the words placed on you, but whose tongue is speaking them is still hidden. The next pass should name the mouth behind the voice.'
        : authorship < 55
          ? 'You hear the Other clearly. What remains is beginning, quietly, to answer to your own name.'
          : 'The signifiers of the Other are being spoken here rather than only lived out. The subject is beginning to name itself.';
  return { letter, registers: { imaginary: provenance, symbolic: articulation, real: authorship }, commentary };
}

export function generateNamePillarReport(tone: AnalysisTone, entries: NameEntry[]): LacanianReport {
  const you = tone === 'clinician' ? 'the analysand' : 'you';
  const es = tone === 'clinician' ? 's' : '';
  const g = grade(entries);
  const get = (id: string) => entries.find((e) => e.id === id);

  const opener =
    tone === 'clinician'
      ? 'Formulation for the treating analyst on Pillar V (The Name). Offered as material to verify in session — the signifiers of the Other, spoken.'
      : 'A Lacanian reading of your work in Pillar V — The Name. The signifiers placed on you, beginning to be spoken.';

  const lines: string[] = [opener];

  lines.push(
    `\nThe names placed. ${cap(you)} listed the words the family used to name ${tone === 'clinician' ? 'them' : 'you'}: “${short(get('names_placed_on_you')?.exercise)}”. These are the signifiers the subject entered before it could refuse them; they are still writing choices in the present.`,
  );

  lines.push(
    `\nThe voice of the Other. ${cap(you)} recorded, verbatim, what the internal judge says: “${short(get('internal_judge')?.exercise)}” — and traced it to “${short(get('internal_judge')?.journal)}”. The superego speaks in a borrowed tongue; hearing whose mouth first spoke it is the work.`,
  );

  lines.push(
    `\nThe Name — and the No. ${cap(you)} named an inherited prohibition: “${short(get('name_of_the_father')?.exercise)}”. Not every No is tyranny; the paternal function’s “non/nom” is what lets desire circulate and speech begin. The task is to tell structural limit from borrowed prohibition.`,
  );

  lines.push(
    `\nThe symbolic debt. ${cap(you)} named the expectations of the Other: “${short(get('symbolic_debt')?.exercise)}”. Some belong to you; some can be handed back. Naming which is which is how the debt stops being paid silently.`,
  );

  lines.push(
    `\nThe Senex and the Puer. On the inner elder of structure and the eternal youth that resists it, ${you} wrote: “${short(get('senex_and_puer')?.exercise)}”. Watch where the Senex hardens into self-tyranny, and where the Puer needs its structure to protect what it carries rather than crush it.`,
  );

  lines.push(
    `\nPunctuation and repetition. Rewriting the sentence ${you} say to yourself surfaced: “${short(get('punctuation')?.exercise)}”. And the scene that insists on returning: “${short(get('repetition')?.exercise)}”. Meaning is fixed by where the cut falls; what has been forgotten returns as action until it is spoken.`,
  );

  if ((get('passage_a_lacte')?.exercise ?? '').trim()) {
    lines.push(
      `\nActing out vs passage à l’acte. ${cap(you)} recalled both — staying in the scene as a message to the Other, and leaving it entirely as a flight into the Real: “${short(get('passage_a_lacte')?.exercise)}”. Both are last resorts against anxiety; the work is to put what was unbearable to speak into speech instead.`,
    );
  }

  lines.push(
    `\nTaking up your own name. The chosen signifier ${you} would answer to now: “${short(get('take_your_name')?.exercise)}”. This is not renaming for its own sake; it is beginning to be the subject of your own speech.`,
  );

  lines.push(`\nProgress. Articulation ${g.registers.symbolic}, provenance of the voice ${g.registers.imaginary}, authorship ${g.registers.real}. ${g.commentary}`);
  lines.push(`\nThis analysis is archived and combines into your full Pillar V report when every section is complete.`);
  // Suppress unused-var lint on `es` if this file is linted with strict rules.
  void es;

  return {
    id: uid(),
    createdAt: Date.now(),
    tone,
    title: 'Pillar V — The Name · Analysis',
    narrative: lines.join('\n'),
    focusAreas: [
      'name the signifiers placed on you, and hear whose voice they carry',
      'tell the structural “No” from the borrowed prohibition',
      'separate the symbolic debt you owe from the one you can hand back',
      'relate consciously to the Senex without becoming him',
      'read your repetitions as the insistence of a signifier',
      'begin, quietly, to answer to your own name',
    ],
    grade: g,
    pillarId: 5,
  };
}

/* helpers */
function short(v?: string) {
  const s = (v ?? '').trim();
  return !s ? '—' : s.length > 120 ? `${s.slice(0, 117)}…` : s;
}
function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
