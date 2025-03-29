export type PlayerData = {
    player_id: string;
    player_name: string;
    average_damage: number;
    total_damage: number;
    max_damage: number;
    min_damage: number;
    damage_range: number;
    attack_count: number;
    duration: number | string;
    team_tactics_used: number;
    mirror_force_used: number;
};

export type PlayersData = {
    raid_id: string;
    cycle: number;
    players_data: PlayerData[];
};

export type CycleOptions = {
    name: string;
    uid: string;
};
