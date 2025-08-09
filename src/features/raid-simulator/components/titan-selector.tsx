import { CustomSelect } from '@/components/custom-select';
import { RaidBuffMapping, RaidEnemyBuffMapping } from '@/constants/buffs';
import { CurseTypes } from '@/features/titans/types';
import { useSelectStore } from '@/stores/useSelectStore';
import { abbreviateNumber } from '@/utils';
import { Button, ButtonGroup, Checkbox, CheckboxProps, Image, Progress, Slider, SliderVariantProps, Textarea } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon, ResetIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

// Zod schema for PlayerExportData validation - only required keys we use
const PlayerExportSchema = z.object({
    raidStats: z.record(z.string()),
    raidCards: z.record(z.any()),
    raid_card_research: z.record(z.string()),
    equipmentSets: z.array(z.string()),
    research: z.record(z.string()),
});

// Infer the type from the schema
type PlayerExportData = z.infer<typeof PlayerExportSchema>;

type TitanIds = 'RaidEnemy0' | 'RaidEnemy1' | 'RaidEnemy2' | 'RaidEnemy3' | 'RaidEnemy4' | 'RaidEnemy5' | 'RaidEnemy6' | 'RaidEnemy7' | 'RaidEnemy8';

type TitanSelection = { id: TitanIds; name: string };

const curseTypeLabels: Record<CurseTypes, string> = {
    BodyDamagePerCurse: 'Body Curse',
    AfflictedDamagePerCurse: 'Affliction Curse',
    BurstDamagePerCurse: 'Burst Curse',
};

const curseTypeColors: Record<CurseTypes, SliderVariantProps['color']> = {
    BodyDamagePerCurse: 'warning',
    AfflictedDamagePerCurse: 'secondary',
    BurstDamagePerCurse: 'danger',
} as const;

const getTitanImageUrl = (name: string) => {
    return new URL(`../../../assets/titans/${name}.webp`, import.meta.url).href;
};

const titans: TitanSelection[] = [
    { id: 'RaidEnemy0', name: 'Lemmy' },
    { id: 'RaidEnemy1', name: 'Lojak' },
    { id: 'RaidEnemy2', name: 'Takedar' },
    { id: 'RaidEnemy3', name: 'Jukk' },
    { id: 'RaidEnemy4', name: 'Sterl' },
    { id: 'RaidEnemy5', name: 'Mohaca' },
    { id: 'RaidEnemy6', name: 'Terro' },
    { id: 'RaidEnemy7', name: 'Klonk' },
    { id: 'RaidEnemy8', name: 'Priker' },
];

const titanBodyParts = {
    leftShoulder: { health: 1e10, position: 'left-2 top-8' },
    rightShoulder: { health: 1e10, position: 'right-2 top-8' },
    leftHand: { health: 1e10, position: 'left-2' },
    rightHand: { health: 1e10, position: 'right-2' },
    leftLeg: { health: 1e10, position: 'bottom-12 left-16' },
    rightLeg: { health: 1e10, position: 'bottom-12 right-16' },
    head: { health: 1e10, position: 'top-4' },
    torso: { health: 1e10, position: 'top-[40%]' },
};
// Add this mapping object at the top of your component
const bodyPartMapping = {
    head: 'head',
    torso: 'torso',
    rightShoulder: 'arm_right',
    leftShoulder: 'arm_left',
    rightHand: 'hand_right',
    leftHand: 'hand_left',
    rightLeg: 'leg_right',
    leftLeg: 'leg_left',
} as const;

// Helper function to convert curse type to API format
const getCurseValue = (curseType: CurseTypes | null): number => {
    if (!curseType) return 0;

    switch (curseType) {
        case 'BurstDamagePerCurse':
            return 1;
        case 'BodyDamagePerCurse':
            return 2;
        case 'AfflictedDamagePerCurse':
            return 3;
        default:
            return 0;
    }
};

const formatter = new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short', minimumFractionDigits: 2, maximumFractionDigits: 2 });

