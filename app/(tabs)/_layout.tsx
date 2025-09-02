import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="map" options={{ title: '지도' }} />
      <Tabs.Screen name="compare" options={{ title: '비교' }} />
      <Tabs.Screen name="favorites" options={{ title: '즐겨찾기' }} />
    </Tabs>
  );
}