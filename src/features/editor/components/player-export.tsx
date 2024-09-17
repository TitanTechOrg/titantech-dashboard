/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Button, Textarea, Tooltip } from '@nextui-org/react';
import { CopyIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import fromExponential from 'from-exponential';
import { useCallback, useState } from 'react';

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
    | 'TriangleSupport';

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
    'Prismatic Rift': 10,
    'Razor Wind': 15,
    'Thriving Plague': 15,
};

const updateRaidCardNames = (inputData: string, keyMap: RaidKeyMapType): string => {
    const raidCardsKey = 'raidCards';
    const equipmentSetsKey = 'equipmentSets';

    try {
        const data = JSON.parse(inputData);

        if (!data || typeof data !== 'object') return '';

        if (raidCardsKey in data) {
            const cards = data[raidCardsKey];

            if (typeof cards !== 'object' || cards == null) return '';

            for (const oldKey in keyMap) {
                if (Object.prototype.hasOwnProperty.call(cards, oldKey)) {
                    cards[keyMap[oldKey]] = cards[oldKey];

                    if (Object.prototype.hasOwnProperty.call(cards[keyMap[oldKey]], 'lv')) {
                        cards[keyMap[oldKey]].level = cards[keyMap[oldKey]].lv;
                        delete cards[keyMap[oldKey]].lv;
                    }
                    if (Object.prototype.hasOwnProperty.call(cards[keyMap[oldKey]], 'num')) {
                        cards[keyMap[oldKey]].cards = cards[keyMap[oldKey]].num;
                        delete cards[keyMap[oldKey]].num;
                    }

                    if (keyMap[oldKey] === 'Insanity Void') {
                        const finalLevel = cards[keyMap[oldKey]].level - oldSeasonalCardBoosts['Insanity Void'];
                        cards[keyMap[oldKey]].level = finalLevel > 0 ? finalLevel : 0;
                    }
                    if (keyMap[oldKey] === 'Amplify') {
                        const finalLevel = cards[keyMap[oldKey]].level - oldSeasonalCardBoosts['Amplify'];
                        cards[keyMap[oldKey]].level = finalLevel > 0 ? finalLevel : 0;
                    }
                    if (keyMap[oldKey] === 'Radiant Kaleidoscope') {
                        const finalLevel = cards[keyMap[oldKey]].level - oldSeasonalCardBoosts['Radiant Kaleidoscope'];
                        cards[keyMap[oldKey]].level = finalLevel > 0 ? finalLevel : 0;
                    }

                    if (keyMap[oldKey] === 'Prismatic Rift') {
                        const finalLevel = cards[keyMap[oldKey]].level + newSeasonalCardBoosts['Prismatic Rift'];
                        cards[keyMap[oldKey]].level = finalLevel > 100 ? 100 : finalLevel;
                    }
                    if (keyMap[oldKey] === 'Razor Wind') {
                        const finalLevel = cards[keyMap[oldKey]].level + newSeasonalCardBoosts['Razor Wind'];
                        cards[keyMap[oldKey]].level = finalLevel > 100 ? 100 : finalLevel;
                    }
                    if (keyMap[oldKey] === 'Thriving Plague') {
                        const finalLevel: number = cards[keyMap[oldKey]].level + newSeasonalCardBoosts['Thriving Plague'];
                        cards[keyMap[oldKey]].level = finalLevel > 100 ? 100 : finalLevel;
                    }

                    if (oldKey !== keyMap[oldKey]) delete cards[oldKey];
                }
            }

            const equipments = data[equipmentSetsKey];

            if (typeof equipments !== 'object' || equipments == null) return '';

            data[equipmentSetsKey] = data[equipmentSetsKey].map((item: string) => equipmentReplacements[item] || item);

            return data;
        }
    } catch (err) {
        /* empty */
        return '';
    }

    return '';
};

