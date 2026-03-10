import { GiikuState } from '../../types.js';
import { NoviceTitle } from './novice.js';
import { EarlyBirdTitle } from './earlyBird.js';
import { DebugDemonTitle } from './debugDemon.js';
import { VeteranTitle } from './veteran.js';
import { CautiousTitle } from './cautious.js';
import { BurningTitle } from './burning.js';

export interface TitleDefinition {
  id: string;
  names: { en: string; ja: string };
  isDynamic: boolean;
  check: (state: GiikuState) => boolean;
}

// 判定の優先順位順に並べる（動的な称号を優先するため、チェック順を工夫する）
export const TITLE_DEFINITIONS: TitleDefinition[] = [
  BurningTitle,
  CautiousTitle,
  VeteranTitle,
  DebugDemonTitle,
  EarlyBirdTitle,
  NoviceTitle
];
