import { AnalysisTone, LacanianReport, PillarGrade } from '@/types';

/**
 * Pillar IV — "Desire & Lack" comprehensive analysis.
 *
 * Reads the user's exercise + journal entries and writes a Lacanian formulation
 * oriented toward articulating the truth of desire in speech: the object-cause
 * (objet a) behind the chased objects, the desire of the Other, the structuring
 * lack, jouissance, and the subject's own part (the beautiful soul). Offline
 * generator; analysis/remote.ts → analyzeDesirePillar routes to the LLM when
 * configured.
 */

export type DesireEntry = { id: string; title: string; exercise: string; journal: string };

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function grade(entries: DesireEntry[]): PillarGrade {
  const filled = entries.filter((e) => (e.exercise + e.journal).trim().length > 0).length;
  const coverage = filled / Math.max(entries.length, 1);
  const words = entries.reduce((n, e) => n + (e.exercise + ' ' + e.journal).trim().split(/\s+/).filter(Boolean).length, 0);
  const depth = ['i want', 'i keep', 'because', 'my mother', 'my father', 'afraid', 'guilt', 'i realised', 'i realized', 'my part', 'whose', 'enjoy']
    .reduce((n, m) => n + (entries.map((e) => e.exercise + ' ' + e.journal).join(' ').toLowerCase().includes(m) ? 1 : 0), 0);

  const articulation = clamp(45 + coverage * 40 + words / 14); // truth of desire put into speech (symbolic)
  const fantasy = clamp(35 + depth * 5 + coverage * 20); // relation to objet a / fantasy (imaginary)
  const lack = clamp(30 + depth * 6 + coverage * 15); // proximity to lack / jouissance (real)

  const avg = (articulation + fantasy + lack) / 3;
  const letter: PillarGrade['letter'] =
    coverage < 0.5 ? 'Incomplete' : avg >= 82 ? 'A' : avg >= 68 ? 'B' : avg >= 52 ? 'C' : 'D';
  const commentary =
    letter === 'Incomplete'
      ? 'Not enough of the work is spoken yet. Return and let desire be put into words before the formulation can form.'
      : lack < 55
        ? 'You articulate the objects of desire well, but circle the structuring lack without touching it. The next pass should risk the harder truth beneath the wanting.'
        : articulation < 55
          ? 'You reach the lack, but the truth of your desire stays half-spoken. Say more than feels comfortable.'
          : 'The truth of desire is being spoken here, not merely suffered. The subject appears in the speech.';
  return { letter, registers: { imaginary: fantasy, symbolic: articulation, real: lack }, commentary };
}

export function generateDesirePillarReport(tone: AnalysisTone, entries: DesireEntry[]): LacanianReport {
  const you = tone === 'clinician' ? 'the analysand' : 'you';
  const es = tone === 'clinician' ? 's' : '';
  const g = grade(entries);
  const get = (id: string) => entries.find((e) => e.id === id);

  const opener =
    tone === 'clinician'
      ? 'Formulation for the treating analyst on Pillar IV (Desire & Lack). Offered as material to verify in session; the aim is the articulation in speech of the truth of desire.'
      : 'A Lacanian reading of your work in Pillar IV — Desire & Lack. Not a verdict, but the truth of your desire beginning to be spoken.';

  const lines: string[] = [opener];

  lines.push(
    `\nThe chain of substitutions. Asked what ${you} want${es} most, ${you} followed the associations to: “${short(get('desire_associations')?.exercise)}”. Each object is a stand-in; behind them all sits objet petit a, the object-cause that cannot be obtained, only circled.`,
  );

  lines.push(
    `\nJouissance, distinct from desire. ${cap(you)} named a costly enjoyment returned to against ${tone === 'clinician' ? 'the analysand’s' : 'your'} own interest: “${short(get('desire_jouissance')?.exercise)}”. This is jouissance — satisfaction beyond pleasure. Desire, by contrast, keeps moving; the task is not to abolish the symptom but to free desire from what binds it.`,
  );

  lines.push(
    `\nThe structuring lack. ${cap(you)} described a lack at ${tone === 'clinician' ? 'the' : 'your'} core — “${short(get('lack')?.exercise)}” — and how the chase to fill it organises the day. Read as engine rather than flaw: the barred subject desires from this division, not from any missing thing.`,
  );

  lines.push(
    `\nThe desire of the Other. Tracing whose desire a major want answers, ${you} found: “${short(get('desire_of_other')?.exercise)}”. Whose recognition is being sought here is the live question — and separating your desire from the Other’s is the movement of this pillar.`,
  );

  lines.push(
    `\nYour part (the beautiful soul). ${cap(you)} named ${tone === 'clinician' ? 'their' : 'your'} own complicity in a repeating scene: “${short(get('your_part')?.exercise)}”. Owning this — without collapsing into guilt — is precisely what lets desire be reclaimed rather than denounced in the world.`,
  );

  lines.push(`\nProgress. Articulation ${g.registers.symbolic}, relation to fantasy ${g.registers.imaginary}, proximity to lack ${g.registers.real}. ${g.commentary}`);
  lines.push(`\nThis analysis is archived and combines into your full Pillar IV report when every section is complete.`);

  return {
    id: uid(),
    createdAt: Date.now(),
    tone,
    title: 'Pillar IV — Desire & Lack · Analysis',
    narrative: lines.join('\n'),
    focusAreas: [
      'name the object-cause (objet a) behind the objects you chase',
      'separate your desire from the desire of the Other',
      'reclaim your part in what repeats — without guilt',
      'put the truth of desire into speech rather than acting it out',
    ],
    grade: g,
    pillarId: 4,
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
