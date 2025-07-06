import JukkHeadshot from '@/assets/titans/headshots/Jukk.webp';
import KlonkHeadshot from '@/assets/titans/headshots/Klonk.webp';
import LemmyHeadshot from '@/assets/titans/headshots/Lemmy.webp';
import LojakHeadshot from '@/assets/titans/headshots/Lojak.webp';
import MohacaHeadshot from '@/assets/titans/headshots/Mohaca.webp';
import PrikerHeadshot from '@/assets/titans/headshots/Priker.webp';
import SterlHeadshot from '@/assets/titans/headshots/Sterl.webp';
import TakedarHeadshot from '@/assets/titans/headshots/Takedar.webp';
import TerroHeadshot from '@/assets/titans/headshots/Terro.webp';
import Jukk from '@/assets/titans/Jukk.webp';
import Takedar from '@/assets/titans/Takedar.webp';
import { Avatar, Button, ButtonGroup, Checkbox, Image, Progress, Slider, SliderVariantProps } from '@heroui/react';
// import Lemmy from '@/assets/titans/Lemmy.webp';
import Klonk from '@/assets/titans/Klonk.webp';
import Lojak from '@/assets/titans/Lojak.webp';
import Mohaca from '@/assets/titans/Mohaca.webp';
import Priker from '@/assets/titans/Priker.webp';
import Sterl from '@/assets/titans/Sterl.webp';
import Terro from '@/assets/titans/Terro.webp';
import { CustomSelect } from '@/components/custom-select';
import { RaidBuffMapping, RaidEnemyBuffMapping } from '@/constants/buffs';
import { CurseTypes } from '@/features/titans/types';
import { useSelectStore } from '@/stores/useSelectStore';
import { abbreviateNumber } from '@/utils';
import { useEffect, useState } from 'react';

type TitanSelection = { id: number; name: string; headshotImg: string; bodyImg: string };

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

const titans: TitanSelection[] = [
    { id: 1, name: 'Lemmy', headshotImg: LemmyHeadshot, bodyImg: Jukk },
    { id: 2, name: 'Lojak', headshotImg: LojakHeadshot, bodyImg: Lojak },
    { id: 3, name: 'Takedar', headshotImg: TakedarHeadshot, bodyImg: Takedar },
    { id: 4, name: 'Jukk', headshotImg: JukkHeadshot, bodyImg: Jukk },
    { id: 5, name: 'Sterl', headshotImg: SterlHeadshot, bodyImg: Sterl },
    { id: 6, name: 'Mohaca', headshotImg: MohacaHeadshot, bodyImg: Mohaca },
    { id: 7, name: 'Terro', headshotImg: TerroHeadshot, bodyImg: Terro },
    { id: 8, name: 'Klonk', headshotImg: KlonkHeadshot, bodyImg: Klonk },
    { id: 9, name: 'Priker', headshotImg: PrikerHeadshot, bodyImg: Priker },
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
        case 'BodyDamagePerCurse':
            return 1;
        case 'AfflictedDamagePerCurse':
            return 2;
        case 'BurstDamagePerCurse':
            return 3;
        default:
            return 0;
    }
};

