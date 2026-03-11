import { SkinDefinition } from './index.js';
import { HamburgerSkin } from './hamburger.js';
import { OnigiriSkin } from './onigiri.js';

export { SkinDefinition, Part } from './index.js';

export const SKIN_DEFINITIONS: SkinDefinition[] = [
  HamburgerSkin,
  OnigiriSkin
];
