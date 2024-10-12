import Amplify from '@/assets/cards/Amplify.webp';
import GuardBreak from '@/assets/cards/GuardBreak.webp';
import InsanityVoid from '@/assets/cards/InsanityVoid.webp';
import Maelstrom from '@/assets/cards/Maelstrom.webp';
import RadiantKaleidoscope from '@/assets/cards/RadiantKaleidoscope.webp';
import SandsOfTime from '@/assets/cards/SandsOfTime.webp';
import { Accordion, AccordionItem, Button, Image, Textarea, Tooltip } from '@nextui-org/react';
import { CopyIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import fromExponential from 'from-exponential';
import { useCallback, useMemo, useState } from 'react';

// type RaidResearchNodeBaseType =
//     | 'RAID'
//     | 'AFFLICTION'
//     | 'BURST'
//     | 'ARMOR'
//     | 'BODY'
//     | 'TORSO'
//     | 'LIMB'
//     | 'HEAD'
//     | 'LOJAK'
//     | 'TAKEDAR'
//     | 'JUKK'
//     | 'STERL'
//     | 'MOHACA'
//     | 'TERRO'
//     | 'KLONK'
//     | 'PRIKER'
//     | 'HEAD_ARMOR'
//     | 'LIMB_ARMOR'
//     | 'TORSO_ARMOR'
//     | 'HEAD_BODY'
//     | 'LIMB_BODY'
//     | 'TORSO_BODY'
//     | 'LOJAK_AFFLICTION'
//     | 'TAKEDAR_AFFLICTION'
//     | 'JUKK_AFFLICTION'
//     | 'STERL_AFFLICTION'
//     | 'MOHACA_BURST'
//     | 'TERRO_BURST'
//     | 'KLONK_BURST'
//     | 'PRIKER_BURST'
//     | 'LOJAK_BURST'
//     | 'TAKEDAR_BURST'
//     | 'JUKK_BURST'
//     | 'STERL_BURST'
//     | 'MOHACA_AFFLICTION'
//     | 'TERRO_AFFLICTION'
//     | 'KLONK_AFFLICTION'
//     | 'PRIKER_AFFLICTION';

// type RaidResearchNode = {
//     type: RaidResearchNodeBaseType;
//     levels: { total: number; current: number; bonusPer: number };
// };

// const RaidResearch: Record<number, RaidResearchNode[]> = {
//     0: [{ type: 'RAID', levels: { total: 10, current: 0, bonusPer: 10 } }],
//     1: [
//         { type: 'AFFLICTION', levels: { total: 10, current: 0, bonusPer: 10 } },
//         { type: 'BURST', levels: { total: 10, current: 0, bonusPer: 10 } },
//     ],
//     2: [
//         { type: 'ARMOR', levels: { total: 10, current: 0, bonusPer: 10 } },
//         { type: 'BODY', levels: { total: 10, current: 0, bonusPer: 10 } },
//     ],
//     3: [
//         { type: 'HEAD', levels: { total: 8, current: 0, bonusPer: 9 } },
//         { type: 'LIMB', levels: { total: 8, current: 0, bonusPer: 9 } },
//         { type: 'TORSO', levels: { total: 8, current: 0, bonusPer: 9 } },
//     ],
//     4: [
//         { type: 'LOJAK', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'TAKEDAR', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'JUKK', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'STERL', levels: { total: 15, current: 0, bonusPer: 4 } },
//     ],
//     5: [
//         { type: 'MOHACA', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'TERRO', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'KLONK', levels: { total: 15, current: 0, bonusPer: 4 } },
//         { type: 'PRIKER', levels: { total: 15, current: 0, bonusPer: 4 } },
//     ],
//     6: [
//         { type: 'HEAD_ARMOR', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'LIMB_ARMOR', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'TORSO_ARMOR', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'HEAD_BODY', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'LIMB_BODY', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'TORSO_BODY', levels: { total: 25, current: 0, bonusPer: 2 } },
//     ],
//     7: [
//         { type: 'LOJAK_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'TAKEDAR_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'JUKK_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'STERL_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//     ],
//     8: [
//         { type: 'MOHACA_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'TERRO_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'KLONK_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'PRIKER_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//     ],
//     9: [
//         { type: 'LOJAK_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'TAKEDAR_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'JUKK_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'STERL_BURST', levels: { total: 9, current: 0, bonusPer: 6 } },
//     ],
//     10: [
//         { type: 'MOHACA_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'TERRO_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'KLONK_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//         { type: 'PRIKER_AFFLICTION', levels: { total: 9, current: 0, bonusPer: 6 } },
//     ],
//     11: [{ type: 'RAID', levels: { total: 7, current: 0, bonusPer: 8 } }],
//     12: [
//         { type: 'AFFLICTION', levels: { total: 25, current: 0, bonusPer: 2 } },
//         { type: 'BURST', levels: { total: 25, current: 0, bonusPer: 2 } },
//     ],
//     13: [
//         { type: 'ARMOR', levels: { total: 7, current: 0, bonusPer: 8 } },
//         { type: 'BODY', levels: { total: 7, current: 0, bonusPer: 8 } },
//     ],
//     14: [
//         { type: 'LIMB', levels: { total: 5, current: 0, bonusPer: 10 } },
//         { type: 'HEAD', levels: { total: 5, current: 0, bonusPer: 10 } },
//         { type: 'TORSO', levels: { total: 5, current: 0, bonusPer: 10 } },
//     ],
//     15: [
//         { type: 'MOHACA', levels: { total: 8, current: 0, bonusPer: 7 } },
//         { type: 'KLONK', levels: { total: 8, current: 0, bonusPer: 7 } },
//     ],
//     16: [
//         { type: 'TAKEDAR', levels: { total: 8, current: 0, bonusPer: 7 } },
//         { type: 'STERL', levels: { total: 8, current: 0, bonusPer: 7 } },
//     ],
//     17: [
//         { type: 'PRIKER', levels: { total: 8, current: 0, bonusPer: 7 } },
//         { type: 'TERRO', levels: { total: 8, current: 0, bonusPer: 7 } },
//     ],
//     18: [
//         { type: 'LOJAK', levels: { total: 8, current: 0, bonusPer: 7 } },
//         { type: 'JUKK', levels: { total: 8, current: 0, bonusPer: 7 } },
//     ],
//     19: [
//         { type: 'HEAD_ARMOR', levels: { total: 17, current: 0, bonusPer: 3 } },
//         { type: 'LIMB_ARMOR', levels: { total: 17, current: 0, bonusPer: 3 } },
//         { type: 'TORSO_ARMOR', levels: { total: 17, current: 0, bonusPer: 3 } },
//         { type: 'HEAD_BODY', levels: { total: 17, current: 0, bonusPer: 3 } },
//         { type: 'LIMB_BODY', levels: { total: 17, current: 0, bonusPer: 3 } },
//         { type: 'TORSO_BODY', levels: { total: 17, current: 0, bonusPer: 3 } },
//     ],
//     20: [
//         { type: 'PRIKER_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'KLONK_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'TERRO_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'MOHACA_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//     ],
//     21: [
//         { type: 'STERL_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'JUKK_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'TAKEDAR_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'LOJAK_AFFLICTION', levels: { total: 5, current: 0, bonusPer: 12 } },
//     ],
//     22: [
//         { type: 'MOHACA_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'TERRO_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'KLONK_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'PRIKER_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//     ],
//     23: [
//         { type: 'STERL_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'TAKEDAR_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'JUKK_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//         { type: 'LOJAK_BURST', levels: { total: 5, current: 0, bonusPer: 12 } },
//     ],
//     24: [{ type: 'RAID', levels: { total: 20, current: 0, bonusPer: 15 } }],
// };

type RaidKey =
    | 'MoonBeam'
    | 'Fragmentize'
    | 'SkullBash'
    | 'RazorWind'
    | 'WhipOfLightning'
    | 'BurstCount'
    | 'Purify'
    | 'LimbBurst'
    | 'FlakShot'
    | 'Haymaker'
    | 'ChainLightning'
    | 'MirrorForce'
    | 'CelestialStatic'
    | 'BurningAttack'
    | 'PoisonAttack'
    | 'DecayingAttack'
    | 'Fuse'
    | 'Shadow'
    | 'PlagueAttack'
    | 'Disease'
    | 'Swarm'
    | 'RuinousRust'
    | 'PowerBubble'
    | 'RuneAttack'
    | 'MagicPotion'
    | 'ExecutionersAxe'
    | 'CrushingVoid'
    | 'MentalFocus'
    | 'ImpactAttack'
    | 'InnerTruth'
    | 'FinisherAttack'
    | 'SuperheatMetal'
    | 'BurstBoost'
    | 'LimbSupport'
    | 'TotemFairySkill'
    | 'TeamTactics'
    | 'SpinalTap'
    | 'AstralEcho'
    | 'TriangleSupport'
    | 'Weaken'
    | 'SandsOfTime';

type RaidKeyMapType = {
    [key in RaidKey]: string;
};

const raidKeyMap: RaidKeyMapType = {
    MoonBeam: 'Moon Beam',
    Fragmentize: 'Fragmentize',
    SkullBash: 'Skull Bash',
    RazorWind: 'Razor Wind',
    WhipOfLightning: 'Whip of Lightning',
    BurstCount: 'Clanship Barrage',
    Purify: 'Purifying Blast',
    LimbBurst: 'Psychic Shackles',
    FlakShot: 'Flak Shot',
    Haymaker: 'Cosmic Haymaker',
    ChainLightning: 'Chain of Vengeance',
    MirrorForce: 'Mirror Force',
    CelestialStatic: 'Celestial Static',
    BurningAttack: 'Blazing Inferno',
    PoisonAttack: 'Acid Drench',
    DecayingAttack: 'Decaying Strike',
    Fuse: 'Fusion Bomb',
    Shadow: 'Grim Shadow',
    PlagueAttack: 'Thriving Plague',
    Disease: 'Radioactivity',
    Swarm: 'Ravenous Swarm',
    RuinousRust: 'Ruinous Rain',
    PowerBubble: 'Corrosive Bubbles',
    RuneAttack: 'Maelstrom',
    MagicPotion: 'Amplify',
    ExecutionersAxe: 'Crushing Instinct',
    CrushingVoid: 'Insanity Void',
    MentalFocus: 'Rancid Gas',
    ImpactAttack: 'Inspiring Force',
    InnerTruth: 'Soul Fire',
    FinisherAttack: 'Victory March',
    SuperheatMetal: 'Prismatic Rift',
    BurstBoost: 'Ancestral Favor',
    LimbSupport: 'Grasping Vines',
    TotemFairySkill: 'Totem of Power',
    TeamTactics: 'Team Tactics',
    SpinalTap: 'Skeletal Smash',
    AstralEcho: 'Astral Echo',
    TriangleSupport: 'Radiant Kaleidoscope',
    Weaken: 'Guard Break',
    SandsOfTime: 'Sands of Time',
};

const equipmentReplacements = {
    Jade: 'Anniversary Jade',
};

const oldSeasonalCardBoosts = {
    'Insanity Void': 10,
    Amplify: 20,
    'Radiant Kaleidoscope': 20,
};

const newSeasonalCardBoosts = {
    'Guard Break': 20,
    'Sands of Time': 20,
    Maelstrom: 10,
};

const cardsMap = {
    old: [
        { name: 'Insanity Void', level: 10, image: InsanityVoid, isRemoved: false },
        { name: 'Amplify', level: 20, image: Amplify, isRemoved: false },
        { name: 'Radiant Kaleidoscope', level: 20, image: RadiantKaleidoscope, isRemoved: false },
    ],
    new: [
        { name: 'Guard Break', level: 20, image: GuardBreak, isRemoved: true },
        { name: 'Sands of Time', level: 20, image: SandsOfTime, isRemoved: true },
        { name: 'Maelstrom', level: 10, image: Maelstrom, isRemoved: false },
    ],
};

const updateRaidCardNames = (inputData: string, keyMap: RaidKeyMapType): string => {
    const raidCardsKey = 'raidCards';
    const equipmentSetsKey = 'equipmentSets';

    try {
        const data = JSON.parse(inputData);

        if (!data || typeof data !== 'object') return '';

        if (Object.prototype.hasOwnProperty.call(data, raidCardsKey)) {
            const cards = data[raidCardsKey];

            if (typeof cards !== 'object' || cards == null) return '';

            for (const oldKey in keyMap) {
                if (!Object.prototype.hasOwnProperty.call(cards, oldKey)) {
                    continue;
                }

                cards[keyMap[oldKey as keyof RaidKeyMapType]] = cards[oldKey];

                if (Object.prototype.hasOwnProperty.call(cards[keyMap[oldKey as keyof RaidKeyMapType]], 'lv')) {
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].level = cards[keyMap[oldKey as keyof RaidKeyMapType]].lv;
                    delete cards[keyMap[oldKey as keyof RaidKeyMapType]].lv;
                }
                if (Object.prototype.hasOwnProperty.call(cards[keyMap[oldKey as keyof RaidKeyMapType]], 'num')) {
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].cards = cards[keyMap[oldKey as keyof RaidKeyMapType]].num;
                    delete cards[keyMap[oldKey as keyof RaidKeyMapType]].num;
                }

                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Insanity Void') {
                    const finalLevel = cards[keyMap[oldKey as keyof RaidKeyMapType]].level - oldSeasonalCardBoosts['Insanity Void'];
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel; // > 0 ? finalLevel : 0;
                }
                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Amplify') {
                    const finalLevel = cards[keyMap[oldKey as keyof RaidKeyMapType]].level - oldSeasonalCardBoosts['Amplify'];
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel; // > 0 ? finalLevel : 0;
                }
                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Radiant Kaleidoscope') {
                    const finalLevel = cards[keyMap[oldKey as keyof RaidKeyMapType]].level - oldSeasonalCardBoosts['Radiant Kaleidoscope'];
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel; // > 0 ? finalLevel : 0;
                }

                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Guard Break') {
                    delete cards[keyMap[oldKey as keyof RaidKeyMapType]];
                    // const finalLevel = cards[keyMap[oldKey as keyof RaidKeyMapType]].level + newSeasonalCardBoosts['Guard Break'];
                    // cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel > 100 ? 100 : finalLevel;
                }
                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Sands of Time') {
                    delete cards[keyMap[oldKey as keyof RaidKeyMapType]];
                    // const finalLevel = cards[keyMap[oldKey as keyof RaidKeyMapType]].level + newSeasonalCardBoosts['Sands of Time'];
                    // cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel > 100 ? 100 : finalLevel;
                }
                if (keyMap[oldKey as keyof RaidKeyMapType] === 'Maelstrom') {
                    const finalLevel: number = cards[keyMap[oldKey as keyof RaidKeyMapType]].level + newSeasonalCardBoosts['Maelstrom'];
                    cards[keyMap[oldKey as keyof RaidKeyMapType]].level = finalLevel > 100 ? 100 : finalLevel;
                }

                if (oldKey !== keyMap[oldKey as keyof RaidKeyMapType]) delete cards[oldKey];
            }
        }

        const equipments = data[equipmentSetsKey];

        if (typeof equipments !== 'object' || equipments == null) return '';

        data[equipmentSetsKey] = data[equipmentSetsKey].map((item: string) => equipmentReplacements[item as keyof { Jade: string }] || item);

        return data;
    } catch (err) {
        return '';
    }
};

