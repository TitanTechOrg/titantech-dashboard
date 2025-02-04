import GuardBreak from '@/assets/cards/GuardBreak.webp';
import InspiringForce from '@/assets/cards/InspiringForce.webp';
import Maelstrom from '@/assets/cards/Maelstrom.webp';
import SandsOfTime from '@/assets/cards/SandsOfTime.webp';
import SkeletalSmash from '@/assets/cards/SkeletalSmash.webp';
import VictoryMarch from '@/assets/cards/VictoryMarch.webp';
import { PageContainer } from '@/components';
import { Accordion, AccordionItem, Button, Image, Textarea, Tooltip } from '@heroui/react';
import { CopyIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useCallback, useMemo, useState } from 'react';

enum RaidKey {
    MoonBeam = 'MoonBeam',
    Fragmentize = 'Fragmentize',
    SkullBash = 'SkullBash',
    RazorWind = 'RazorWind',
    WhipOfLightning = 'WhipOfLightning',
    BurstCount = 'BurstCount',
    Purify = 'Purify',
    LimbBurst = 'LimbBurst',
    FlakShot = 'FlakShot',
    Haymaker = 'Haymaker',
    ChainLightning = 'ChainLightning',
    MirrorForce = 'MirrorForce',
    CelestialStatic = 'CelestialStatic',
    BurningAttack = 'BurningAttack',
    PoisonAttack = 'PoisonAttack',
    DecayingAttack = 'DecayingAttack',
    Fuse = 'Fuse',
    Shadow = 'Shadow',
    PlagueAttack = 'PlagueAttack',
    Disease = 'Disease',
    Swarm = 'Swarm',
    RuinousRust = 'RuinousRust',
    PowerBubble = 'PowerBubble',
    RuneAttack = 'RuneAttack',
    MagicPotion = 'MagicPotion',
    ExecutionersAxe = 'ExecutionersAxe',
    CrushingVoid = 'CrushingVoid',
    MentalFocus = 'MentalFocus',
    ImpactAttack = 'ImpactAttack',
    InnerTruth = 'InnerTruth',
    FinisherAttack = 'FinisherAttack',
    SuperheatMetal = 'SuperheatMetal',
    BurstBoost = 'BurstBoost',
    LimbSupport = 'LimbSupport',
    TotemFairySkill = 'TotemFairySkill',
    TeamTactics = 'TeamTactics',
    SpinalTap = 'SpinalTap',
    AstralEcho = 'AstralEcho',
    TriangleSupport = 'TriangleSupport',
    Weaken = 'Weaken',
    SandsOfTime = 'SandsOfTime',
}

const raidKeyMap: Record<RaidKey, string> = {
    [RaidKey.MoonBeam]: 'Moon Beam',
    [RaidKey.Fragmentize]: 'Fragmentize',
    [RaidKey.SkullBash]: 'Skull Bash',
    [RaidKey.RazorWind]: 'Razor Wind',
    [RaidKey.WhipOfLightning]: 'Whip of Lightning',
    [RaidKey.BurstCount]: 'Clanship Barrage',
    [RaidKey.Purify]: 'Purifying Blast',
    [RaidKey.LimbBurst]: 'Psychic Shackles',
    [RaidKey.FlakShot]: 'Flak Shot',
    [RaidKey.Haymaker]: 'Cosmic Haymaker',
    [RaidKey.ChainLightning]: 'Chain of Vengeance',
    [RaidKey.MirrorForce]: 'Mirror Force',
    [RaidKey.CelestialStatic]: 'Celestial Static',
    [RaidKey.BurningAttack]: 'Blazing Inferno',
    [RaidKey.PoisonAttack]: 'Acid Drench',
    [RaidKey.DecayingAttack]: 'Decaying Strike',
    [RaidKey.Fuse]: 'Fusion Bomb',
    [RaidKey.Shadow]: 'Grim Shadow',
    [RaidKey.PlagueAttack]: 'Thriving Plague',
    [RaidKey.Disease]: 'Radioactivity',
    [RaidKey.Swarm]: 'Ravenous Swarm',
    [RaidKey.RuinousRust]: 'Ruinous Rain',
    [RaidKey.PowerBubble]: 'Corrosive Bubbles',
    [RaidKey.RuneAttack]: 'Maelstrom',
    [RaidKey.MagicPotion]: 'Amplify',
    [RaidKey.ExecutionersAxe]: 'Crushing Instinct',
    [RaidKey.CrushingVoid]: 'Insanity Void',
    [RaidKey.MentalFocus]: 'Rancid Gas',
    [RaidKey.ImpactAttack]: 'Inspiring Force',
    [RaidKey.InnerTruth]: 'Soul Fire',
    [RaidKey.FinisherAttack]: 'Victory March',
    [RaidKey.SuperheatMetal]: 'Prismatic Rift',
    [RaidKey.BurstBoost]: 'Ancestral Favor',
    [RaidKey.LimbSupport]: 'Grasping Vines',
    [RaidKey.TotemFairySkill]: 'Totem of Power',
    [RaidKey.TeamTactics]: 'Team Tactics',
    [RaidKey.SpinalTap]: 'Skeletal Smash',
    [RaidKey.AstralEcho]: 'Astral Echo',
    [RaidKey.TriangleSupport]: 'Radiant Kaleidoscope',
    [RaidKey.Weaken]: 'Guard Break',
    [RaidKey.SandsOfTime]: 'Sands of Time',
};

