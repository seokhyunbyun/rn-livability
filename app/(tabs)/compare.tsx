import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import neighborhoods from '../../lib/data/neighborhoods';
import type { Neighborhood } from '../../lib/types';

type MetricKey = 'avgRent' | 'safetyScore' | 'transitScore' | 'groceryScore';

const METRICS: { label: string; key: MetricKey; higherIsBetter: boolean; format: (n: number) => string }[] = [
  { label: '2BR 렌트', key: 'avgRent', higherIsBetter: false, format: (n) => `$${n.toLocaleString()}` },
  { label: '안전', key: 'safetyScore', higherIsBetter: true, format: (n) => String(n) },
  { label: '교통', key: 'transitScore', higherIsBetter: true, format: (n) => String(n) },
  { label: '마트', key: 'groceryScore', higherIsBetter: true, format: (n) => String(n) },
];

export default function Compare() {
  const [aId, setAId] = useState(neighborhoods[0]?.id);
  const [bId, setBId] = useState(neighborhoods[1]?.id ?? neighborhoods[0]?.id);

  const A = useMemo(() => neighborhoods.find((n) => n.id === aId) as Neighborhood, [aId]);
  const B = useMemo(() => neighborhoods.find((n) => n.id === bId) as Neighborhood, [bId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>동네 비교</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>A</Text>
          <Picker selectedValue={aId} onValueChange={(v) => setAId(v)}>
            {neighborhoods.map((n) => (
              <Picker.Item key={n.id} label={n.name} value={n.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>B</Text>
          <Picker selectedValue={bId} onValueChange={(v) => setBId(v)}>
            {neighborhoods.map((n) => (
              <Picker.Item key={n.id} label={n.name} value={n.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.card}>
        {METRICS.map(({ label, key, higherIsBetter, format }) => {
          const aVal = A[key] as number;
          const bVal = B[key] as number;
          const cmp = compare(aVal, bVal, higherIsBetter); // 1이면 A 우세, -1이면 B 우세, 0이면 동률

          return (
            <View key={key} style={styles.metricRow}>
              <Text style={styles.metricLabel}>{label}</Text>
              <Text style={[styles.metricValue, cmp === 1 && styles.win]}>{format(aVal)}</Text>
              <Text style={[styles.metricValue, cmp === -1 && styles.win]}>{format(bVal)}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.hint}>
        녹색이 더 유리한 값이에요. (렌트는 낮을수록, 나머지는 높을수록 좋음)
      </Text>
    </View>
  );
}

function compare(a: number, b: number, higherIsBetter: boolean) {
  if (a === b) return 0;
  return higherIsBetter ? (a > b ? 1 : -1) : (a < b ? 1 : -1);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  label: { fontSize: 12, color: '#555', paddingHorizontal: 12, paddingTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', padding: 12, marginTop: 12 },
  metricRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  metricLabel: { flex: 1.4, fontWeight: '600' },
  metricValue: { flex: 1, textAlign: 'right' },
  win: { fontWeight: '700', color: '#0a8' },
  hint: { marginTop: 8, color: '#444' },
});
