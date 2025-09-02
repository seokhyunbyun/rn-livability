import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import neighborhoods from '../../lib/data/neighborhoods';

export default function NeighborhoodDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const n = neighborhoods.find((x) => x.id === id);

  if (!n) {
    return (
      <View style={styles.container}>
        <Text>존재하지 않는 동네입니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{n.name}</Text>
      <Text style={styles.meta}>2BR 평균 렌트: ${n.avgRent.toLocaleString()}</Text>
      <Text style={styles.meta}>안전: {n.safetyScore}</Text>
      <Text style={styles.meta}>교통: {n.transitScore}</Text>
      <Text style={styles.meta}>마트 접근성: {n.groceryScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 6 },
  title: { fontSize: 22, fontWeight: '800' },
  meta: { fontSize: 14, color: '#333' },
});