const oldSeasonalCardBoosts: Partial<Record<RaidKey, number>> = {
    [RaidKey.Weaken]: 20,
    [RaidKey.SandsOfTime]: 20,
    [RaidKey.RuneAttack]: 10,
};

const newSeasonalCardBoosts: Partial<Record<RaidKey, number>> = {
    [RaidKey.FinisherAttack]: 15,
    [RaidKey.ImpactAttack]: 15,
    [RaidKey.SpinalTap]: 15,
};

const updateRaidCardNames = (inputData: string, keyMap: Record<RaidKey, string>): string => {
    const raidCardsKey = 'raidCards';

    try {
        const data = JSON.parse(inputData);

        if (!data || typeof data !== 'object') return '';

        if (Object.prototype.hasOwnProperty.call(data, raidCardsKey)) {
            const cards = data[raidCardsKey];

            if (typeof cards !== 'object' || cards == null) return '';

            for (const raidKey of Object.values(RaidKey)) {
                if (!Object.prototype.hasOwnProperty.call(cards, raidKey)) {
                    continue;
                }

                const card = cards[raidKey];
                if (!card || typeof card.lv !== 'number') continue;

                const humanReadableName = keyMap[raidKey];

                // Applying old seasonal boosts
                if (humanReadableName === keyMap[RaidKey.Weaken]) {
                    const boost = oldSeasonalCardBoosts[RaidKey.Weaken];
                    if (boost !== undefined) {
                        card.lv -= boost;
                    }
                }
                if (humanReadableName === keyMap[RaidKey.SandsOfTime]) {
                    const boost = oldSeasonalCardBoosts[RaidKey.SandsOfTime];
                    if (boost !== undefined) {
                        card.lv -= boost;
                    }
                }
                if (humanReadableName === keyMap[RaidKey.RuneAttack]) {
                    const boost = oldSeasonalCardBoosts[RaidKey.RuneAttack];
                    if (boost !== undefined) {
                        card.lv -= boost;
                    }
                }

                // Applying new seasonal boosts
                if (humanReadableName === keyMap[RaidKey.FinisherAttack]) {
                    const boost = newSeasonalCardBoosts[RaidKey.FinisherAttack];
                    if (boost !== undefined) {
                        card.lv += boost;
                        card.lv = Math.min(card.lv, 100);
                    }
                }
                if (humanReadableName === keyMap[RaidKey.ImpactAttack]) {
                    const boost = newSeasonalCardBoosts[RaidKey.ImpactAttack];
                    if (boost !== undefined) {
                        card.lv += boost;
                        card.lv = Math.min(card.lv, 100);
                    }
                }
                if (humanReadableName === keyMap[RaidKey.SpinalTap]) {
                    const boost = newSeasonalCardBoosts[RaidKey.SpinalTap];
                    if (boost !== undefined) {
                        card.lv += boost;
                        card.lv = Math.min(card.lv, 100);
                    }
                }
            }
        }

        delete data['raid_card_research'];

        return data;
    } catch (err) {
        return '';
    }
};

const cardsMap = {
    old: [
        { name: 'Guard Break', level: 20, image: GuardBreak, isRemoved: false },
        { name: 'Sands of Time', level: 20, image: SandsOfTime, isRemoved: false },
        { name: 'Maelstrom', level: 10, image: Maelstrom, isRemoved: false },
    ],
    new: [
        { name: 'Inspiring Force', level: 15, image: InspiringForce, isRemoved: false },
        { name: 'Skeletal Smash', level: 15, image: SkeletalSmash, isRemoved: false },
        { name: 'Victory March', level: 15, image: VictoryMarch, isRemoved: false },
    ],
};
// type NecrobearBonuses = {
//     HeadDamage: string;
//     ChestDamage: string;
//     LimbDamage: string;
//     ArmorDamage: string;
//     BodyDamage: string;
//     RaidEnemy1Damage: string;
//     RaidEnemy2Damage: string;
//     RaidEnemy3Damage: string;
//     RaidEnemy4Damage: string;
//     RaidEnemy5Damage: string;
//     RaidEnemy6Damage: string;
//     RaidEnemy7Damage: string;
//     RaidEnemy8Damage: string;
// };

