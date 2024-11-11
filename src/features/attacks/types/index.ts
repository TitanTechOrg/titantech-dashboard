import { MappedArmourColour, MappedBodyColour } from '../constants';

export type RaidAttack = {
    sources: RaidCardType[];
    damage: number;
    occurred_at: string;
    player_name: string;
    remaining_attacks: number;
    titan_attack_id: string;
    raid_titan_id: string;
    parts: TitanPart[];
};

export type RaidCardType = {
    name: string;
    value: number;
    readableName?: string;
};

export type TitanPart = {
    name: string;
    value: number;
};

export type RaidLogs = {
    length: number;
    attack_logs: RaidAttack[];
    count: number;
    raid_id: string;
};

export type MappedArmourType = keyof typeof MappedArmourColour;
export type MappedBodyType = keyof typeof MappedBodyColour;
