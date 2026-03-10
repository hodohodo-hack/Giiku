import { GiikuState } from '../../types.js';

export interface Part {
  name: string;
  pixels: string[];
}

export interface SkinDefinition {
  id: string;
  name: string;
  color: string;
  desc: { en: string; ja: string };
  heads: Part[];
  bodies: Part[];
  feet: Part[];
  // アンロック条件 (stateを引数に取り、trueなら解放)
  checkUnlock: (state: GiikuState) => boolean;
}
