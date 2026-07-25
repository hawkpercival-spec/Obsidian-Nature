import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Polygon } from 'react-native-svg';

/**
 * CyberPad — a cyber-goth on-screen game controller for the bloodletting game.
 *
 * A directional pad (▲ ▼ ◀ ▶) around a central sigil "select" button, in an
 * angular dark-metal housing with an oxblood glow and etched cyber-sigil ticks.
 * It drives a cursor over the focusable items on each screen; SELECT activates
 * the highlighted one. Direct touch on items still works alongside it.
 */
const C = {
  housing: '#0B0F17',
  metal: '#111725',
  metalEdge: '#1A2230',
  ember: '#FF2A3A',
  dagger: '#B3121E',
  ox: '#7A0A12',
  bone: '#E9E4D6',
  stroke: 'rgba(180,220,230,0.22)',
};

export function CyberPad({
  onUp,
  onDown,
  onLeft,
  onRight,
  onSelect,
  hint,
}: {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onSelect: () => void;
  hint?: string;
}) {
  return (
    <View style={s.wrap} pointerEvents="box-none">
      {hint ? <Text style={s.hint}>{hint}</Text> : null}
      <View style={s.housing}>
        {/* etched cyber-sigil corner ticks */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Line x1="6" y1="6" x2="16" y2="6" stroke={C.ember} strokeWidth="1" opacity={0.6} />
            <Line x1="6" y1="6" x2="6" y2="16" stroke={C.ember} strokeWidth="1" opacity={0.6} />
            <Line x1="94%" y1="6" x2="88%" y2="6" stroke={C.ember} strokeWidth="1" opacity={0.6} />
            <Polygon points="50,2 54,8 46,8" fill={C.ox} opacity={0.8} />
          </Svg>
        </View>

        {/* top */}
        <View style={s.row}>
          <Arrow char="▲" onPress={onUp} />
        </View>
        {/* middle: left · select · right */}
        <View style={s.row}>
          <Arrow char="◀" onPress={onLeft} />
          <Select onPress={onSelect} />
          <Arrow char="▶" onPress={onRight} />
        </View>
        {/* bottom */}
        <View style={s.row}>
          <Arrow char="▼" onPress={onDown} />
        </View>
      </View>
    </View>
  );
}

function Arrow({ char, onPress }: { char: string; onPress: (e: GestureResponderEvent) => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.key, pressed && s.keyDown]} hitSlop={6}>
      <Text style={s.arrow}>{char}</Text>
    </Pressable>
  );
}

function Select({ onPress }: { onPress: (e: GestureResponderEvent) => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.select, pressed && s.selectDown]} hitSlop={6}>
      <Text style={s.selectGlyph}>⛧</Text>
    </Pressable>
  );
}

const KEY = 34;

const s = StyleSheet.create({
  wrap: { alignItems: 'center' },
  hint: {
    color: C.bone,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
    opacity: 0.7,
    backgroundColor: 'rgba(11,15,23,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  housing: {
    backgroundColor: C.housing,
    borderWidth: 1,
    borderColor: C.dagger,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    // oxblood glow
    shadowColor: C.ember,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  key: {
    width: KEY,
    height: KEY,
    margin: 3,
    backgroundColor: C.metal,
    borderWidth: 1,
    borderColor: C.metalEdge,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyDown: { backgroundColor: C.ox, borderColor: C.ember },
  arrow: { color: C.ember, fontSize: 15 },
  select: {
    width: KEY + 4,
    height: KEY + 4,
    margin: 3,
    backgroundColor: C.ox,
    borderWidth: 1,
    borderColor: C.ember,
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectDown: { backgroundColor: C.dagger },
  selectGlyph: { color: C.bone, fontSize: 16, transform: [{ rotate: '-45deg' }] },
});
