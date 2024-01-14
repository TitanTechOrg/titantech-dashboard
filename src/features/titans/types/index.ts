export type TitanSequences = {
    raid_id: string;
    titans: TitanSequence[];
};

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
    skeleton_smash_target?: boolean;
};

export type TitanCurseData = Pick<TitanSequence, 'curse_type' | 'parts' | 'id' | 'name'>;

export type CurseTypes = 'BodyDamagePerCurse' | 'AfflictedDamagePerCurse' | 'BurstDamagePerCurse';
