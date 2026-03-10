import { SkinDefinition } from './index.js';
import { SlimeSkin } from './slime.js';
import { MechaSkin } from './mecha.js';
import { PhantomSkin } from './phantom.js';
import { ForestSkin } from './forest.js';

export { SkinDefinition, Part } from './index.js';

export const SKIN_DEFINITIONS: SkinDefinition[] = [
  SlimeSkin,
  MechaSkin,
  PhantomSkin,
  ForestSkin
];
