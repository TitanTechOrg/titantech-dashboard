import { formatter, percentage } from '@/utils/number-formatter';
import { TitanPartMap } from '@/constants/titans';
import { Progress, Tooltip } from '@nextui-org/react';
import { TitanPart } from '@/features/attacks/types';
import { CurseTypes, TitanCurseData, TitanSequenceParts } from '@/features/titans';
import { useMediaQueries } from '@react-hook/media-query';

type CurseColors = 'warning' | 'secondary' | 'default' | 'primary' | 'success' | 'danger' | undefined;

type TitanPartTableDataProps = {
    parts: TitanPart[];
    titanData: TitanCurseData;
    showHealthbars?: boolean;
};

export type RaidTitanPart = keyof typeof TitanPartMap;

type TableRowProps = {
    text: string;
    cursedColor?: CurseColors;
    sequenceParts?: TitanSequenceParts;
    isOffstratPart?: boolean;
    showHealthbars?: boolean;
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
    BodyDamagePerCurse: 'warning',
    AfflictedDamagePerCurse: 'secondary',
    BurstDamagePerCurse: 'error',
} as const;

const getCurseTypeColor = (part: TitanSequenceParts | undefined, curseType: CurseTypes | undefined): CurseColors => {
    if (!curseType || !part) return undefined;

    return CurseTypeColorMap[curseType] as CurseColors;
};

const overkillTextColor = ' text-red-500 dark:text-red-600';

function TableRowArmour({ text, cursedColor, sequenceParts, isOffstratPart, showHealthbars }: TableRowProps) {
    const isNegativeNumber = Math.sign(parseInt(text, 10)) < 1;

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    let textColour = isNegativeNumber ? overkillTextColor : 'text-inherit';

    if (isOffstratPart) {
        textColour = 'text-default-600/30';
    }

    let bgColour = `bg-neutral-500/40 dark:bg-gray-200/50`;

    if (cursedColor) {
        switch (cursedColor) {
            case 'danger':
                bgColour = 'bg-red-500/50';
                break;
            case 'secondary':
                bgColour = 'bg-purple-500/30';
                break;
            case 'warning':
                bgColour = 'bg-yellow-300/50';
                break;
            default:
                bgColour = 'bg-neutral-500/50';
                break;
        }
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`} isDisabled={healthPercentage === 0}>
            <div className={`${bgColour} ${textColour} w-full col-span-1 row-span-1 rounded-t font-semibold subpixel-antialiased min-w-[80px]`}>
                {text}
                {showHealthbars && (
                    <Progress
                        aria-label="Titan armor part health..."
                        value={healthPercentage}
                        className="max-w-md px-1 pb-1"
                        size="sm"
                        color={cursedColor || 'default'}
                    />
                )}
            </div>
        </Tooltip>
    );
}

function TableRowBody({ text, sequenceParts, isOffstratPart, showHealthbars }: TableRowProps) {
    const isNegativeNumber = Math.sign(parseInt(text, 10)) < 1;

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    let textColour = isNegativeNumber ? overkillTextColor : 'text-inherit';

    if (isOffstratPart) {
        textColour = 'text-default-600/30';
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`} isDisabled={healthPercentage === 0}>
            <div
                className={`${textColour} bg-primary/40 dark:bg-blue-600/40 w-full col-span-1 row-span-1 rounded-b font-semibold subpixel-antialiased min-w-[80px]`}
            >
                {text}
                {showHealthbars && (
                    <Progress
                        aria-label="Titan body part health..."
                        value={healthPercentage}
                        className="max-w-md px-1 pb-1"
                        size="sm"
                        color={'primary'}
                    />
                )}
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

export function TitanPartTableData({ parts, titanData, showHealthbars }: TitanPartTableDataProps): JSX.Element {
    const { curse_type, parts: cursedParts, name } = titanData;
    const { matches } = useMediaQueries({
        screen: 'screen',
        width: '(max-width: 340px)',
    });

    const isTinyScreen = matches.width;
    let tinyScreenScale = isTinyScreen && !showHealthbars ? 'scale-75' : 'scale-90';

    let colGap = 'gap-x-3';
    if (isTinyScreen && !showHealthbars) colGap = 'gap-x-8';

    return (
        <div
            className={`${
                TitanOverlayImages[name as TitanOverlayImagesType]
            } ${tinyScreenScale} sm:scale-100 text-center w-fit min-w-fit relative before:bg-contain before:bg-center before:bg-no-repeat before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:opacity-[15%] before:z-0`}
        >
            <div className={`grid ${colGap} sm:gap-x-3 gap-y-1 grid-cols-3`}>
                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Arm Right', cursedParts)?.target ? 'border-green-500' : 'border-red-400'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Arm Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Arm Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Arm Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Right', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Arm Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Arm Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Arm Right', parts))}
                        sequenceParts={findSequencePart('Body Arm Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Arm Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>
                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Head', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Head', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Head', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Head', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Head', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Head', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Head', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Head', parts))}
                        sequenceParts={findSequencePart('Body Head', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Head', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>

                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Arm Left', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Arm Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Arm Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Arm Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Left', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Arm Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Arm Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />

                    <TableRowBody
                        text={getPartDamageText(findPart('Body Arm Left', parts))}
                        sequenceParts={findSequencePart('Body Arm Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Arm Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>
            </div>

            <div className={`grid ${colGap} sm:gap-x-3 gap-y-1 my-2 grid-cols-3`}>
                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Hand Right', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Hand Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Hand Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Hand Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Right', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Hand Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Hand Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Hand Right', parts))}
                        sequenceParts={findSequencePart('Body Hand Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Hand Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>

                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Chest', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Chest', cursedParts)?.target ? 'hidden' : 'border-red-500'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Chest', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Chest', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Chest', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Chest', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Chest', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Chest', parts))}
                        sequenceParts={findSequencePart('Body Chest', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Chest', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>

                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Hand Left', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Hand Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Hand Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Hand Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Left', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Hand Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Hand Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Hand Left', parts))}
                        sequenceParts={findSequencePart('Body Hand Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Hand Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>
            </div>

            <div className={`grid ${colGap} sm:gap-x-3 gap-y-1 mx-11 items-center grid-cols-2`}>
                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Leg Right', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Leg Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Leg Right', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Leg Right', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Right', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Leg Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Leg Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Leg Right', parts))}
                        sequenceParts={findSequencePart('Body Leg Right', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Leg Right', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>

                <div
                    className={`flex flex-col gap-y-2 border-4 rounded-lg relative min-w-fit ${
                        !!findSequencePart('Armor Leg Left', cursedParts)?.target ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[-42deg] z-10 rounded ${
                            !!findSequencePart('Armor Leg Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>

                    <div
                        className={`${showHealthbars ? '' : 'hidden'} absolute top-[34px] left-0 border-2 w-[100%] rotate-[42deg] z-10 rounded ${
                            !!findSequencePart('Armor Leg Left', cursedParts)?.target ? 'hidden' : 'border-red-500/50'
                        }`}
                    ></div>
                    <TableRowArmour
                        text={getPartDamageText(findPart('Armor Leg Left', parts))}
                        cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Left', cursedParts), curse_type)}
                        sequenceParts={findSequencePart('Armor Leg Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Armor Leg Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                    <TableRowBody
                        text={getPartDamageText(findPart('Body Leg Left', parts))}
                        sequenceParts={findSequencePart('Body Leg Left', cursedParts)}
                        isOffstratPart={!!!findSequencePart('Body Leg Left', cursedParts)?.target}
                        showHealthbars={showHealthbars}
                    />
                </div>
            </div>
        </div>
    );
}