const formatter = new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TitanSelector() {
    const [selectedTitan, setSelectedTitan] = useState<TitanSelection>(titans[0]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>('head'); // Default to head
    const { selectedValues } = useSelectStore();

    // Use the store values directly
    const selectedCurseType = selectedValues['raid-sim-enemy-cursed-armour-selector'] as CurseTypes | '';

    // Derive the active curse type for UI and logic
    const activeCurseType = selectedCurseType ? (selectedCurseType as CurseTypes) : null;

    const [editMode, setEditMode] = useState<'armor' | 'health' | 'toggle'>('armor');
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

    // Function to generate titan payload
    const generateTitanPayload = () => {
        const titanPayload = {
            titan_id: selectedTitan.id,
            total_body: totalMaxHealth,
            total_armour: totalMaxHealth, // Assuming max armor equals max health
            current_body: totalCurrentHealth,
            current_armour: totalCurrentArmor,
            curse_type: activeCurseType,
            area_buff: selectedValues['raid-sim-area-bonus-selector'] || null,
            area_buff_amount: 0, // You'll need to calculate this based on the buff
            raid_bonus: selectedValues['raid-sim-enemy-bonus-selector'] || null,
            clan_damage_bonus: 0, // Not implemented yet
            loyalty_bonus: 0, // Not implemented yet

            // Map each body part
            ...Object.entries(bodyPartMapping).reduce(
                (acc, [frontendKey, apiKey]) => {
                    const maxHealth = titanBodyParts[frontendKey as keyof typeof titanBodyParts]?.health || 0;

                    acc[apiKey] = {
                        curse: getCurseValue(bodyPartCurseType[frontendKey]),
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

    //     const generateFullPayload = () => {
    //     return {
    //         player: {
    //             raid_level: 1040, // You'll need to add this to your state/form
    //             event_bonus: "Non", // You'll need to add this
    //             equipments: [], // You'll need to add equipment selection
    //             raid_research_tree: {},
    //             raid_research_bonuses: {},
    //             cards: [{}]
    //         },
    //         titan: generateTitanPayload()
    //     };
    // };

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

    const handleHealthChange = (part: string, value: number) => {
        setBodyPartHealth((prev) => ({
            ...prev,
            [part]: value,
        }));
    };

    // New handler for toggling part enabled/disabled
    const handlePartToggle = (part: string) => {
        if (editMode === 'toggle') {
            const newIsEnabled = !enabledParts[part];

            // Update enabled state
            setEnabledParts((prev) => ({
                ...prev,
                [part]: newIsEnabled,
            }));

            // If the part is being disabled, reset its health to 100%
            if (!newIsEnabled) {
                setBodyPartHealth((prev) => ({
                    ...prev,
                    [part]: titanBodyParts[part as keyof typeof titanBodyParts].health,
                }));
            }
        }
    };

    return (
        <div className="flex h-dvh w-full max-w-3xl flex-col items-center justify-center gap-4">
            <h4 className="text-l font-bold">Titan Selector</h4>
            <div className="flex flex-col items-center justify-center gap-4">
                <ButtonGroup>
                    {titans.map((titan) => (
                        <Button
                            key={titan.id}
                            onPress={(_e) => setSelectedTitan(titan)}
                            className="m-0 flex h-16 w-16 min-w-fit flex-col items-center justify-center p-0"
                        >
                            <Avatar isBordered radius="sm" src={titan.headshotImg} alt={titan.name} size="lg" />
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex flex-col gap-8 rounded-lg border-4 border-solid p-4">
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
                                classNames={{ track: 'bg-default-900/50', indicator: 'bg-default-700' }}
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
                                classNames={{ track: 'bg-default-900/50' }}
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
                                className="flex min-w-fit flex-col items-center justify-center"
                                color="warning"
                                variant="flat"
                                size="sm"
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
                            src={selectedTitan?.bodyImg}
                            alt={selectedTitan?.name}
                            className="pointer-events-none h-64 w-64 select-none object-contain"
                            draggable="false"
                        />

                        {Object.entries(titanBodyParts).map(([key, value]) => {
                            const hasArmor = bodyPartArmor[key] > 0;
                            const isSelected = selectedBodyPart === key;

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
                                                <span
                                                    className={`rounded ${
                                                        bodyPartCurseType[key]
                                                            ? `bg-${curseTypeColors[bodyPartCurseType[key] as CurseTypes]}`
                                                            : 'bg-default-600/80'
                                                    } px-1 text-white`}
                                                >
                                                    AP: {abbreviateNumber(bodyPartArmor[key])}
                                                </span>
                                            </div>
                                            <div className="mt-1 whitespace-nowrap text-[10px] font-bold">
                                                <span className={`${hasArmor ? 'bg-primary/70' : 'bg-primary'} rounded px-1 text-white`}>
                                                    HP: {abbreviateNumber(bodyPartHealth[key])}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {selectedBodyPart && editMode !== 'toggle' && (
                        <div className="rounded-t-lg border border-default bg-background/90 p-4">
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
                                                color={curseTypeColors[activeCurseType] as any}
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
                                                    setBodyPartArmor((prev) => ({
                                                        ...prev,
                                                        [selectedBodyPart]: value,
                                                    }));
                                                }
                                            }}
                                            classNames={{
                                                track: 'h-2 bg-default-200/60',
                                            }}
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
                                                        setBodyPartArmor((prev) => ({
                                                            ...prev,
                                                            [selectedBodyPart]: 0,
                                                        }));
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
                <div className="flex h-full flex-col items-start justify-start gap-2">
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
                        options={Object.entries(RaidEnemyBuffMapping).flatMap(([key, values]) =>
                            values.map((value, index) => ({ value: value, label: `${key}: ${value}`, id: `${key}-${index}` }))
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
                        options={[
                            ...Object.entries(curseTypeLabels).map(([key, label]) => ({
                                value: key,
                                label: label,
                                id: key,
                            })),
                        ]}
                        isOpen={openDropdown === 'raid-sim-enemy-cursed-armour-selector'}
                        onOpenChange={(isOpen) => {
                            setOpenDropdown(isOpen ? 'raid-sim-enemy-cursed-armour-selector' : null);
                        }}
                    />
                </div>
            </div>

            <div>
                <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => {
                        const payload = generateTitanPayload();
                        console.log('Titan Payload:', JSON.stringify(payload, null, 2));
                    }}
                >
                    Preview API Data
                </Button>
            </div>
        </div>
    );
}
