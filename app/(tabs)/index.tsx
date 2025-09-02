import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import neighborhoods from '../../lib/data/neighborhoods';
import { rank, type Weights } from '../../lib/ranking';
import { getFavorites, toggleFavorite } from '../../lib/storage/favorites';

export default function Home() {
  // 즐겨찾기 로딩
  const [favs, setFavs] = useState<string[] | null>(null);
  useEffect(() => {
    (async () => setFavs(await getFavorites()))();
  }, []);

  // 필터/가중치 상태
  const [maxRent, setMaxRent] = useState<string>('0'); // 0이면 제한 없음
  const [w, setW] = useState<Weights>({ safety: 1, transit: 1, grocery: 1 });

  const ranked = useMemo(() => {
    const budget = Number(maxRent.replace(/[^0-9]/g, '')) || 0;
    return rank(neighborhoods, w, budget);
  }, [w, maxRent]);

  const reset = () => {
    setMaxRent('0');
    setW({ safety: 1, transit: 1, grocery: 1 });
  };

  const onToggleFav = async (id: string) => {
    const next = await toggleFavorite(id);
    setFavs(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SF 동네 리스트</Text>

      {/* 필터/가중치 */}
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>예산 & 가중치</Text>

        <View style={styles.row}>
          <Text style={styles.label}>최대 렌트(2BR, $)</Text>
          <TextInput
            value={maxRent}
            onChangeText={setMaxRent}
            placeholder="0 = 제한 없음"
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <WeightSlider
          label="안전"
          value={w.safety}
          onChange={(v) => setW((prev) => ({ ...prev, safety: v }))}
        />
        <WeightSlider
          label="교통"
          value={w.transit}
          onChange={(v) => setW((prev) => ({ ...prev, transit: v }))}
        />
        <WeightSlider
          label="마트"
          value={w.grocery}
          onChange={(v) => setW((prev) => ({ ...prev, grocery: v }))}
        />

        <Pressable onPress={reset} style={styles.resetBtn}>
          <Text style={{ fontWeight: '700' }}>초기화</Text>
        </Pressable>
      </View>

      {/* 리스트 */}
      <FlatList
        data={ranked}
        keyExtractor={(row) => row.item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item: row, index }) => {
          const n = row.item;
          const fav = Array.isArray(favs) && favs.includes(n.id);

          return (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <Pressable onPress={() => onToggleFav(n.id)} hitSlop={8}>
                  <Ionicons name={fav ? 'star' : 'star-outline'} size={20} color={fav ? '#f5c518' : '#888'} />
                </Pressable>
              </View>

              <Link href={`/neighborhood/${n.id}`} asChild>
                <Pressable>
                  <Text style={styles.name}>{n.name}</Text>
                  <Text style={styles.meta}>2BR 평균 렌트: ${n.avgRent.toLocaleString()}</Text>
                  <Text style={styles.meta}>
                    안전 {n.safetyScore} · 교통 {n.transitScore} · 마트 {n.groceryScore}
                  </Text>
                  <Text style={styles.score}>가중 점수: {row.score.toFixed(1)}</Text>
                </Pressable>
              </Link>
            </View>
          );
        }}
      />
    </View>
  );
}

function WeightSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.label}>{label} 가중치</Text>
        <Text style={{ color: '#333' }}>{value.toFixed(2)}</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={2}
        step={0.05}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '800' },

  panel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 8,
  },
  sectionTitle: { fontWeight: '700', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  label: { fontSize: 12, color: '#555' },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    borderWidth: 1, borderColor: '#eee',
  },
  rank: { fontSize: 12, color: '#666' },
  name: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  meta: { fontSize: 13, color: '#555', marginTop: 2 },
  score: { marginTop: 6, fontWeight: '700', color: '#0a8' },
});
