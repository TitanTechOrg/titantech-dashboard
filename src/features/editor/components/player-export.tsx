/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Button, Input, Tooltip } from '@nextui-org/react';
import { CopyIcon } from '@radix-ui/react-icons';
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

export function PlayerExport() {
    const [inputData, setInputData] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const prettyJson = useCallback((data: string) => {
        if (!data) return null;

        try {
            const result = JSON.stringify(JSON.parse(data), null, 2);

            return result;
        } catch (err) {
            /* empty */
        }
    }, []);

    const copyToClipboard = useCallback(async () => {
        const data = prettyJson(inputData);
        if (!data) return;
        try {
            await navigator.clipboard.writeText(JSON.stringify(updateRaidCardNames(data, raidKeyMap)));
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 1000);
        } catch (err) {
            //
        }
    }, [prettyJson, inputData]);

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex max-w-sm flex-col font-normal">
                <h3>What's this tool?</h3>
                <div className="flex max-w-sm flex-col gap-4">
                    <span className="text-xs">
                        This is a temporary fix for making TT2 player export compatible with the{' '}
                        <span className="italic">TT2 Raid Optimizer app</span>
                    </span>
                    <span className="text-xs">
                        If the copied export below is not working, please re-install the <span className="italic">TT2 Raid Optimizer app</span> and
                        try again
                    </span>
                </div>
            </div>
            <div className="s:flex-row flex w-full flex-col items-center gap-4">
                <Input
                    className="max-w-fit"
                    type="text"
                    isClearable={true}
                    label="TT2 Player Export Data"
                    labelPlacement="outside"
                    placeholder="Paste here"
                    value={inputData}
                    onValueChange={setInputData}
                    isInvalid={inputData.length > 0 && prettyJson(inputData) == null}
                />
                <Tooltip
                    aria-label="Copied to clipboard"
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
                        startContent={<CopyIcon />}
                    >
                        Copy
                    </Button>
                </Tooltip>
            </div>
            {/* <div className="flex w-full gap-4">
                {inputData && (
                    <div className="max-h-96 gap-4 text-left">
                        <p>Raw input</p>
                        <pre className="text-default-500">{prettyJson(inputData)}</pre>
                    </div>
                )}
                

                {prettyJson(inputData) && updateRaidCardNames(prettyJson(inputData)!, raidKeyMap) && (
                    <div className="max-h-96 gap-4 text-left">
                        <p>Preview output</p>
                        <pre className="text-default-500">{prettyJson(JSON.stringify(updateRaidCardNames(prettyJson(inputData)!, raidKeyMap)))}</pre>
                    </div>
                )}
            </div> */}
        </div>
    );
}
