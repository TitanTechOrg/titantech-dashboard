import { formatter, percentage } from '@/lib/utils';
import { CurseTypes, TitanCurseData, TitanPart, TitanSequenceParts } from '../pages/dashboard/raid-log/types';
import { TitanPartMap } from '@/lib/constants';
import { Progress, Tooltip } from '@nextui-org/react';

type TitanPartTableDataProps = {
    parts: TitanPart[];
    titanData: TitanCurseData;
};

type RaidTitanPart = keyof typeof TitanPartMap;

type TableRowProps = {
    text: string;
    cursedColor?: string | undefined;
    isOffstratPart?: boolean;
    sequenceParts?: TitanSequenceParts;
};

const getPartDamageText = (part: TitanPart | undefined): string => {
    return part ? formatter().format(part.value) : '--';
};

const findPart = (partName: RaidTitanPart, data: TitanPart[]): TitanPart | undefined => data.find((part) => part.name === TitanPartMap[partName]);

const findCursedPart = (partName: RaidTitanPart, data: TitanSequenceParts[] | undefined): TitanSequenceParts | undefined =>
    data?.find((part) => part.name === TitanPartMap[partName] && part.cursed);

const findSequencePart = (partName: RaidTitanPart, data: TitanSequenceParts[] | undefined): TitanSequenceParts | undefined =>
    data?.find((part) => part.name === TitanPartMap[partName]);

const CurseTypeColorMap = {
    // BodyDamagePerCurse: 'bg-yellow-500/20 border-yellow-500 dark:bg-yellow-500/30 dark:border-body-curse',
    // AfflictedDamagePerCurse: 'bg-purple-500/20 border-purple-500 dark:bg-purple-500/30 dark:border-afflict-curse',
    // BurstDamagePerCurse: 'bg-red-500/20 border-red-500 dark:bg-red-500/30 dark:border-burst-curse',

    BodyDamagePerCurse: {
        target: 'bg-yellow-500/[.2] border-yellow-500 dark:bg-yellow-500/[.3] dark:border-body-curse',
        offStrat: 'bg-yellow-500/[.2] border-yellow-500/[.7] dark:bg-yellow-500/[.2] dark:border-body-curse/[.3]',
    },
    AfflictedDamagePerCurse: {
        target: 'bg-purple-500/[.2] border-purple-500 dark:bg-purple-500/[.3] dark:border-afflict-curse',
        offStrat: 'bg-purple-500/[.2] border-purple-500/[.7] dark:bg-purple-500/[.2] dark:border-afflict-curse/[.3]',
    },
    BurstDamagePerCurse: {
        target: 'bg-red-500/[.2] border-red-500 dark:bg-red-500/[.3] dark:border-burst-curse',
        offStrat: 'bg-red-500/[.2] border-red-500/[.7] dark:bg-red-500/[.2] dark:border-burst-curse/[.3]',
    },
};

const getCurseTypeColor = (part: TitanSequenceParts | undefined, curseType: CurseTypes | undefined): string | undefined => {
    if (!curseType || !part) return undefined;

    if (part.target) return CurseTypeColorMap[curseType].target;

    return CurseTypeColorMap[curseType].offStrat;
};

const offStratColors = 'border-zinc-600/50 bg-zinc-500/20 dark:bg-zinc-500/20';
const defaultArmorColors = 'border-gray-400 bg-gray-400/30 dark:bg-gray-400/40';
const defaultBodyColors = 'border-sky-500 bg-sky-500/20 dark:bg-sky-500/40';
const defaultTextColor = ' text-black dark:text-white';
const overkillTextColor = ' text-red-500';
const offStratTextColor = ' text-zinc-500/80';

const getExtraClasses = (
    partType: 'Armor' | 'Body',
    cursedColor: string | undefined,
    isOffstratPart: boolean | undefined,
    isNegativeNumber: boolean
) => {
    let tailwindClasses = '';

    if (cursedColor) {
        tailwindClasses = tailwindClasses.concat(cursedColor);
    } else if (isOffstratPart) {
        tailwindClasses = tailwindClasses.concat(offStratColors);
    } else {
        tailwindClasses = tailwindClasses.concat(partType === 'Armor' ? defaultArmorColors : defaultBodyColors);
    }

    if (isNegativeNumber) {
        tailwindClasses = tailwindClasses.concat(overkillTextColor);
    } else if (isOffstratPart) {
        tailwindClasses = tailwindClasses.concat(offStratTextColor);
    } else {
        tailwindClasses = tailwindClasses.concat(defaultTextColor);
    }

    return tailwindClasses;
};