type NecrobearBonuses = {
    Head: string;
    Torso: string;
    Limb: string;
    Armour: string;
    Body: string;
    RaidEnemy1Damage: string;
    RaidEnemy2Damage: string;
    RaidEnemy3Damage: string;
    RaidEnemy4Damage: string;
    RaidEnemy5Damage: string;
    RaidEnemy6Damage: string;
    RaidEnemy7Damage: string;
    RaidEnemy8Damage: string;
};

export function PlayerExport() {
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [necrobearBonus, setNecrobearBonus] = useState<NecrobearBonuses>(undefined);

    const prettyJson = useCallback((data: string) => {
        if (!data) return null;

        try {
            return JSON.stringify(JSON.parse(data), null, 2);
        } catch (err) {
            /* empty */
        }
    }, []);

    const parseNecrobearBonus = (data: string) => {
        if (!Object.prototype.hasOwnProperty.call(data, 'research')) return;

        const bonuses: NecrobearBonuses = {
            Head: fromExponential(data['research'].HeadDamage || 0) * 100 ?? 0,
            Torso: fromExponential(data['research'].ChestDamage || 0) * 100 ?? 0,
            Limb: fromExponential(data['research'].LimbDamage || 0) * 100 ?? 0,
            Armour: fromExponential(data['research'].ArmorDamage || 0) * 100 ?? 0,
            Body: fromExponential(data['research'].BodyDamage || 0) * 100 ?? 0,
            Lojak: fromExponential(data['research'].RaidEnemy1Damage || 0) * 100 ?? 0,
            Takedar: fromExponential(data['research'].RaidEnemy2Damage || 0) * 100 ?? 0,
            Jukk: fromExponential(data['research'].RaidEnemy3Damage || 0) * 100 ?? 0,
            Sterl: fromExponential(data['research'].RaidEnemy4Damage || 0) * 100 ?? 0,
            Mohaca: fromExponential(data['research'].RaidEnemy5Damage || 0) * 100 ?? 0,
            Terro: fromExponential(data['research'].RaidEnemy6Damage || 0) * 100 ?? 0,
            Klonk: fromExponential(data['research'].RaidEnemy7Damage || 0) * 100 ?? 0,
            Priker: fromExponential(data['research'].RaidEnemy8Damage || 0) * 100 ?? 0,
        };
        setNecrobearBonus(bonuses);
    };

    const copyToClipboard = useCallback(async () => {
        const data = prettyJson(inputData);
        if (!data) {
            setNecrobearBonus(undefined);
            return;
        }
        try {
            await navigator.clipboard.writeText(JSON.stringify(updateRaidCardNames(data, raidKeyMap)));
            parseNecrobearBonus(JSON.parse(data));

            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 1000);
        } catch (err) {
            //
        }
    }, [prettyJson, inputData]);

    const clearText = () => {
        setInputData('');
        setOutputData('');
        setNecrobearBonus(undefined);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <div className="flex max-w-sm flex-col font-normal">
                <h3 className="pb-4 text-base">What is this tool?</h3>
                <div className="flex max-w-sm flex-col gap-2 text-left">
                    <p className="text-sm">
                        This is a temporary fix for making TT2 player export compatible with the
                        <span className="italic">&nbsp;TT2 Raid Optimizer app</span>
                    </p>
                    <p className="text-sm">
                        If the copied export below is not working, please re-install the <span className="italic">TT2 Raid Optimizer app</span> and
                        try again
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-8 sm:flex-row sm:items-start">
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
                            if (pretty) {
                                setOutputData(pretty);
                            } else {
                                setOutputData('');
                                setNecrobearBonus(undefined);
                            }
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
            {necrobearBonus && (
                <div className="flex w-full max-w-sm flex-shrink-0 flex-col gap-4 text-sm">
                    <h3>Necrobear</h3>
                    <p>You have the following Forbidden Research raid bonuses. These are not yet taken into account by TT2 Raid Optimizer.</p>
                    <div className="max-w-40 self-center">
                        {Object.keys(necrobearBonus).map((key) => {
                            return (
                                <div key={key} className="flex justify-between gap-12">
                                    <span>{key}</span>
                                    <span>{necrobearBonus[key]}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
