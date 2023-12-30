export type RaidCardType = {
    name: string;
    value: number;
};

export type TitanPart = {
    name: string;
    value: number;
};

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
export type RaidLogType = {
    length: number;
    attack_logs: RaidAttack[];
    count: number;
    raid_id: string;
};

export type TitanSequenceResponse = {
    raid_id: string;
    titans: TitanSequence[];
};

export type CurseTypes = 'BodyDamagePerCurse' | 'AfflictedDamagePerCurse' | 'BurstDamagePerCurse';

export type TitanSequence = {
    id: string; // eg. "471b92d3-0983-424b-b021-aab03d4c2423"
    name: string; // eg. "Klonk"
    health: number; // eg. 5283000000
    current_health: number; // eg. 5283000000
    curse_type: CurseTypes; // eg. "BodyDamagePerCurse"
    curse_amount: number; // eg. -0.06 -> 6% less Body Damage
    area_type: 'string'; // eg. "AllTorsoHPMult" -> Increased torso health
    area_amount: number; // eg. 0.45 -> 45% more torso health
    sequence_index: number;
    parts: TitanSequenceParts[];
};

export type TitanSequenceParts = {
    name: string; // eg. "ArmorArmUpperLeft"
    target: boolean;
    cursed: boolean;
    health: number;
    current_health: number;
};

export type TitanCurseData = Pick<TitanSequence, 'curse_type' | 'parts' | 'id' | 'name'>;

export type CycleData = {
    raid_id: string;
    cycles: RaidCycle[];
};

export type RaidCycle = {
    id: string;
    cycle: number;
    team_tactics: number;
    mirror_force: number;
    morale: number;
    next_reset_at: string;
    started_at: string;
};

export type PercentageCardsType = {
    imageUrl: string;
    bonus: string[];
    title: string;
};

export type RaidData = {
    buff_amount: number;
    buff_type: string;
    external_reference: string;
    level: string;
    raid_id: string;
    raid_season_sequence: number;
    started_at: string;
    tier: string;
};

export type RaidListResponse = {
    count: number;
    raids: RaidData[];
};
