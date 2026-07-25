import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse, Line, Path, Polygon, Text as SvgText } from 'react-native-svg';
import { EGG_ROUNDS, scoreEgg } from '@/data/eggDiagramGame';
import { CyberPad } from '@/components/CyberPad';
import { useAppStore } from '@/store/useAppStore';

/**
 * Pillar I — "The Egg Diagram and the Self" (psychosynthesis game).
 *
 * A dialogue in seven points around Assagioli's Egg. Each round the SVG Egg
 * highlights the level in play; the player chooses how to meet the moment
 * (touch or CyberPad). The pattern of choices is scored across six Assagioli
 * dimensions and saved for the Pillar I analysis report.
 */
type Phase = 'intro' | 'play' | 'result';

const PX = {
  dark: '#05070B',
  gold: '#D9A741',
  ember: '#FF2A3A',
  ox: '#7A0A12',
  bone: '#E9E4D6',
  parch: '#C8C2B0',
  faint: '#5A6272',
  aero: '#33D6E0',
  glass: 'rgba(210,235,240,0.06)',
  stroke: 'rgba(180,220,230,0.22)',
};

// which Egg band lights up per round (0 lower … 3 superconscious)
const ROUND_BAND: Record<string, number> = {
  presence: 1, // field of awareness
  dialogue: 1,
  depth: 3, // superconscious / the star
  harmony: 2, // middle
  will: 1,
  self: 3,
  care: 3,
};

