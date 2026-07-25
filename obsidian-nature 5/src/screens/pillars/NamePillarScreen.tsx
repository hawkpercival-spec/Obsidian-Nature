import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ScreenBackground,
  SectionHeader,
  Title,
  Body,
  Caption,
  PrimaryButton,
  GlassCard,
} from '@/components/ui';
import { Sigil } from '@/components/Sigil';
import { TextField } from '@/components/Questionnaire';
import { ReportView } from '@/components/ReportView';
import { NAME_PURPOSE, NAME_LESSON, NAME_EXERCISES } from '@/data/theName';
import { analyzeNamePillar } from '@/analysis/remote';
import { NameEntry } from '@/analysis/namePillar';
import { useAppStore, analysisTone } from '@/store/useAppStore';
import { LacanianReport } from '@/types';
import { palette, spacing } from '@/theme/theme';

/**
 * Pillar V — The Name, The Senex (Lacanian Symbolic + Jungian Senex).
 * Purpose, the Lesson, journal exercises, Submit → archived analysis.
 */
type Draft = Record<string, { exercise: string; journal: string }>;

export function NamePillarScreen() {
  const nav = useNavigation<any>();
  const tone = useAppStore(analysisTone);
  const store = useAppStore();
  const prog = store.pillars.find((p) => p.id === 5)!;

  const [draft, setDraft] = useState<Draft>({});
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [report, setReport] = useState<LacanianReport | null>(prog.reports.at(-1) ?? null);

  const setField = (id: string, key: 'exercise' | 'journal', v: string) =>
    setDraft((d) => ({ ...d, [id]: { exercise: d[id]?.exercise ?? '', journal: d[id]?.journal ?? '', [key]: v } }));

  const workedCount = useMemo(
    () => NAME_EXERCISES.filter((m) => `${draft[m.id]?.exercise ?? ''}${draft[m.id]?.journal ?? ''}`.trim().length > 0).length,
    [draft],
  );
  const canSubmit = workedCount >= Math.ceil(NAME_EXERCISES.length / 2);

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const entries: NameEntry[] = NAME_EXERCISES.map((m) => ({
        id: m.id,
        title: m.title,
        exercise: draft[m.id]?.exercise ?? '',
        journal: draft[m.id]?.journal ?? '',
      }));
      const r = await analyzeNamePillar(tone, entries);
      store.addPillarReport(5, r);
      setReport(r);
      if (!prog.startedAt) store.startPillar(5);
      if (r.grade && r.grade.letter !== 'Incomplete') store.completePillar(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenBackground>
      <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
        <Sigil name="threshold" size={84} color={palette.emberRed} />
        <Title style={{ marginTop: spacing.sm, textAlign: 'center' }}>V · The Name, The Senex</Title>
        <Caption style={{ textAlign: 'center', maxWidth: 330 }}>
          The Symbolic — language, law, and the Other. The signifiers placed on you before you could
          refuse them, and the inner elder of structure and limit.
        </Caption>
      </View>

      <GlassCard glow>
        <Caption style={{ color: palette.candleGold, marginBottom: 4 }}>THE PURPOSE</Caption>
        <Body>{NAME_PURPOSE}</Body>
      </GlassCard>

      <SectionHeader title="The Lesson" sigil="threshold" />
      {NAME_LESSON.map((c) => (
        <Pressable key={c.term} onPress={() => setOpenTerm(openTerm === c.term ? null : c.term)}>
          <GlassCard glow={openTerm === c.term}>
            <Body style={{ color: palette.bone, marginBottom: openTerm === c.term ? 4 : 0 }}>{c.term}</Body>
            {openTerm === c.term && <Caption style={{ color: palette.parchment }}>{c.gloss}</Caption>}
          </GlassCard>
        </Pressable>
      ))}
      <Caption style={{ color: palette.textFaint, marginBottom: spacing.md }}>Tap a term to read it.</Caption>

      <SectionHeader title="Journal & Interactive Exercises" sigil="lack" />
      {NAME_EXERCISES.map((m) => (
        <GlassCard key={m.id}>
          <Body style={{ color: palette.bone, marginBottom: spacing.sm }}>{m.title}</Body>
          <Caption style={{ color: palette.candleGold, marginBottom: 4 }}>EXERCISE</Caption>
          <Caption style={{ marginBottom: 4 }}>{m.exercise}</Caption>
          <TextField value={draft[m.id]?.exercise} onChange={(v) => setField(m.id, 'exercise', v)} placeholder="Speak it here…" />
          <Caption style={{ color: palette.candleGold, marginTop: spacing.sm, marginBottom: 4 }}>JOURNAL</Caption>
          <Caption style={{ marginBottom: 4 }}>{m.journalPrompt}</Caption>
          <TextField value={draft[m.id]?.journal} onChange={(v) => setField(m.id, 'journal', v)} placeholder="Journal entry…" />
        </GlassCard>
      ))}

      <View style={{ marginTop: spacing.md }}>
        <PrimaryButton
          label={submitting ? 'Naming the signifiers…' : 'Submit for analysis'}
          onPress={submit}
          loading={submitting}
          disabled={!canSubmit}
        />
        {!canSubmit && (
          <Caption style={{ textAlign: 'center', marginTop: spacing.sm }}>
            Work at least {Math.ceil(NAME_EXERCISES.length / 2)} exercises to submit.
          </Caption>
        )}
      </View>

      {report && (
        <>
          <SectionHeader title="Your Analysis (archived)" sigil="seal" />
          <ReportView report={report} />
          <PrimaryButton label="Return to the Codex" variant="ritual" onPress={() => nav.goBack()} />
        </>
      )}
    </ScreenBackground>
  );
}
