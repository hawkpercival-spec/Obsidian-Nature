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
import { DESIRE_PURPOSE, AFFECT_NOTE, DESIRE_LESSON, DESIRE_EXERCISES } from '@/data/desireLack';
import { analyzeDesirePillar } from '@/analysis/remote';
import { DesireEntry } from '@/analysis/desirePillar';
import { useAppStore, analysisTone } from '@/store/useAppStore';
import { LacanianReport } from '@/types';
import { palette, spacing } from '@/theme/theme';

/**
 * Pillar IV — Desire & Lack (Lacanian).
 *
 * Purpose, the affect note, the Lesson (objet a, the barred subject, the desire
 * of the Other, fantasy, and surrounding concepts), the journal exercises, and
 * a Submit that archives an analysis aimed at articulating the truth of desire.
 */
type Draft = Record<string, { exercise: string; journal: string }>;

export function DesirePillarScreen() {
  const nav = useNavigation<any>();
  const tone = useAppStore(analysisTone);
  const store = useAppStore();
  const prog = store.pillars.find((p) => p.id === 4)!;

  const [draft, setDraft] = useState<Draft>({});
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [report, setReport] = useState<LacanianReport | null>(prog.reports.at(-1) ?? null);

  const setField = (id: string, key: 'exercise' | 'journal', v: string) =>
    setDraft((d) => ({ ...d, [id]: { exercise: d[id]?.exercise ?? '', journal: d[id]?.journal ?? '', [key]: v } }));

  const workedCount = useMemo(
    () => DESIRE_EXERCISES.filter((m) => `${draft[m.id]?.exercise ?? ''}${draft[m.id]?.journal ?? ''}`.trim().length > 0).length,
    [draft],
  );
  const canSubmit = workedCount >= Math.ceil(DESIRE_EXERCISES.length / 2);

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const entries: DesireEntry[] = DESIRE_EXERCISES.map((m) => ({
        id: m.id,
        title: m.title,
        exercise: draft[m.id]?.exercise ?? '',
        journal: draft[m.id]?.journal ?? '',
      }));
      const r = await analyzeDesirePillar(tone, entries);
      store.addPillarReport(4, r);
      setReport(r);
      if (!prog.startedAt) store.startPillar(4);
      if (r.grade && r.grade.letter !== 'Incomplete') store.completePillar(4);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenBackground>
      <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
        <Sigil name="lack" size={84} color={palette.emberRed} />
        <Title style={{ marginTop: spacing.sm, textAlign: 'center' }}>IV · Desire & Lack</Title>
        <Caption style={{ textAlign: 'center', maxWidth: 330 }}>
          The barred subject and objet petit a — what you chase, and how the chasing organises you.
        </Caption>
      </View>

      {/* Purpose + affect note */}
      <GlassCard glow>
        <Caption style={{ color: palette.candleGold, marginBottom: 4 }}>THE PURPOSE</Caption>
        <Body>{DESIRE_PURPOSE}</Body>
        <Caption style={{ color: palette.parchment, marginTop: spacing.sm }}>{AFFECT_NOTE}</Caption>
      </GlassCard>

      {/* The Lesson */}
      <SectionHeader title="The Lesson" sigil="threshold" />
      {DESIRE_LESSON.map((c) => (
        <Pressable key={c.term} onPress={() => setOpenTerm(openTerm === c.term ? null : c.term)}>
          <GlassCard glow={openTerm === c.term}>
            <Body style={{ color: palette.bone, marginBottom: openTerm === c.term ? 4 : 0 }}>{c.term}</Body>
            {openTerm === c.term && <Caption style={{ color: palette.parchment }}>{c.gloss}</Caption>}
          </GlassCard>
        </Pressable>
      ))}
      <Caption style={{ color: palette.textFaint, marginBottom: spacing.md }}>Tap a term to read it.</Caption>

      {/* Journal exercises */}
      <SectionHeader title="Journal Exercises" sigil="lack" />
      {DESIRE_EXERCISES.map((m) => (
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

      {/* Submit */}
      <View style={{ marginTop: spacing.md }}>
        <PrimaryButton
          label={submitting ? 'Articulating your desire…' : 'Submit for analysis'}
          onPress={submit}
          loading={submitting}
          disabled={!canSubmit}
        />
        {!canSubmit && (
          <Caption style={{ textAlign: 'center', marginTop: spacing.sm }}>
            Work at least {Math.ceil(DESIRE_EXERCISES.length / 2)} exercises to submit.
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