export function EggDiagramGame() {
  const nav = useNavigation<any>();
  const setEggDiagramResult = useAppStore((s) => s.setEggDiagramResult);

  const [phase, setPhase] = useState<Phase>('intro');
  const [round, setRound] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [cursor, setCursor] = useState(0);

  useEffect(() => setCursor(0), [round, phase]);

  const current = EGG_ROUNDS[round];

  const pick = (optionId: string) => {
    const next = { ...choices, [current.id]: optionId };
    setChoices(next);
    if (round + 1 < EGG_ROUNDS.length) {
      setRound(round + 1);
    } else {
      const { top, missing, profile } = scoreEgg(next);
      const labels: Record<string, string> = {};
      for (const r of EGG_ROUNDS) {
        const o = r.options.find((x) => x.id === next[r.id]);
        if (o) labels[r.pointName] = o.label;
      }
      setEggDiagramResult({ choices: labels, top, missing, profile, playedAt: Date.now() });
      setPhase('result');
    }
  };

  // CyberPad
  const focusCount = phase === 'play' ? current.options.length : 1;
  const move = (d: number) => setCursor((c) => (focusCount ? (c + d + focusCount) % focusCount : 0));
  const activate = () => {
    if (phase === 'intro') setPhase('play');
    else if (phase === 'play') pick(current.options[cursor].id);
    else nav.goBack();
  };
  const padHint = phase === 'intro' ? 'SELECT TO BEGIN' : phase === 'play' ? 'CHOOSE' : 'SELECT TO RETURN';

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={() => nav.goBack()}>
            <Text style={styles.leave}>‹ Leave</Text>
          </Pressable>
          <Text style={styles.title}>THE EGG & THE SELF</Text>
          <Text style={styles.count}>{phase === 'play' ? `${round + 1}/${EGG_ROUNDS.length}` : '—'}</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 220 }}>
          {phase === 'intro' && (
            <View style={{ alignItems: 'center' }}>
              <EggSvg band={-1} />
              <Text style={styles.h1}>A Dialogue on the Self</Text>
              <Text style={styles.body}>
                Assagioli’s Egg is a map, not the truth. Across seven points — Presence, Dialogue, Depth,
                Harmony, Will, Self, Care — you’ll meet moments in the work and choose how to respond.
                There are no wrong answers; your pattern becomes part of your Pillar I analysis.
              </Text>
              <Pressable style={styles.primary} onPress={() => setPhase('play')}>
                <Text style={styles.primaryText}>Begin the dialogue</Text>
              </Pressable>
            </View>
          )}

          {phase === 'play' && (
            <View>
              <EggSvg band={ROUND_BAND[current.id] ?? -1} />
              <Text style={styles.point}>{current.pointName}</Text>
              <Text style={styles.situation}>{current.situation}</Text>
              <Text style={styles.prompt}>{current.prompt}</Text>
              {current.options.map((o, i) => (
                <Pressable
                  key={o.id}
                  style={[styles.option, cursor === i && styles.optionFocus]}
                  onPress={() => pick(o.id)}
                >
                  <Text style={styles.optionLabel}>{cursor === i ? '✶ ' : ''}{o.label}</Text>
                  <Text style={styles.optionNote}>{o.note}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {phase === 'result' && <Result choices={choices} onDone={() => nav.goBack()} />}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.padDock} pointerEvents="box-none">
        <CyberPad hint={padHint} onUp={() => move(-1)} onLeft={() => move(-1)} onDown={() => move(1)} onRight={() => move(1)} onSelect={activate} />
      </View>
    </View>
  );
}

function Result({ choices, onDone }: { choices: Record<string, string>; onDone: () => void }) {
  const { top, missing, profile } = scoreEgg(choices);
  return (
    <View>
      <EggSvg band={3} />
      <Text style={styles.h1}>The Dialogue Closes</Text>
      <View style={[styles.card, { borderColor: PX.gold }]}>
        <Text style={styles.section}>YOUR RELATION TO THE SELF</Text>
        <Text style={styles.cardBody}>{profile}</Text>
        {top.length > 0 && <Text style={[styles.cardBody, { color: PX.gold, marginTop: 8 }]}>Strongest: {top.join(' · ')}</Text>}
        {missing.length > 0 && <Text style={[styles.cardBody, { color: PX.aero, marginTop: 4 }]}>Growing edge: {missing.join(' · ')}</Text>}
      </View>
      <View style={styles.card}>
        <Text style={styles.section}>YOUR CHOICES</Text>
        {EGG_ROUNDS.map((r) => (
          <Text key={r.id} style={styles.cardBody}>
            • {r.pointName}: {r.options.find((o) => o.id === choices[r.id])?.label ?? '—'}
          </Text>
        ))}
      </View>
      <Text style={styles.disclaimer}>
        Saved to your Pillar I record. Your dialogue with the Egg is folded into your analysis report as a
        read on how you relate to the Self — its high, its depth, and the dashed line of care.
      </Text>
      <Pressable style={styles.primary} onPress={onDone}>
        <Text style={styles.primaryText}>Return to the pillar</Text>
      </Pressable>
    </View>
  );
}

/** The Egg diagram: ovoid with the six psychosynthesis levels + the star of the Self. */
function EggSvg({ band }: { band: number }) {
  // band: 0 lower, 1 field/awareness, 2 middle, 3 superconscious/star; -1 none
  const hi = (b: number) => (band === b ? PX.gold : PX.stroke);
  const hw = (b: number) => (band === b ? 2 : 1);
  return (
    <View style={{ alignItems: 'center', marginBottom: 14 }}>
      <Svg width={200} height={230} viewBox="0 0 200 230">
        {/* collective unconscious ring */}
        <Ellipse cx="100" cy="130" rx="82" ry="96" fill="none" stroke={PX.stroke} strokeWidth="1" strokeDasharray="3 4" />
        {/* the ovoid (personality egg) */}
        <Ellipse cx="100" cy="130" rx="66" ry="80" fill="rgba(210,235,240,0.04)" stroke={PX.stroke} strokeWidth="1.4" />
        {/* horizontal bands: superconscious / middle / lower */}
        <Line x1="46" y1="92" x2="154" y2="92" stroke={hi(3)} strokeWidth={hw(3)} strokeDasharray="4 3" />
        <Line x1="40" y1="168" x2="160" y2="168" stroke={hi(0)} strokeWidth={hw(0)} strokeDasharray="4 3" />
        {/* field of awareness (a circle mid-egg) */}
        <Circle cx="100" cy="130" r="22" fill="none" stroke={hi(1)} strokeWidth={hw(1)} />
        {/* the "I" — small point at the centre */}
        <Circle cx="100" cy="130" r="3" fill={band === 1 ? PX.ember : PX.bone} />
        {/* labels */}
        <SvgText x="100" y="74" fill={PX.parch} fontSize="7" textAnchor="middle">SUPERCONSCIOUS</SvgText>
        <SvgText x="100" y="112" fill={PX.parch} fontSize="7" textAnchor="middle">MIDDLE</SvgText>
        <SvgText x="100" y="186" fill={PX.parch} fontSize="7" textAnchor="middle">LOWER</SvgText>
        {/* the star of the Self at the apex + dashed line to the "I" */}
        <Line x1="100" y1="127" x2="100" y2="34" stroke={PX.gold} strokeWidth="1" strokeDasharray="2 4" opacity={0.8} />
        <Star cx={100} cy={26} r={12} fill={band === 3 ? PX.ember : PX.gold} />
      </Svg>
    </View>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${cx + Math.cos(ang) * rad},${cy + Math.sin(ang) * rad}`);
  }
  return <Polygon points={pts.join(' ')} fill={fill} stroke="#3A0207" strokeWidth={0.5} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: PX.dark },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  leave: { color: PX.parch, fontSize: 15 },
  title: { color: PX.gold, letterSpacing: 2, fontSize: 13 },
  count: { color: PX.bone, fontSize: 12 },
  h1: { color: PX.bone, fontSize: 22, marginBottom: 8, textAlign: 'center' },
  body: { color: PX.parch, fontSize: 15, lineHeight: 22, marginBottom: 14, textAlign: 'center' },
  point: { color: PX.gold, fontSize: 12, letterSpacing: 2, marginBottom: 6 },
  situation: { color: PX.bone, fontSize: 15, lineHeight: 22, fontStyle: 'italic', marginBottom: 8 },
  prompt: { color: PX.bone, fontSize: 17, lineHeight: 24, marginBottom: 12 },
  option: { backgroundColor: PX.glass, borderWidth: 1, borderColor: PX.stroke, borderRadius: 12, padding: 14, marginBottom: 10 },
  optionFocus: { borderColor: PX.gold, backgroundColor: 'rgba(217,167,65,0.10)' },
  optionLabel: { color: PX.bone, fontSize: 15, marginBottom: 4 },
  optionNote: { color: PX.faint, fontSize: 12, lineHeight: 17 },
  card: { backgroundColor: PX.glass, borderWidth: 1, borderColor: PX.stroke, borderRadius: 12, padding: 16, marginBottom: 12 },
  section: { color: PX.gold, fontSize: 12, letterSpacing: 2, marginBottom: 8 },
  cardBody: { color: PX.parch, fontSize: 14, lineHeight: 21, marginBottom: 2 },
  disclaimer: { color: PX.faint, fontSize: 12, lineHeight: 18, marginVertical: 12 },
  primary: { backgroundColor: PX.ox, borderWidth: 1, borderColor: PX.ember, borderRadius: 999, paddingVertical: 15, alignItems: 'center', marginTop: 8 },
  primaryText: { color: PX.bone, fontSize: 15, letterSpacing: 1 },
  padDock: { position: 'absolute', right: 16, bottom: 26, zIndex: 50 },
});
