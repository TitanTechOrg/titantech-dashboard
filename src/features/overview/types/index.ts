import { SVGProps } from 'react';

export type PlayerData = {
    player_id: string;
    player_name: string;
    average_damage: number;
    total_damage: number;
    max_damage: number;
    min_damage: number;
    damage_range: number;
    attack_count: number;
    duration: number;
    team_tactics_used: boolean;
    mirror_force_used: boolean;
};

export type PlayersData = {
    raid_id: string;
    cycle: number;
    players_data: PlayerData[];
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type CycleOptions = {
    name: string;
    uid: string;
};
