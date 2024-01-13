export type RaidAttack = {
    sources: RaidCard[];
    damage: number;
    occurred_at: string;
    player_name: string;
    remaining_attacks: number;
    titan_attack_id: string;
    raid_titan_id: string;
    parts: TitanPart[];
};

export type RaidCard = {
    name: string;
    value: number;
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
