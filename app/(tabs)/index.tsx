import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import neighborhoods from '../../lib/data/neighborhoods';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SF 동네 리스트</Text>
      <FlatList
        data={neighborhoods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Link href={`/neighborhood/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>2BR 평균 렌트: ${item.avgRent.toLocaleString()}</Text>
              <Text style={styles.meta}>
                안전 {item.safetyScore} · 교통 {item.transitScore} · 마트 {item.groceryScore}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    borderWidth: 1, borderColor: '#eee',
  },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  meta: { fontSize: 13, color: '#555' },
});
