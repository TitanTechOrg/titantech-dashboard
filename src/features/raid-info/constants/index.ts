export const AttacksRaidTierMapping: Record<number, { label: string; attacks: number }> = {
    1: { label: 'Tier 1', attacks: 3 },
    2: { label: 'Tier 2', attacks: 4 },
    3: { label: 'Tier 3', attacks: 4 },
    4: { label: 'Tier 4', attacks: 5 },
    5: { label: 'Tier 5', attacks: 6 },
    9999: { label: 'Master Tier', attacks: 6 },
} as const;
