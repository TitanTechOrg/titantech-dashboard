import { RaidCardMap } from '@/constants/cards';

type RaidMapKey = keyof typeof RaidCardMap;

export const findCardType = (name: string) =>
  RaidCardMap[findCard(name) as RaidMapKey].type;

export const findCard = (name: string): string =>
  Object.keys(RaidCardMap).find(
    (v: string) => RaidCardMap[v as RaidMapKey].name === name
  ) ?? RaidCardMap.Wildcard.name;

export function getCardImageUrl(name: string): string {
  return new URL(`../assets/cards/${findCard(name)}.webp`, import.meta.url)
    .href;
}
