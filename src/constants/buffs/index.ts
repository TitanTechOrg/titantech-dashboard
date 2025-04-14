export const RaidBuffMapping = {
    BurstDamage: 'Burst Damage +30%',
    AfflictedDamage: 'Affliction Damage +30%',
    AllRaidDamage: 'All Raid Damage +15%',
    BurstChance: 'Burst Chance +30%',
    AfflictedDuration: 'Affliction Duration +50%',
    AfflictedChance: 'Affliction Chance +30%',
    RaidAttackDuration: 'Attack Duration +3s',
    SupportEffect: 'All Support Effects +15%',
} as const;

export const RaidEnemyBuffMapping = {
    'Hardened Vambraces': ['+40% Arm Armour', '+50% Arm Armour'],
    'Mutated Limbs': ['+50% Limb Health', '-50% Limb Health'],
    'Mutated Head': ['+50% Head Health', '-20% Head Health'],
    'Mutated Torso': ['+50% Torso Health', '-30% Torso Health', '+45% Torso Health', '-50% Torso Health', '+70% Torso Health'],
    'Hardened Leg Plate': ['+45% Leg Armour', '+50% Leg Armour'],
    'Giant Arms': ['+50% Arm Health'],
    'Giant Legs': ['+50% Leg Health'],
} as const;
