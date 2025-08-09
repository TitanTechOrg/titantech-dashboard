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
    ArmorArmsHPMult: {
        text: 'Hardened Vambraces',
        values: ['+40% Arm Armour', '+50% Arm Armour'],
    },
    AllLimbsHPMult: {
        text: 'Mutated Limbs',
        values: ['+50% Limb Health', '-50% Limb Health'],
    },
    AllHeadHPMult: {
        text: 'Mutated Head',
        values: ['+50% Head Health', '-20% Head Health'],
    },
    AllTorsoHPMult: {
        text: 'Mutated Torso',
        values: ['+50% Torso Health', '-30% Torso Health', '+45% Torso Health', '-50% Torso Health', '+70% Torso Health'],
    },
    ArmorLegsHPMult: {
        text: 'Hardened Leg Plate',
        values: ['+45% Leg Armour', '+50% Leg Armour'],
    },
    AllArmsHPMult: {
        text: 'Giant Arms',
        values: ['+50% Arm Health'],
    },
    AllLegsHPMult: {
        text: 'Giant Legs',
        values: ['+50% Leg Health'],
    },
} as const;