type NecrobearBonuses = {
    HeadDamage: string;
    ChestDamage: string;
    LimbDamage: string;
    ArmorDamage: string;
    BodyDamage: string;
    RaidEnemy1Damage: string;
    RaidEnemy2Damage: string;
    RaidEnemy3Damage: string;
    RaidEnemy4Damage: string;
    RaidEnemy5Damage: string;
    RaidEnemy6Damage: string;
    RaidEnemy7Damage: string;
    RaidEnemy8Damage: string;
};

type ReadableNecrobearBonuses = {
    Head: number;
    Torso: number;
    Limb: number;
    Armour: number;
    Body: number;
    Lojak: number;
    Takedar: number;
    Jukk: number;
    Sterl: number;
    Mohaca: number;
    Terro: number;
    Klonk: number;
    Priker: number;
};

type NecroProps = {
    data: string;
};

function NecrobearBonus({ data }: NecroProps) {
    const parseNecrobearBonus = (data: string) => {
        try {
            const parsed = JSON.parse(data);

            if (!Object.prototype.hasOwnProperty.call(parsed, 'research')) return;

            const research: NecrobearBonuses = parsed['research'];

            const bonuses: ReadableNecrobearBonuses = {
                Head: readDamagePercentage(research, 'HeadDamage'),
                Torso: readDamagePercentage(research, 'ChestDamage'),
                Limb: readDamagePercentage(research, 'LimbDamage'),
                Armour: readDamagePercentage(research, 'ArmorDamage'),
                Body: readDamagePercentage(research, 'BodyDamage'),
                Lojak: readDamagePercentage(research, 'RaidEnemy1Damage'),
                Takedar: readDamagePercentage(research, 'RaidEnemy2Damage'),
                Jukk: readDamagePercentage(research, 'RaidEnemy3Damage'),
                Sterl: readDamagePercentage(research, 'RaidEnemy4Damage'),
                Mohaca: readDamagePercentage(research, 'RaidEnemy5Damage'),
                Terro: readDamagePercentage(research, 'RaidEnemy6Damage'),
                Klonk: readDamagePercentage(research, 'RaidEnemy7Damage'),
                Priker: readDamagePercentage(research, 'RaidEnemy8Damage'),
            };
            return bonuses;
        } catch (err) {
            return undefined;
        }
    };

    const readDamagePercentage = (research: NecrobearBonuses, key: keyof NecrobearBonuses) => {
        const val = research[key];

        if (Number.isNaN(val)) return 0;

        const exp = fromExponential(val);

        if (isNaN(Number(exp))) return 0;

        return Number(exp) * 100;
    };

    const text = parseNecrobearBonus(data);

    return (
        <div className="flex w-full max-w-md shrink-0 flex-col gap-4 text-sm">
            <h3>Necrobear</h3>
            <p className="text-left">
                You have the following Forbidden Research raid bonuses. These are not yet taken into account by TT2 Raid Optimizer.
            </p>
            {text && (
                <div className="self-center">
                    <ul className={`${Object.keys(text).length / 2 > 5 ? 'columns-2 sm:columns-3' : 'columns-1'} gap-8`}>
                        {Object.keys(text).map((key) => {
                            return (
                                <li key={key}>
                                    <div className="flex justify-between gap-4">
                                        <span>{key}</span>
                                        <span>{text[key as keyof ReadableNecrobearBonuses]}%</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

type SeasonalCardsInfoSectionProps = {
    title: string;
    data: typeof cardsMap.new;
    isNewSeason: boolean;
};

function SeasonalCardsInfoSection({ title, data, isNewSeason }: SeasonalCardsInfoSectionProps) {
    return (
        <div className="flex flex-col gap-2 text-sm">
            <p>{title}</p>
            <ul className="grid columns-1 gap-0.5">
                {data.map(({ name, level, image, isRemoved }) => {
                    return (
                        <li key={name}>
                            <div className="flex shrink-0 flex-row items-center gap-4">
                                <Image src={image} alt={`${name} raid card`} className="h-8 w-8 object-cover" radius="sm" />
                                {isNewSeason ? '+' : '-'}
                                {level}
                                {isRemoved && <span className="text-xs">(Removed from player export)</span>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function PlayerExport() {
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const prettyJson = useMemo(
        () => (data: string) => {
            if (!data) {
                return null;
            }

            try {
                return JSON.stringify(JSON.parse(data), null, 2);
            } catch (err) {
                return null;
            }
        },
        []
    );

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(outputData);

            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 1000);
        } catch (err) {
            return;
        }
    }, [prettyJson, inputData]);

    const clearText = () => {
        setInputData('');
        setOutputData('');
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex max-w-md flex-col font-normal">
                <h3 className="pb-2 text-base">What is Player Export Editor?</h3>
                <div className="flex max-w-md flex-col gap-2 text-left">
                    <p className="text-sm">
                        This tool provides a temporary fix for making TT2 player export compatible with the
                        <span className="italic">&nbsp;TT2 Raid Optimizer</span> app. If the copied export below is not working, please re-install the{' '}
                        <span className="italic">TT2 Raid Optimizer</span> app and try again.
                    </p>
                    <Accordion className="px-0">
                        <AccordionItem key="1" aria-label="Show card changes" title="Show card changes" classNames={{ title: ['text-sm'] }}>
                            <div className="flex max-w-md flex-col gap-4">
                                <SeasonalCardsInfoSection title="Changes to card levels in the raid app" data={cardsMap.old} isNewSeason={false} />
                                <SeasonalCardsInfoSection title="Current seasonal card buffs" data={cardsMap.new} isNewSeason={true} />
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <div className="flex w-full max-w-md flex-col items-center justify-center gap-8 sm:flex-row sm:items-start">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Textarea
                        label="Player Export"
                        labelPlacement="outside"
                        placeholder="Paste here"
                        className="max-w-xs"
                        classNames={{ label: ['text-left'] }}
                        value={inputData}
                        onValueChange={(val) => {
                            const pretty = prettyJson(val);
                            setInputData(val);
                            typeof pretty === 'string' ? setOutputData(JSON.stringify(updateRaidCardNames(pretty, raidKeyMap))) : setOutputData('');
                        }}
                        errorMessage={'Invalid JSON data'}
                        aria-errormessage="Invalid JSON data"
                        isInvalid={inputData.length > 0 && prettyJson(inputData) == null}
                        size="lg"
                    />
                    <Button
                        isDisabled={!inputData.length}
                        color="default"
                        aria-label="Clear player export text"
                        onClick={clearText}
                        className={`w-fit self-center ${!inputData.length ? 'hidden' : 'inline-flex'}`}
                        startContent={<CrossCircledIcon />}
                    >
                        Clear
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Textarea
                        label="Fixed Player Export"
                        labelPlacement="outside"
                        placeholder="Copy to TT2 Raid Optimizer app"
                        className="max-w-xs"
                        classNames={{ label: ['text-left'] }}
                        value={outputData}
                        onValueChange={setOutputData}
                        isReadOnly={true}
                        errorMessage={'Something went wrong...'}
                        size="lg"
                    />
                    <Tooltip
                        aria-label="Copied to clipboard tooltip"
                        isDisabled={!prettyJson(inputData)}
                        isOpen={isOpen}
                        content="Copied"
                        showArrow={true}
                        placement="right"
                    >
                        <Button
                            isDisabled={!prettyJson(inputData)}
                            color="primary"
                            aria-label="Copy player export"
                            onClick={copyToClipboard}
                            className="w-fit self-center"
                            startContent={<CopyIcon />}
                        >
                            Copy
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {prettyJson(inputData) && <NecrobearBonus data={inputData} />}
            {/* w-[56rem] min-w-max max-w-4xl */}
            {/* <div className="w-full overflow-x-auto">
                <ol className="">
                    {Object.entries(RaidResearch).map(([key, node]) => (
                        <li key={key} className={`mb-8 w-full whitespace-nowrap`}>
                            <div className="overflow-auto">
                                <div className="flex gap-1 overflow-x-auto sm:justify-center">
                                    {node.map(({ levels, type }) => {
                                        return <ResearchNode key={key + type} levels={levels} type={type} />;
                                    })}
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div> */}
        </div>
    );
}

// type ResearchNodeProps = RaidResearchNode & { key: string };
// function ResearchNode({ key, levels, type }: ResearchNodeProps) {
//     const title = type.replace('_', ' ').toLowerCase();
//     const [level, setLevel] = useState<number>(levels.current);

//     return (
//         <div key={key} className="min-w-[150px] max-w-4xl rounded-lg border p-2">
//             <span className="text-xs capitalize">{title}</span>
//             <div className="flex items-center justify-center gap-2">
//                 <Button
//                     isIconOnly
//                     size="sm"
//                     startContent={<MinusIcon />}
//                     onClick={() => {
//                         if (level === 0) return;
//                         setLevel((prev) => prev - 1);
//                     }}
//                 ></Button>
//                 <span className="text-sm">
//                     {level}/{levels.total}
//                 </span>
//                 <Button
//                     isIconOnly
//                     size="sm"
//                     startContent={<PlusIcon />}
//                     onClick={() => {
//                         if (level < levels.total) setLevel((prev) => prev + 1);
//                     }}
//                 ></Button>
//             </div>
//         </div>
//     );
// }