// type PlayerExportData = {
//     raidStats: { 'Raid Level': string };
//     raidCards: Record<string, RaidCardData>;
//     raid_card_research: {
//         RaidBaseDamage: string;
//         AfflictionBaseDamage: string;
//         BurstBaseDamage: string;
//         ArmorBaseDamage: string;
//         BodyBaseDamage: string;
//         HeadBaseDamage: string;
//         LimbBaseDamage: string;
//         TorsoBaseDamage: string;
//         HeadArmorBaseDamage: string;
//         LimbArmorBaseDamage: string;
//         TorsoArmorBaseDamage: string;
//         HeadBodyBaseDamage: string;
//         LimbBodyBaseDamage: string;
//         TorsoBodyBaseDamage: string;
//         Enemy1BaseDamage: string;
//         Enemy2BaseDamage: string;
//         Enemy3BaseDamage: string;
//         Enemy4BaseDamage: string;
//         Enemy5BaseDamage: string;
//         Enemy6BaseDamage: string;
//         Enemy7BaseDamage: string;
//         Enemy8BaseDamage: string;
//         Enemy1AfflictionBaseDamage: string;
//         Enemy2AfflictionBaseDamage: string;
//         Enemy3AfflictionBaseDamage: string;
//         Enemy4AfflictionBaseDamage: string;
//         Enemy5AfflictionBaseDamage: string;
//         Enemy6AfflictionBaseDamage: string;
//         Enemy7AfflictionBaseDamage: string;
//         Enemy8AfflictionBaseDamage: string;
//         Enemy1BurstBaseDamage: string;
//         Enemy2BurstBaseDamage: string;
//         Enemy3BurstBaseDamage: string;
//         Enemy4BurstBaseDamage: string;
//         Enemy5BurstBaseDamage: string;
//         Enemy6BurstBaseDamage: string;
//         Enemy7BurstBaseDamage: string;
//         Enemy8BurstBaseDamage: string;
//     };
//     equipmentSets: string[];
//     research: {
//         HeadDamage: string;
//         ChestDamage: string;
//         LimbDamage: string;
//         ArmorDamage: string;
//         BodyDamage: string;
//         RaidEnemy1Damage: string;
//         RaidEnemy2Damage: string;
//         RaidEnemy3Damage: string;
//         RaidEnemy4Damage: string;
//         RaidEnemy5Damage: string;
//         RaidEnemy6Damage: string;
//         RaidEnemy7Damage: string;
//         RaidEnemy8Damage: string;
//     };
// };

