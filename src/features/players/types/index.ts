export type PlayerProfileType = {
    // artifact_count: number;
    // enchanted_artifact_count: number;
    // badge_count_three: number;
    // badge_count_four: number;
    // challenge_tournaments_participation: number;
    // challenge_tournaments_undisputed_count: number;
    // clan_code: string;
    // clan_name: string;
    country_code: string;
    // crafting_shards_spent: number;
    // current_world_id: number;
    // equipment_set_count: number;
    loyalty_level: number;
    max_stage: number;
    name: string;
    player_raid_level: number;
    previous_rank: string;
    raid_wildcard_count: number;
    role: string;
    // seasonal_artifact_count: number;
    // titan_points: number;
    total_card_level: number;
    // total_clan_scrolls: number;
    // total_hero_weapons: number;
    // total_pet_levels: number;
    total_raid_player_xp: number;
    // total_skill_points: number;
    // total_tournaments: number;
    // undisputed_count: number;
    cards: {
        level: number;
        quantity_received: number;
        quantity_spent: number;
        skill_name: string;
    }[];
};

export type ChartDataProps = {
    name: string; // New property for the user name
    loyalty_level: number;
    max_stage: number;
    total_card_level: number;
    player_raid_level: number;
    average_card_level: number;
};
