import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import neighborhoods from '../../lib/data/neighborhoods';
import { getFavorites, toggleFavorite } from '../../lib/storage/favorites';

export default function Favorites() {
  const [favs, setFavs] = useState<string[] | null>(null); // null = 로딩중

  useEffect(() => {
    (async () => setFavs(await getFavorites()))();
  }, []);

  const onToggle = async (id: string) => {
    const next = await toggleFavorite(id);
    setFavs(next);
  };

  if (favs === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>즐겨찾기</Text>
        <Text style={{ color: '#666' }}>불러오는 중…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>즐겨찾기</Text>
      <Text style={styles.subtitle}>총 {favs.length}개 저장됨</Text>

      <FlatList
        data={neighborhoods}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => {
          const selected = favs.includes(item.id);
          return (
            <Pressable
              onPress={() => onToggle(item.id)}
              style={[styles.item, selected && styles.selected]}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ color: '#555', marginTop: 2 }}>
                  2BR ${item.avgRent.toLocaleString()} · 안전 {item.safetyScore} · 교통 {item.transitScore}
                </Text>
              </View>
              <Ionicons
                name={selected ? 'star' : 'star-outline'}
                size={22}
                color={selected ? '#f5c518' : '#888'}
              />
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '800' },
  subtitle: { marginTop: 6, color: '#444', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selected: { borderColor: '#f5c518', backgroundColor: '#fffdf2' },
});
