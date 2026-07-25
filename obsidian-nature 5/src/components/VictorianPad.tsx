import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

/**
 * VictorianPad — an ornate brass-and-mahogany directional toggle for the
 * bloodletting game, docked in the LEFT corner.
 *
 * Four arrow keys (up / down / left / right) around a central brass boss that
 * acts as SELECT / TAKE. Styled as a period instrument: dark mahogany housing,
 * brass bezel, engraved filigree corners, and a patina'd face. Touch-driven —
 * the player walks the chamber and takes objects with it.
 */
const B = {
  mahogany: '#2A1810',
  mahoganyDark: '#1A0F0A',
  brass: '#C9A227',
  brassDim: '#8A6E1C',
  brassLight: '#E8CC72',
  ivory: '#EFE7D2',
  ink: '#3A2A1B',
};

export function VictorianPad({
  onUp,
  onDown,
  onLeft,
  onRight,
  onSelect,
  hint,
  selectLabel = 'TAKE',
}: {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onSelect: () => void;
  hint?: string;
  selectLabel?: string;
}) {
  return (
    <View style={s.wrap} pointerEvents="box-none">
      {hint ? <Text style={s.hint}>{hint}</Text> : null}
      <View style={s.housing}>
        {/* engraved brass filigree in the corners */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Path d="M8 4 q8 0 8 8" stroke={B.brass} strokeWidth="1.2" fill="none" opacity={0.85} />
            <Path d="M4 8 q0 -4 4 -4" stroke={B.brass} strokeWidth="1.2" fill="none" opacity={0.85} />
            <Circle cx="8" cy="8" r="1.4" fill={B.brass} opacity={0.9} />
            <Line x1="26" y1="5" x2="70%" y2="5" stroke={B.brassDim} strokeWidth="0.8" opacity={0.6} />
          </Svg>
        </View>

        <View style={s.row}>
          <Key char="▲" onPress={onUp} />
        </View>
        <View style={s.row}>
          <Key char="◀" onPress={onLeft} />
          <Boss label={selectLabel} onPress={onSelect} />
          <Key char="▶" onPress={onRight} />
        </View>
        <View style={s.row}>
          <Key char="▼" onPress={onDown} />
        </View>
      </View>
    </View>
  );
}

function Key({ char, onPress }: { char: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={6} style={({ pressed }) => [s.key, pressed && s.keyDown]}>
      <Text style={s.keyGlyph}>{char}</Text>
    </Pressable>
  );
}

function Boss({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={6} style={({ pressed }) => [s.boss, pressed && s.bossDown]}>
      <Text style={s.bossText}>{label}</Text>
    </Pressable>
  );
}

const KEY = 36;

const s = StyleSheet.create({
  wrap: { alignItems: 'center' },
  hint: {
    color: B.ivory,
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 6,
    backgroundColor: 'rgba(26,15,10,0.9)',
    borderWidth: 1,
    borderColor: B.brassDim,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  housing: {
    backgroundColor: B.mahogany,
    borderWidth: 2,
    borderColor: B.brass,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  key: {
    width: KEY,
    height: KEY,
    margin: 3,
    backgroundColor: B.mahoganyDark,
    borderWidth: 1.5,
    borderColor: B.brassDim,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyDown: { backgroundColor: B.brassDim, borderColor: B.brassLight },
  keyGlyph: { color: B.brassLight, fontSize: 15 },
  boss: {
    width: KEY + 6,
    height: KEY + 6,
    margin: 3,
    backgroundColor: B.brassDim,
    borderWidth: 2,
    borderColor: B.brassLight,
    borderRadius: (KEY + 6) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bossDown: { backgroundColor: B.brass },
  bossText: { color: B.ink, fontSize: 9, letterSpacing: 0.5, fontWeight: '700' },
});
