// export type RaidCard = {
//     [key: string]: string;
// };

export type TitanPart = {
    name: string;
    value: number;
};

export type RaidAttack = {
    sources: string[];
    damage: number;
    occurred_at: string;
    player_name: string;
    remaining_attacks: number;
    titan_attack_id: string;
    parts: TitanPart[];
};
