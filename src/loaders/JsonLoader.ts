import fs from 'fs';
import { Item } from '../types/types';

export function jsonLoader(filePath: string): { items: Array<Item>; maxWeight: number } {
  return JSON.parse(fs.readFileSync(filePath, { flag: 'r' }).toString());
}
