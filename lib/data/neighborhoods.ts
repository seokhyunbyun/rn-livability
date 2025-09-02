import type { Neighborhood } from '../types';

const neighborhoods: Neighborhood[] = [
  { id: 'noe', name: 'Noe Valley', avgRent: 5200, safetyScore: 78, transitScore: 72, groceryScore: 85 },
  { id: 'sunset', name: 'Outer Sunset', avgRent: 3800, safetyScore: 82, transitScore: 68, groceryScore: 70 },
  { id: 'richmond', name: 'Inner Richmond', avgRent: 4200, safetyScore: 75, transitScore: 80, groceryScore: 88 },
  { id: 'soma', name: 'SoMa', avgRent: 4500, safetyScore: 60, transitScore: 90, groceryScore: 92 },
  { id: 'mission', name: 'Mission', avgRent: 4300, safetyScore: 65, transitScore: 86, groceryScore: 90 },
  { id: 'castro', name: 'Castro', avgRent: 4600, safetyScore: 72, transitScore: 84, groceryScore: 87 },
  { id: 'bernal', name: 'Bernal Heights', avgRent: 4200, safetyScore: 80, transitScore: 70, groceryScore: 75 },
  { id: 'nopa', name: 'NoPa', avgRent: 4100, safetyScore: 70, transitScore: 82, groceryScore: 83 },
  { id: 'nobhill', name: 'Nob Hill', avgRent: 5000, safetyScore: 74, transitScore: 88, groceryScore: 89 },
  { id: 'ingleside', name: 'Ingleside', avgRent: 3600, safetyScore: 77, transitScore: 62, groceryScore: 68 },
];

export default neighborhoods;