export default function TitanSelector() {
    const [selectedTitan, setSelectedTitan] = useState<TitanSelection>(titans[0]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>('head'); // Default to head
    const { selectedValues, setSelectedValue } = useSelectStore();

    // Use the store values directly
    const selectedCurseType = selectedValues['raid-sim-enemy-cursed-armour-selector'] as CurseTypes | '';

    // Derive the active curse type for UI and logic
    const activeCurseType = selectedCurseType ? (selectedCurseType as CurseTypes) : null;

    const [editMode, setEditMode] = useState<'armor' | 'health' | 'toggle'>('armor');
    const [clanDamageBonus, setClanDamageBonus] = useState<number>(25); // Default 25% for morale
    const [loyaltyBonus, setLoyaltyBonus] = useState<number>(0); // Default 0% for loyalty
    const [eventBonus, setEventBonus] = useState<string>('0'); // Default to "Non" (0)
    const [inputData, setInputData] = useState('');
    const [bodyPartArmor, setBodyPartArmor] = useState<Record<string, number>>(() => {
        const initialArmor: Record<string, number> = {};
        Object.entries(titanBodyParts).forEach(([key, value]) => {
            initialArmor[key] = value.health; // Same as health initially
        });
        return initialArmor;
    });
    const [enabledParts, setEnabledParts] = useState<Record<string, boolean>>(() => {
        const initialEnabled: Record<string, boolean> = {};
        Object.keys(titanBodyParts).forEach((key) => {
            initialEnabled[key] = true; // All parts enabled by default
        });
        return initialEnabled;
    });

    const [bodyPartHealth, setBodyPartHealth] = useState<Record<string, number>>(() => {
        const initialHealth: Record<string, number> = {};
        Object.entries(titanBodyParts).forEach(([key, value]) => {
            initialHealth[key] = value.health;
        });
        return initialHealth;
    });
    const [bodyPartCurseType, setBodyPartCurseType] = useState<Record<string, CurseTypes | null>>(() => {
        const initialCurseType: Record<string, CurseTypes | null> = {};
        Object.keys(titanBodyParts).forEach((key) => {
            initialCurseType[key] = null; // No curse by default
        });
        return initialCurseType;
    });

    const totalCurrentHealth = Object.values(bodyPartHealth).reduce((sum, health) => sum + health, 0);
    const totalCurrentArmor = Object.values(bodyPartArmor).reduce((sum, armor) => sum + armor, 0);
    const totalMaxHealth = Object.values(titanBodyParts).reduce((sum, part) => sum + part.health, 0);

    // Helper function to validate JSON with Zod schema
    const validatePlayerData = (data: string) => {
        if (!data) {
            return { isValid: false, error: null };
        }

        try {
            const parsedData = JSON.parse(data);
            const validationResult = PlayerExportSchema.safeParse(parsedData);

            if (validationResult.success) {
                return { isValid: true, error: null };
            } else {
                const errorMessage = validationResult.error.issues
                    .slice(0, 3) // Show only first 3 errors
                    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                    .join(', ');
                return { isValid: false, error: `Validation failed: ${errorMessage}` };
            }
        } catch (err) {
            return { isValid: false, error: 'Invalid JSON format' };
        }
    };

    // Validate player data using useMemo for performance
    const playerDataValidation = useMemo(() => {
        return validatePlayerData(inputData);
    }, [inputData]);

    // Function to generate titan payload
    const generateTitanPayload = () => {
        // Helper function to get the key from RaidBuffMapping based on the selected value
        const getAreaBuffKey = (selectedValue: string) => {
            if (!selectedValue) return null;
            return Object.entries(RaidBuffMapping).find(([_, value]) => value === selectedValue)?.[0] || null;
        };

        // Helper function to get the backend key from RaidEnemyBuffMapping based on the selected value
        const getRaidBonusKey = (selectedValue: string) => {
            if (!selectedValue) return null;
            for (const [key, config] of Object.entries(RaidEnemyBuffMapping)) {
                if (config.values.some((value) => selectedValue.includes(value))) {
                    return key;
                }
            }
            return null;
        };

        const titanPayload = {
            titan_id: selectedTitan.id === 'RaidEnemy0' ? null : selectedTitan.id.replace('RaidEnemy', 'Enemy'),
            total_body: totalMaxHealth,
            total_armour: totalMaxHealth,
            current_body: totalCurrentHealth,
            current_armour: totalCurrentArmor,
            curse_type: getCurseValue(activeCurseType),
            area_buff: getRaidBonusKey(selectedValues['raid-sim-enemy-bonus-selector']),
            area_buff_amount: 0, // You'll need to calculate this based on the buff
            raid_bonus: getAreaBuffKey(selectedValues['raid-sim-area-bonus-selector']),
            clan_damage_bonus: clanDamageBonus,
            loyalty_bonus: loyaltyBonus,

            // Map each body part
            ...Object.entries(bodyPartMapping).reduce(
                (acc, [frontendKey, apiKey]) => {
                    const maxHealth = titanBodyParts[frontendKey as keyof typeof titanBodyParts]?.health || 0;

                    acc[apiKey] = {
                        curse: bodyPartCurseType[frontendKey] !== null,
                        total_body: maxHealth,
                        total_armour: maxHealth,
                        current_body: bodyPartHealth[frontendKey] || 0,
                        current_armour: bodyPartArmor[frontendKey] || 0,
                    };

                    return acc;
                },
                {} as Record<string, any>
            ),
        };

        return titanPayload;
    };

    const generateFullPayload = () => {
        let parsedData: PlayerExportData | null = null;

        // Try to parse and validate the input data
        if (inputData) {
            try {
                const rawData = JSON.parse(inputData);
                const validationResult = PlayerExportSchema.safeParse(rawData);

                if (validationResult.success) {
                    parsedData = validationResult.data;
                    console.log('✅ Player export data validation successful');
                } else {
                    const errorMessage = `Validation failed: ${validationResult.error.issues
                        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                        .join(', ')}`;
                    console.error('❌ Player export data validation failed:', errorMessage);
                }
            } catch (error) {
                console.error('❌ Failed to parse input data:', error);
            }
        }

        // Helper function to convert event bonus to string
        const getEventBonusString = (value: string): string => {
            switch (value) {
                case '0':
                    return 'Non';
                case '1':
                    return 'Silver';
                case '2':
                    return 'Gold';
                default:
                    return 'Non';
            }
        };

        // Helper function to check if equipment is available
        const getAvailableEquipments = (equipmentSets: string[]) => {
            const requiredEquipments = ['Jade', 'SoloRaid', 'FirstMate', 'Runestone', 'RaidMythic'];
            return requiredEquipments.filter((equipment) => equipmentSets.includes(equipment));
        };

        // Helper function to map research data
        const mapResearchTree = (research: PlayerExportData['research'] | undefined) => {
            const mapping: Record<string, string> = {
                armor_damage: 'ArmorDamage',
                body_damage: 'BodyDamage',
                chest_damage: 'ChestDamage',
                head_damage: 'HeadDamage',
                limb_damage: 'LimbDamage',
                raid_enemy1_damage: 'RaidEnemy1Damage',
                raid_enemy2_damage: 'RaidEnemy2Damage',
                raid_enemy3_damage: 'RaidEnemy3Damage',
                raid_enemy4_damage: 'RaidEnemy4Damage',
                raid_enemy5_damage: 'RaidEnemy5Damage',
                raid_enemy6_damage: 'RaidEnemy6Damage',
                raid_enemy7_damage: 'RaidEnemy7Damage',
                raid_enemy8_damage: 'RaidEnemy8Damage',
            };

            const result: Record<string, number> = {};
            Object.entries(mapping).forEach(([key, researchKey]) => {
                result[key] =
                    research && research[researchKey as keyof PlayerExportData['research']]
                        ? Number(research[researchKey as keyof PlayerExportData['research']])
                        : 0;
            });

            return result;
        };

        // Helper function to map raid research bonuses
        const mapResearchBonuses = (raidCardResearch: PlayerExportData['raid_card_research'] | undefined) => {
            const mapping: Record<string, string> = {
                raid_base_damage: 'RaidBaseDamage',
                affliction_base_damage: 'AfflictionBaseDamage',
                burst_base_damage: 'BurstBaseDamage',
                armor_base_damage: 'ArmorBaseDamage',
                body_base_damage: 'BodyBaseDamage',
                head_base_damage: 'HeadBaseDamage',
                limb_base_damage: 'LimbBaseDamage',
                torso_base_damage: 'TorsoBaseDamage',
                head_armor_base_damage: 'HeadArmorBaseDamage',
                limb_armor_base_damage: 'LimbArmorBaseDamage',
                torso_armor_base_damage: 'TorsoArmorBaseDamage',
                head_body_base_damage: 'HeadBodyBaseDamage',
                limb_body_base_damage: 'LimbBodyBaseDamage',
                torso_body_base_damage: 'TorsoBodyBaseDamage',
                enemy1_base_damage: 'Enemy1BaseDamage',
                enemy2_base_damage: 'Enemy2BaseDamage',
                enemy3_base_damage: 'Enemy3BaseDamage',
                enemy4_base_damage: 'Enemy4BaseDamage',
                enemy5_base_damage: 'Enemy5BaseDamage',
                enemy6_base_damage: 'Enemy6BaseDamage',
                enemy7_base_damage: 'Enemy7BaseDamage',
                enemy8_base_damage: 'Enemy8BaseDamage',
                enemy1_affliction_base_damage: 'Enemy1AfflictionBaseDamage',
                enemy2_affliction_base_damage: 'Enemy2AfflictionBaseDamage',
                enemy3_affliction_base_damage: 'Enemy3AfflictionBaseDamage',
                enemy4_affliction_base_damage: 'Enemy4AfflictionBaseDamage',
                enemy5_affliction_base_damage: 'Enemy5AfflictionBaseDamage',
                enemy6_affliction_base_damage: 'Enemy6AfflictionBaseDamage',
                enemy7_affliction_base_damage: 'Enemy7AfflictionBaseDamage',
                enemy8_affliction_base_damage: 'Enemy8AfflictionBaseDamage',
                enemy1_burst_base_damage: 'Enemy1BurstBaseDamage',
                enemy2_burst_base_damage: 'Enemy2BurstBaseDamage',
                enemy3_burst_base_damage: 'Enemy3BurstBaseDamage',
                enemy4_burst_base_damage: 'Enemy4BurstBaseDamage',
                enemy5_burst_base_damage: 'Enemy5BurstBaseDamage',
                enemy6_burst_base_damage: 'Enemy6BurstBaseDamage',
                enemy7_burst_base_damage: 'Enemy7BurstBaseDamage',
                enemy8_burst_base_damage: 'Enemy8BurstBaseDamage',
            };

            const result: Record<string, number> = {};
            Object.entries(mapping).forEach(([key, researchKey]) => {
                result[key] =
                    raidCardResearch && raidCardResearch[researchKey as keyof PlayerExportData['raid_card_research']]
                        ? Number(raidCardResearch[researchKey as keyof PlayerExportData['raid_card_research']])
                        : 100;
            });

            return result;
        };

        // Helper function to map raid cards
        const mapRaidCards = (raidCards: any) => {
            if (!raidCards) return [];

            return Object.entries(raidCards).map(([cardName, cardData]: [string, any]) => ({ title: cardName, level: cardData.lv || 1 }));
        };

        return {
            player: {
                raid_level: parsedData?.raidStats?.['Raid Level'] ? Number(parsedData.raidStats['Raid Level']) : 1040,
                event_bonus: getEventBonusString(eventBonus),
                equipments: parsedData?.equipmentSets ? getAvailableEquipments(parsedData.equipmentSets) : [],
                raid_research_tree: mapResearchTree(parsedData?.research),
                raid_research_bonuses: mapResearchBonuses(parsedData?.raid_card_research),
                cards: mapRaidCards(parsedData?.raidCards),
            },
            titan: generateTitanPayload(),
        };
    };

    useEffect(() => {
        // Don't auto-apply curses to all parts when curse type changes
        // Only update existing cursed parts to the new type
        if (selectedCurseType !== undefined) {
            const newCurseTypes = { ...bodyPartCurseType };
            Object.keys(titanBodyParts).forEach((key) => {
                if (newCurseTypes[key] !== null) {
                    // Only update parts that are already cursed
                    newCurseTypes[key] = activeCurseType;
                }
            });
            setBodyPartCurseType(newCurseTypes);
        }
    }, [selectedCurseType]);

    // Console log the input data whenever it changes
    useEffect(() => {
        if (inputData) {
            console.log('Player Export Input Data:', inputData);
        }
    }, [inputData]);

    // Sync titan selection with the store
    useEffect(() => {
        const titanSelectValue = selectedValues['raid-sim-titan-selector'];
        if (titanSelectValue) {
            const foundTitan = titans.find((titan) => titan.id.toString() === titanSelectValue);
            if (foundTitan && foundTitan.id !== selectedTitan.id) {
                setSelectedTitan(foundTitan);
            }
        } else {
            // Set initial titan selection in store
            setSelectedValue('raid-sim-titan-selector', titans[0].id.toString());
        }
    }, [selectedValues, selectedTitan.id, setSelectedValue]);

    const handleHealthChange = (part: string, value: number) => {
        setBodyPartHealth((prev) => ({ ...prev, [part]: value }));
    };

    // New handler for toggling part enabled/disabled
    const handlePartToggle = (part: string) => {
        if (editMode === 'toggle') {
            const newIsEnabled = !enabledParts[part];

            // Update enabled state
            setEnabledParts((prev) => ({ ...prev, [part]: newIsEnabled }));

            // If the part is being disabled, reset its health to 100%
            if (!newIsEnabled) {
                setBodyPartHealth((prev) => ({ ...prev, [part]: titanBodyParts[part as keyof typeof titanBodyParts].health }));
            }
        }
    };

    return (
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex h-full flex-col gap-2 rounded-lg border p-4">
                    <div className="flex flex-col">
                        <div className="relative">
                            <Progress
                                aria-label="titan total armour"
                                radius="sm"
                                size="lg"
                                value={totalCurrentArmor}
                                maxValue={totalMaxHealth}
                                color="default"
                                label={<span className="absolute left-1 top-2.5 z-10 text-tiny font-bold text-white">Armour</span>}
                                showValueLabel
                                valueLabel={
                                    <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                        {formatter.format(totalCurrentArmor)} AP
                                    </span>
                                }
                                classNames={{ indicator: 'bg-default-400' }}
                            />
                        </div>
                        <div className="relative">
                            <Progress
                                aria-label="titan total health"
                                radius="sm"
                                size="lg"
                                value={totalCurrentHealth}
                                maxValue={totalMaxHealth}
                                color="primary"
                                label={<span className="absolute left-1 top-2.5 z-10 text-tiny font-bold text-white">{selectedTitan.name}</span>}
                                showValueLabel
                                valueLabel={
                                    <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                        {formatter.format(totalCurrentHealth)} HP
                                    </span>
                                }
                                classNames={{ track: 'bg-default-400/70' }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <ButtonGroup size="sm" className="flex items-center">
                                <Button
                                    color={editMode === 'health' ? 'primary' : 'default'}
                                    variant={editMode === 'health' ? 'solid' : 'flat'}
                                    onPress={() => setEditMode('health')}
                                >
                                    Adjust Health
                                </Button>
                                <Button
                                    color={editMode === 'toggle' ? 'primary' : 'default'}
                                    variant={editMode === 'toggle' ? 'solid' : 'flat'}
                                    onPress={() => setEditMode('toggle')}
                                >
                                    Toggle Parts
                                </Button>
                            </ButtonGroup>
                            <Button
                                className="flex min-w-fit items-center justify-center"
                                color="warning"
                                variant="flat"
                                size="sm"
                                startContent={<ResetIcon className="h-4 w-4" />}
                                onPress={() => {
                                    // Reset all parts to 100% health
                                    const newHealth: Record<string, number> = {};
                                    Object.entries(titanBodyParts).forEach(([key, value]) => {
                                        newHealth[key] = value.health;
                                    });
                                    setBodyPartHealth(newHealth);

                                    // Reset all armor to 100%
                                    const newArmor: Record<string, number> = {};
                                    Object.entries(titanBodyParts).forEach(([key, value]) => {
                                        newArmor[key] = value.health; // Same as health initially
                                    });
                                    setBodyPartArmor(newArmor);

                                    // Reset all curse types to null (remove all curses)
                                    const newCurseTypes: Record<string, CurseTypes | null> = {};
                                    Object.keys(titanBodyParts).forEach((key) => {
                                        newCurseTypes[key] = null;
                                    });
                                    setBodyPartCurseType(newCurseTypes);

                                    // Enable all parts
                                    const allEnabled: Record<string, boolean> = {};
                                    Object.keys(titanBodyParts).forEach((key) => {
                                        allEnabled[key] = true;
                                    });
                                    setEnabledParts(allEnabled);

                                    // Reset clan damage bonus and loyalty bonus
                                    setClanDamageBonus(25);
                                    setLoyaltyBonus(0);

                                    // Reset event bonus
                                    setEventBonus('0');

                                    // Optionally switch back to health mode
                                    setEditMode('health');
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                        {editMode === 'health' && (
                            <ButtonGroup>
                                <Button
                                    size="sm"
                                    className="flex min-w-fit flex-col items-center justify-center"
                                    onPress={() => {
                                        const newHealth = { ...bodyPartHealth };
                                        Object.keys(titanBodyParts).forEach((key) => {
                                            if (enabledParts[key]) {
                                                newHealth[key] = 0;
                                            }
                                        });
                                        setBodyPartHealth(newHealth);
                                    }}
                                >
                                    0%
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex min-w-fit flex-col items-center justify-center"
                                    onPress={() => {
                                        const newHealth = { ...bodyPartHealth };
                                        Object.entries(titanBodyParts).forEach(([key, value]) => {
                                            if (enabledParts[key]) {
                                                newHealth[key] = value.health * 0.3;
                                            }
                                        });
                                        setBodyPartHealth(newHealth);
                                    }}
                                >
                                    30%
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex min-w-fit flex-col items-center justify-center"
                                    onPress={() => {
                                        const newHealth = { ...bodyPartHealth };
                                        Object.entries(titanBodyParts).forEach(([key, value]) => {
                                            if (enabledParts[key]) {
                                                newHealth[key] = value.health;
                                            }
                                        });
                                        setBodyPartHealth(newHealth);
                                    }}
                                >
                                    100%
                                </Button>
                            </ButtonGroup>
                        )}
                    </div>
                    <div className="relative flex w-fit flex-col items-center justify-center">
                        <Image
                            src={getTitanImageUrl(selectedTitan.name)}
                            alt={selectedTitan.name}
                            className="pointer-events-none h-64 w-64 select-none object-contain"
                            draggable="false"
                        />

                        {Object.entries(titanBodyParts).map(([key, value]) => {
                            const hasArmor = bodyPartArmor[key] > 0;
                            const isSelected = selectedBodyPart === key;
                            const maxHealth = value.health;
                            const armorPercentage = (bodyPartArmor[key] / maxHealth) * 100;
                            const healthPercentage = (bodyPartHealth[key] / maxHealth) * 100;

                            return (
                                <div key={key} className={`absolute z-10 ${value.position} ${!enabledParts[key] ? 'opacity-50' : ''}`}>
                                    {editMode === 'toggle' ? (
                                        <div
                                            className={`flex h-6 w-6 items-center justify-center rounded-full 
                    ${enabledParts[key] ? 'bg-success/80' : 'bg-danger/80'} 
                    cursor-pointer text-xs text-white`}
                                            onClick={() => handlePartToggle(key)}
                                        >
                                            {enabledParts[key] ? '✓' : '×'}
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex flex-col rounded p-1 ${isSelected ? 'bg-primary-200/40 ring-1 ring-primary' : 'hover:bg-default-100/30'} cursor-pointer transition-colors`}
                                            onClick={() => setSelectedBodyPart(key)}
                                        >
                                            <div className="whitespace-nowrap text-[10px] font-bold">
                                                {hasArmor ? (
                                                    <div className="relative w-14 rounded bg-default-200/60 px-1 py-0.5">
                                                        <div
                                                            className={`absolute inset-0 rounded transition-all duration-300 ${
                                                                bodyPartCurseType[key]
                                                                    ? `bg-${curseTypeColors[bodyPartCurseType[key] as CurseTypes]}`
                                                                    : 'bg-default-500'
                                                            }`}
                                                            style={{ width: `${armorPercentage}%` }}
                                                        />
                                                        <span className="relative z-10 text-center text-white">
                                                            AP: {abbreviateNumber(bodyPartArmor[key])}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="relative w-14 rounded bg-default-200/60 px-1 py-0.5">
                                                        <div
                                                            className="absolute inset-0 rounded bg-primary transition-all duration-300"
                                                            style={{ width: `${healthPercentage}%` }}
                                                        />
                                                        <span className="relative z-10 text-center text-white">
                                                            HP: {abbreviateNumber(bodyPartHealth[key])}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex h-full flex-col items-start justify-start gap-2">
                    <CustomSelect
                        selectKey="raid-sim-titan-selector"
                        label="Titan"
                        labelTextSize="text-xs"
                        placeholder="Select a titan"
                        options={titans.map((titan) => ({ value: titan.id.toString(), label: titan.name }))}
                        isOpen={openDropdown === 'raid-sim-titan-selector'}
                        onOpenChange={(isOpen) => {
                            setOpenDropdown(isOpen ? 'raid-sim-titan-selector' : null);
                        }}
                    />
                    <CustomSelect
                        selectKey="raid-sim-area-bonus-selector"
                        label="Area Bonus"
                        labelTextSize="text-xs"
                        placeholder="No bonus"
                        options={Object.entries(RaidBuffMapping).map(([key, value]) => ({ value: value, label: value, id: key }))}
                        isOpen={openDropdown === 'raid-sim-area-bonus-selector'}
                        onOpenChange={(isOpen) => {
                            setOpenDropdown(isOpen ? 'raid-sim-area-bonus-selector' : null);
                        }}
                    />

                    <CustomSelect
                        selectKey="raid-sim-enemy-bonus-selector"
                        label="Enemy Bonus"
                        labelTextSize="text-xs"
                        placeholder="No bonus"
                        options={Object.entries(RaidEnemyBuffMapping).flatMap(([key, config]) =>
                            config.values.map((value, index) => ({ value: value, label: `${config.text}: ${value}`, id: `${key}-${index}` }))
                        )}
                        isOpen={openDropdown === 'raid-sim-enemy-bonus-selector'}
                        onOpenChange={(isOpen) => {
                            setOpenDropdown(isOpen ? 'raid-sim-enemy-bonus-selector' : null);
                        }}
                    />

                    <CustomSelect
                        selectKey="raid-sim-enemy-cursed-armour-selector"
                        label="Enemy Cursed Armour"
                        labelTextSize="text-xs"
                        placeholder="No curse"
                        options={[...Object.entries(curseTypeLabels).map(([key, label]) => ({ value: key, label: label, id: key }))]}
                        isOpen={openDropdown === 'raid-sim-enemy-cursed-armour-selector'}
                        onOpenChange={(isOpen) => {
                            setOpenDropdown(isOpen ? 'raid-sim-enemy-cursed-armour-selector' : null);
                        }}
                    />

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">Event Badge Bonus</span>
                        <div className="flex items-center gap-1">
                            <Button
                                size="sm"
                                variant="bordered"
                                color="default"
                                onPress={() => setEventBonus(Math.max(0, parseInt(eventBonus) - 1).toString())}
                                isDisabled={eventBonus === '0'}
                                className="min-w-8 px-2"
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <div className="flex min-w-8 items-center justify-center rounded-md border border-default-300 bg-default-50 px-3 py-1 text-sm font-medium">
                                {eventBonus}%
                            </div>
                            <Button
                                size="sm"
                                variant="bordered"
                                color="default"
                                onPress={() => setEventBonus(Math.min(2, parseInt(eventBonus) + 1).toString())}
                                isDisabled={eventBonus === '2'}
                                className="min-w-8 px-2"
                            >
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex w-full min-w-max flex-1 flex-col gap-2">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-xs font-medium">Clan Morale</span>
                                <span className="text-xs font-bold">{clanDamageBonus}%</span>
                            </div>
                            <Slider
                                value={clanDamageBonus}
                                maxValue={100}
                                minValue={0}
                                step={1}
                                size="sm"
                                className="w-full"
                                onChange={(value) => {
                                    if (typeof value === 'number') {
                                        setClanDamageBonus(value);
                                    }
                                }}
                                color="success"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-xs font-medium">Loyalty Bonus</span>
                                <span className="text-xs font-bold">{loyaltyBonus}%</span>
                            </div>
                            <Slider
                                value={loyaltyBonus}
                                maxValue={34}
                                minValue={0}
                                step={1}
                                size="sm"
                                className="w-full"
                                onChange={(value) => {
                                    if (typeof value === 'number') {
                                        setLoyaltyBonus(value);
                                    }
                                }}
                                color="secondary"
                            />
                        </div>
                    </div>

                    {selectedBodyPart && editMode !== 'toggle' && (
                        <div className="h-full w-full rounded-lg border border-default bg-background/90 p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold capitalize">{selectedBodyPart} Controls</h3>
                                    <Button size="sm" variant="flat" onPress={() => setSelectedBodyPart(null)}>
                                        Close
                                    </Button>
                                </div>

                                {activeCurseType && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium">{curseTypeLabels[activeCurseType]} Armor</span>
                                            <Checkbox
                                                size="sm"
                                                isSelected={bodyPartCurseType[selectedBodyPart] === activeCurseType}
                                                color={curseTypeColors[activeCurseType] as CheckboxProps['color']}
                                                isDisabled={bodyPartArmor[selectedBodyPart] <= 0} // Only disable if no armor
                                                onValueChange={(isChecked) => {
                                                    setBodyPartCurseType((prev) => ({
                                                        ...prev,
                                                        [selectedBodyPart]: isChecked ? activeCurseType : null,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Armor Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs">Armor</span>
                                            <span className="text-xs font-bold">{abbreviateNumber(bodyPartArmor[selectedBodyPart])}</span>
                                        </div>
                                        <Slider
                                            value={bodyPartArmor[selectedBodyPart]}
                                            maxValue={titanBodyParts[selectedBodyPart as keyof typeof titanBodyParts].health}
                                            minValue={0}
                                            step={titanBodyParts[selectedBodyPart as keyof typeof titanBodyParts].health / 100}
                                            size="md"
                                            className="w-full"
                                            isDisabled={!enabledParts[selectedBodyPart]}
                                            onChange={(value) => {
                                                if (typeof value === 'number') {
                                                    setBodyPartArmor((prev) => ({ ...prev, [selectedBodyPart]: value }));
                                                }
                                            }}
                                            classNames={{ track: 'h-2 bg-default-200/60' }}
                                            color={
                                                bodyPartCurseType[selectedBodyPart]
                                                    ? curseTypeColors[bodyPartCurseType[selectedBodyPart] as CurseTypes]
                                                    : 'foreground'
                                            }
                                        />
                                    </div>

                                    {/* Health Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs">Health</span>
                                            <span className="text-xs font-bold">{abbreviateNumber(bodyPartHealth[selectedBodyPart])}</span>
                                        </div>
                                        <Slider
                                            value={bodyPartHealth[selectedBodyPart]}
                                            maxValue={titanBodyParts[selectedBodyPart as keyof typeof titanBodyParts].health}
                                            minValue={0}
                                            step={titanBodyParts[selectedBodyPart as keyof typeof titanBodyParts].health / 100}
                                            size="md"
                                            className="w-full"
                                            onChange={(value) => {
                                                if (typeof value === 'number') {
                                                    // If trying to reduce health below max, set armor to 0 first
                                                    if (value < titanBodyParts[selectedBodyPart as keyof typeof titanBodyParts].health) {
                                                        setBodyPartArmor((prev) => ({ ...prev, [selectedBodyPart]: 0 }));
                                                    }
                                                    // Then update health
                                                    handleHealthChange(selectedBodyPart, value);
                                                }
                                            }}
                                            isDisabled={!enabledParts[selectedBodyPart]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex w-full max-w-md flex-col items-center gap-4">
                <Textarea
                    label="Player Export"
                    labelPlacement="outside"
                    placeholder="Paste your player export JSON data here..."
                    className="max-w-xs"
                    classNames={{ label: ['text-left'] }}
                    value={inputData}
                    onValueChange={(value) => {
                        console.log('Player Export Input:', value);
                        setInputData(value);
                    }}
                    errorMessage={playerDataValidation.error || 'Invalid player export data'}
                    isInvalid={inputData.length > 0 && !playerDataValidation.isValid}
                    size="lg"
                    description={inputData.length > 0 && playerDataValidation.isValid ? '✅ Player export data is valid' : undefined}
                />

                <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => {
                        const payload = generateFullPayload();
                        console.log('Full API Payload:', JSON.stringify(payload, null, 2));
                    }}
                >
                    Preview API Data
                </Button>
            </div>
        </div>
    );
}