// type ReadableNecrobearBonuses = {
//     Head: number;
//     Torso: number;
//     Limb: number;
//     Armour: number;
//     Body: number;
//     Lojak: number;
//     Takedar: number;
//     Jukk: number;
//     Sterl: number;
//     Mohaca: number;
//     Terro: number;
//     Klonk: number;
//     Priker: number;
// };

// type NecroProps = {
//     data: string;
// };

// function NecrobearBonus({ data }: NecroProps) {
//     const parseNecrobearBonus = (data: string) => {
//         try {
//             const parsed = JSON.parse(data);

//             if (!Object.prototype.hasOwnProperty.call(parsed, 'research')) return;

//             const research: NecrobearBonuses = parsed['research'];

//             const bonuses: ReadableNecrobearBonuses = {
//                 Head: readDamagePercentage(research, 'HeadDamage'),
//                 Torso: readDamagePercentage(research, 'ChestDamage'),
//                 Limb: readDamagePercentage(research, 'LimbDamage'),
//                 Armour: readDamagePercentage(research, 'ArmorDamage'),
//                 Body: readDamagePercentage(research, 'BodyDamage'),
//                 Lojak: readDamagePercentage(research, 'RaidEnemy1Damage'),
//                 Takedar: readDamagePercentage(research, 'RaidEnemy2Damage'),
//                 Jukk: readDamagePercentage(research, 'RaidEnemy3Damage'),
//                 Sterl: readDamagePercentage(research, 'RaidEnemy4Damage'),
//                 Mohaca: readDamagePercentage(research, 'RaidEnemy5Damage'),
//                 Terro: readDamagePercentage(research, 'RaidEnemy6Damage'),
//                 Klonk: readDamagePercentage(research, 'RaidEnemy7Damage'),
//                 Priker: readDamagePercentage(research, 'RaidEnemy8Damage'),
//             };
//             return bonuses;
//         } catch (err) {
//             return undefined;
//         }
//     };

//     const readDamagePercentage = (research: NecrobearBonuses, key: keyof NecrobearBonuses) => {
//         const val = research[key];

//         if (Number.isNaN(val)) return 0;

//         const exp = fromExponential(val);

//         if (isNaN(Number(exp))) return 0;

//         return Number(exp) * 100;
//     };

//     const text = parseNecrobearBonus(data);

//     return (
//         <div className="flex w-full max-w-md shrink-0 flex-col gap-4 text-sm">
//             <h3>Necrobear</h3>
//             <p className="text-left">
//                 You have the following Forbidden Research raid bonuses. These are not yet taken into account by TT2 Raid Optimizer.
//             </p>
//             {text && (
//                 <div className="self-center">
//                     <ul className={`${Object.keys(text).length / 2 > 5 ? 'columns-2 sm:columns-3' : 'columns-1'} gap-8`}>
//                         {Object.keys(text).map((key) => {
//                             return (
//                                 <li key={key}>
//                                     <div className="flex justify-between gap-4">
//                                         <span>{key}</span>
//                                         <span>{text[key as keyof ReadableNecrobearBonuses]}%</span>
//                                     </div>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

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
                                <Image src={image} alt={`${name} raid card`} className="h-8 w-8 object-cover" radius="none" />
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

export default function PlayerExport() {
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
    }, [prettyJson, inputData, outputData]);

    const clearText = () => {
        setInputData('');
        setOutputData('');
    };

    return (
        <PageContainer>
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex max-w-md flex-col font-normal">
                    <h3 className="pb-2 text-base">What is Player Export Editor?</h3>
                    <div className="flex max-w-md flex-col gap-2 text-left">
                        <p className="text-sm">
                            This tool provides a temporary fix for making TT2 player export compatible with the
                            <span className="italic">&nbsp;TT2 Raid Optimizer</span> app.
                        </p>
                        <Accordion className="px-0">
                            <AccordionItem key="1" aria-label="Show card changes" title="Show card changes" classNames={{ title: ['text-sm'] }}>
                                <div className="flex max-w-md flex-col gap-4">
                                    <SeasonalCardsInfoSection
                                        title="Changes to card levels in the raid app"
                                        data={cardsMap.old}
                                        isNewSeason={false}
                                    />
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
                                typeof pretty === 'string'
                                    ? setOutputData(JSON.stringify(updateRaidCardNames(pretty, raidKeyMap)))
                                    : setOutputData('');
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
                            onPress={clearText}
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
                                onPress={copyToClipboard}
                                className="w-fit self-center"
                                startContent={<CopyIcon />}
                            >
                                Copy
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
