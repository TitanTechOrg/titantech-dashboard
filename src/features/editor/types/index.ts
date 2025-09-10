export type RaidResearchNodeBaseType =
  | 'RAID'
  | 'AFFLICTION'
  | 'BURST'
  | 'ARMOR'
  | 'BODY'
  | 'TORSO'
  | 'LIMB'
  | 'HEAD'
  | 'LOJAK'
  | 'TAKEDAR'
  | 'JUKK'
  | 'STERL'
  | 'MOHACA'
  | 'TERRO'
  | 'KLONK'
  | 'PRIKER'
  | 'HEAD_ARMOR'
  | 'LIMB_ARMOR'
  | 'TORSO_ARMOR'
  | 'HEAD_BODY'
  | 'LIMB_BODY'
  | 'TORSO_BODY'
  | 'LOJAK_AFFLICTION'
  | 'TAKEDAR_AFFLICTION'
  | 'JUKK_AFFLICTION'
  | 'STERL_AFFLICTION'
  | 'MOHACA_BURST'
  | 'TERRO_BURST'
  | 'KLONK_BURST'
  | 'PRIKER_BURST'
  | 'LOJAK_BURST'
  | 'TAKEDAR_BURST'
  | 'JUKK_BURST'
  | 'STERL_BURST'
  | 'MOHACA_AFFLICTION'
  | 'TERRO_AFFLICTION'
  | 'KLONK_AFFLICTION'
  | 'PRIKER_AFFLICTION';

export type ResearchLevels = {
  total: number;
  current: number;
  bonusPer: number;
};

export type RaidResearchNode = {
  id: string;
  type: RaidResearchNodeBaseType;
  levels: ResearchLevels;
};
