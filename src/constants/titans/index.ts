export const TitanPartMap = {
    'Armor Leg Right': 'ArmorLegUpperRight',
    'Armor Hand Left': 'ArmorHandLeft',
    'Armor Hand Right': 'ArmorHandRight',
    'Armor Leg Left': 'ArmorLegUpperLeft',
    'Armor Chest': 'ArmorChestUpper',
    'Armor Arm Right': 'ArmorArmUpperRight',
    'Armor Arm Left': 'ArmorArmUpperLeft',
    'Armor Head': 'ArmorHead',
    'Body Leg Right': 'BodyLegUpperRight',
    'Body Hand Left': 'BodyHandLeft',
    'Body Hand Right': 'BodyHandRight',
    'Body Leg Left': 'BodyLegUpperLeft',
    'Body Chest': 'BodyChestUpper',
    'Body Arm Right': 'BodyArmUpperRight',
    'Body Arm Left': 'BodyArmUpperLeft',
    'Body Head': 'BodyHead',
    'Skeleton Leg Right': 'SkeletonLegUpperRight',
    'Skeleton Hand Left': 'SkeletonHandLeft',
    'Skeleton Hand Right': 'SkeletonHandRight',
    'Skeleton Leg Left': 'SkeletonLegUpperLeft',
    'Skeleton Chest': 'SkeletonChestUpper',
    'Skeleton Arm Right': 'SkeletonArmUpperRight',
    'Skeleton Arm Left': 'SkeletonArmUpperLeft',
    'Skeleton Head': 'SkeletonHead',
} as const;

// swap left side with right side parts
export const TitanPartMapPlayerPerspective = {
    // armour
    'Armor Right Shoulder': 'ArmorArmUpperLeft',
    'Armor Head': 'ArmorHead',
    'Armor Left Shoulder': 'ArmorArmUpperRight',

    'Armor Right Hand': 'ArmorHandLeft',
    'Armor Chest': 'ArmorChestUpper',
    'Armor Left Hand': 'ArmorHandRight',

    'Armor Right Leg': 'ArmorLegUpperLeft',
    'Armor Left Leg': 'ArmorLegUpperRight',

    // body
    'Body Right Shoulder': 'BodyArmUpperLeft',
    'Body Head': 'BodyHead',
    'Body Left Shoulder': 'BodyArmUpperRight',

    'Body Right Hand': 'BodyHandLeft',
    'Body Chest': 'BodyChestUpper',
    'Body Left Hand': 'BodyHandRight',

    'Body Right Leg': 'BodyLegUpperLeft',
    'Body Left Leg': 'BodyLegUpperRight',

    // skeleton
    'Skeleton Right Shoulder': 'SkeletonArmUpperLeft',
    'Skeleton Head': 'SkeletonHead',
    'Skeleton Left Shoulder': 'SkeletonArmUpperRight',

    'Skeleton Right Hand': 'SkeletonHandLeft',
    'Skeleton Chest': 'SkeletonChestUpper',
    'Skeleton Left Hand': 'SkeletonHandRight',

    'Skeleton Right Leg': 'SkeletonLegUpperLeft',
    'Skeleton Left Leg': 'SkeletonLegUpperRight',
} as const;
