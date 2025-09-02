// lib/storage/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favorites:v1';

export async function getFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export async function setFavorites(ids: string[]) {
  try {
    const unique = Array.from(new Set(ids));
    await AsyncStorage.setItem(KEY, JSON.stringify(unique));
  } catch {}
}

export async function toggleFavorite(id: string) {
  const cur = await getFavorites();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  await setFavorites(next);
  return next;
}