function TableRowArmour({ text, cursedColor, isOffstratPart, sequenceParts }: TableRowProps) {
    const isNegativeNumber = Math.sign(parseInt(text, 10)) < 1;
    const tailwindClasses = getExtraClasses('Armor', cursedColor, isOffstratPart, isNegativeNumber);

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`}>
            <div
                className={`${tailwindClasses} w-full col-span-1 row-span-1 border-solid border-3 rounded-md font-semibold subpixel-antialiased min-w-[80px]`}
            >
                {text}
                <Progress
                    aria-label="Titan armor part health..."
                    value={healthPercentage}
                    className="max-w-md px-1 pb-1"
                    size="sm"
                    color={isOffstratPart ? 'default' : 'primary'}
                    isDisabled={isOffstratPart}
                />
            </div>
        </Tooltip>
    );
}

function TableRowBody({ text, isOffstratPart, sequenceParts }: TableRowProps) {
    const isNegativeNumber = Math.sign(parseInt(text, 10)) < 1;
    const tailwindClasses = getExtraClasses('Body', undefined, isOffstratPart, isNegativeNumber);

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`}>
            <div
                className={`${tailwindClasses} w-full col-span-1 row-span-1 border border-3 rounded-md font-semibold subpixel-antialiased min-w-[80px]`}
            >
                {text}
                <Progress
                    aria-label="Titan body part health..."
                    value={healthPercentage}
                    className="max-w-md px-1 pb-1"
                    size="sm"
                    color={isOffstratPart ? 'default' : 'primary'}
                    isDisabled={isOffstratPart}
                />
            </div>
        </Tooltip>
    );
}

const TitanOverlayImages = {
    Jukk: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Jukk-5e17daf5.webp')]",
    Klonk: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Klonk-0b1a8f82.webp')]",
    Lojak: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Lojak-3ff6694b.webp')]",
    Mohaca: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Mohaca-9685de65.webp')]",
    Priker: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Priker-359c25d5.webp')]",
    Sterl: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Sterl-72f3a3ad.webp')]",
    Takedar: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Takedar-6cf45888.webp')]",
    Terro: "before:bg-[url('https://titantech-static.s3.nl-ams.scw.cloud/titans/Terro-74c392e8.webp')]",
} as const;

type TitanOverlayImagesType = keyof typeof TitanOverlayImages;

function TitanPartTableData({ parts, titanData }: TitanPartTableDataProps): JSX.Element {
    const { curse_type, parts: cursedParts, name } = titanData;

    return (
        <div
            className={`${
                TitanOverlayImages[name as TitanOverlayImagesType]
            } text-center w-72 min-w-fit mx-auto relative before:bg-cover before:bg-center before:bg-no-repeat before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:opacity-[15%] before:z-0`}
        >
            <div className="grid gap-x-3 gap-y-1 grid-cols-3">
                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Arm Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Right', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Arm Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Arm Right', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Arm Right', parts))}
                        isOffstratPart={!!!findSequencePart('Body Arm Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Arm Right', cursedParts)}
                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Head', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Head', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Head', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Head', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Head', parts))}
                        isOffstratPart={!!!findSequencePart('Body Head', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Head', cursedParts)}
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Arm Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Left', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Arm Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Arm Left', cursedParts)}
                    />

                    <TableRowBody
                        text={getPartDamageText(findPart('Body Arm Left', parts))}
                        isOffstratPart={!!!findSequencePart('Body Arm Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Arm Left', cursedParts)}
                    />
                </div>
            </div>

            <div className="grid gap-x-3 gap-y-1 my-6 grid-cols-3">
                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Hand Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Right', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Hand Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Hand Right', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Hand Right', parts))}
                        isOffstratPart={!!!findSequencePart('Body Hand Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Hand Right', cursedParts)}
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Chest', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Chest', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Chest', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Chest', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Chest', parts))}
                        isOffstratPart={!!!findSequencePart('Body Chest', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Chest', cursedParts)}
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Hand Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Left', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Hand Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Hand Left', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Hand Left', parts))}
                        isOffstratPart={!!!findSequencePart('Body Hand Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Hand Left', cursedParts)}
                    />
                </div>
            </div>

            <div className="grid gap-x-3 gap-y-1 mx-12 items-center grid-cols-2">
                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Leg Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Right', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Leg Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Leg Right', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Leg Right', parts))}
                        isOffstratPart={!!!findSequencePart('Body Leg Right', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Leg Right', cursedParts)}
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Leg Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Left', cursedParts), curse_type)}
                        isOffstratPart={!!!findSequencePart('Armor Leg Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Armor Leg Left', cursedParts)}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Leg Left', parts))}
                        isOffstratPart={!!!findSequencePart('Body Leg Left', cursedParts)?.target}
                        sequenceParts={findSequencePart('Body Leg Left', cursedParts)}
                    />
                </div>
            </div>
        </div>
    );
}

// export default React.memo(TitanPartTableData);
export default TitanPartTableData;
