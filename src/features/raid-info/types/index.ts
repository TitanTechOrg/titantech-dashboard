import { RaidBuffMapping } from '@/constants/buffs';
import { AttacksRaidTierMapping } from '../constants';

export type RaidBuffMappingType = keyof typeof RaidBuffMapping;
export type RaidTierType = keyof typeof AttacksRaidTierMapping;

export type RaidCycle = {
    id: string;
    cycle: number;
    team_tactics: number;
    mirror_force: number;
    morale: number;
    next_reset_at: string;
    started_at: string;
    average_damage: number;
};

export type CycleData = {
    raid_id: string;
    cycles: RaidCycle[];
};

export type RaidData = {
    buff_amount?: number;
    buff_type?: string;
    external_reference: string;
    level: string;
    raid_id: string;
    raid_season_sequence: number;
    started_at: string;
    ended_at?: string;
    tier: number;
    tierLabel?: string;
    attacksPerTier: number;
};
export type RaidList = {
    count: number;
    raids: RaidData[];
};

export type PercentageCardsType = {
    imageUrl: string;
    bonus: string[];
    title: string;
};

export type DamageCardChartData = {
    name: string | number;
    average: number;
    overall: number;
};

export type DamageCardData = {
    imageUrl: string;
    title: string;
    data: DamageCardChartData[];
};
