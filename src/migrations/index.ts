import * as migration_20251208_210515 from './20251208_210515';
import * as migration_20251212_133819 from './20251212_133819';

export const migrations = [
  {
    up: migration_20251208_210515.up,
    down: migration_20251208_210515.down,
    name: '20251208_210515',
  },
  {
    up: migration_20251212_133819.up,
    down: migration_20251212_133819.down,
    name: '20251212_133819'
  },
];
