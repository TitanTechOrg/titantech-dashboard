export type LeaderboardPosition = {
    rank: number;
    level: number;
    code: string;
    name: string;
};

export type LeaderboardOccurrences = {
    occurred_at: string;
    positions: LeaderboardPosition[];
};

export type LeaderboardSeason = {
    season: string;
    occurrences: LeaderboardOccurrences[];
};
