import { TitanPartMap, TitanPartMapPlayerPerspective } from '@/constants/titans';
import { TitanPart } from '@/features/attacks/types';
import { CurseTypes, TitanCurseData, TitanSequenceParts } from '@/features/titans';
import { formatter, percentage } from '@/utils';
import { Progress, Tooltip } from '@nextui-org/react';
import { useMediaQueries } from '@react-hook/media-query';

type CurseColors = 'warning' | 'secondary' | 'default' | 'primary' | 'success' | 'danger' | undefined;

type TitanPartTableDataProps = {
    damagedParts: TitanPart[];
    titanData: TitanCurseData;
    showHealthbars?: boolean;
};

export type RaidTitanPart = keyof typeof TitanPartMap;
export type RaidTitanPartPlayerPerspective = keyof typeof TitanPartMapPlayerPerspective;

type TableRowProps = {
    value: number;
    cursedColor?: CurseColors;
    sequenceParts?: TitanSequenceParts;
    isOffstratPart?: boolean;
    showHealthbars?: boolean;
};

const findPart = (partName: RaidTitanPart, data: TitanPart[]): TitanPart | undefined => data.find((part) => part.name === TitanPartMap[partName]);

const findSequencePart = (partName: RaidTitanPart, data: TitanSequenceParts[] | undefined): TitanSequenceParts | undefined =>
    data?.find((part) => part.name === TitanPartMap[partName]);

const CurseTypeColorMap = {
    BodyDamagePerCurse: 'warning',
    AfflictedDamagePerCurse: 'secondary',
    BurstDamagePerCurse: 'danger',
} as const;

const getCurseTypeColor = (part: TitanSequenceParts | undefined, curseType: CurseTypes | undefined): CurseColors => {
    if (!curseType || !part) return undefined;

    return CurseTypeColorMap[curseType] as CurseColors;
};

const overkillTextColor = ' text-red-500/80 dark:text-red-500/80';

function TableRowArmour({ value, cursedColor, sequenceParts, isOffstratPart, showHealthbars }: TableRowProps) {
    const isNegativeNumber = value < 0;
    const isOverThreshold = (val: number, threshold: number) => {
        return Math.abs(val) > threshold;
    };

    const threshold: number = 1_000_000;

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    let textColour = isNegativeNumber ? overkillTextColor : 'text-black/80 dark:text-white/80';

    if (isOffstratPart) {
        textColour = 'text-default-600/80';
    }

    let bgColour = 'bg-gray-300/30';

    if (cursedColor) {
        switch (cursedColor) {
            case 'danger':
                bgColour = 'bg-red-500/30';
                break;
            case 'secondary':
                bgColour = 'bg-purple-500/30';
                break;
            case 'warning':
                bgColour = 'bg-yellow-300/40';
                break;
            default:
                bgColour = 'bg-gray-300/30';
                break;
        }
    }

    const displayText = isNegativeNumber ? (isOverThreshold(value, threshold) ? getPartDamageText(value) : '--') : getPartDamageText(value);

    if (displayText === '--') {
        textColour = 'text-default-600/80';
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`} isDisabled={healthPercentage === 0}>
            <div
                className={`${bgColour} ${textColour} col-span-1 row-span-1 min-h-8 w-full min-w-[80px] rounded-t font-semibold subpixel-antialiased`}
            >
                {displayText}
                {showHealthbars && displayText && (
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

function TableRowBody({ value, sequenceParts, isOffstratPart, showHealthbars }: TableRowProps) {
    const isNegativeNumber = value < 0;
    const isOverThreshold = (val: number, threshold: number) => {
        return Math.abs(val) > threshold;
    };

    const threshold = 250_000;

    let healthPercentage: number = 0;

    if (sequenceParts) {
        healthPercentage = percentage(sequenceParts.health, sequenceParts.current_health);
    }

    let textColour = isNegativeNumber ? overkillTextColor : 'text-black/80 dark:text-white/80';

    if (isOffstratPart) {
        textColour = 'text-default-600/80';
    }

    const displayText = isNegativeNumber ? (isOverThreshold(value, threshold) ? getPartDamageText(value) : '--') : getPartDamageText(value);

    if (displayText === '--') {
        textColour = 'text-default-600/80';
    }

    return (
        <Tooltip showArrow={true} content={`${healthPercentage}%`} isDisabled={healthPercentage === 0}>
            <div
                className={`${textColour} col-span-1 row-span-1 min-h-8 w-full min-w-[80px] rounded-b bg-primary/40 font-semibold subpixel-antialiased dark:bg-blue-600/40`}
            >
                {displayText}
                {showHealthbars && displayText && (
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

type TitanPartCellDataType = {
    partNames: RaidTitanPart[];
    showHealthbars: boolean | undefined;
    parts: TitanSequenceParts[];
    damagedPartsValue: (number | undefined)[];
    curse_type: CurseTypes;
};

const getPartDamageText = (val: number | undefined): string => {
    return val ? formatter().format(val) : '--';
};

function TitanPartCellData({ partNames, showHealthbars, parts, damagedPartsValue, curse_type }: TitanPartCellDataType) {
    const [armour, body] = partNames;
    const [armourDamageValue, bodyDamageValue] = damagedPartsValue;

    const armourPart = findSequencePart(armour, parts);
    const bodyPart = findSequencePart(body, parts);

    const isTargetPart = !!armourPart?.target || !!bodyPart?.target;

    let armourValue = 0;
    let bodyValue = 0;

    if (showHealthbars) {
        armourValue = armourPart?.current_health ?? 0;
        bodyValue = bodyPart?.current_health ?? 0;
    } else {
        armourValue = armourDamageValue ?? 0;
        bodyValue = bodyDamageValue ?? 0;
    }

    const isSkeletalSmashTarget = !!armourPart?.skeleton_smash_target || !!bodyPart?.skeleton_smash_target;
    let borders = isTargetPart ? 'border-green-500 border-solid' : 'border-red-400 border-solid';

    if (isSkeletalSmashTarget) {
        borders += ' border-dashed';
    }

    return (
        <div className={`relative flex min-w-fit flex-col gap-y-2 rounded-lg border-4 ${borders}`}>
            <div
                className={`${showHealthbars ? '' : 'hidden'} absolute left-0 top-[34px] z-10 w-[100%] rotate-[-45deg] rounded border-2 ${
                    isTargetPart ? 'hidden' : 'border-red-500/50'
                }`}
            />

            <div
                className={`${showHealthbars ? '' : 'hidden'} absolute left-0 top-[34px] z-10 w-[100%] rotate-[45deg] rounded border-2 ${
                    isTargetPart ? 'hidden' : 'border-red-500/50'
                }`}
            />

            <TableRowArmour
                value={armourValue}
                sequenceParts={armourPart}
                isOffstratPart={!!armourPart?.target == false}
                showHealthbars={showHealthbars}
                cursedColor={armourPart?.cursed ? getCurseTypeColor(armourPart, curse_type) : undefined}
            />
            <TableRowBody value={bodyValue} sequenceParts={bodyPart} isOffstratPart={!!bodyPart?.target == false} showHealthbars={showHealthbars} />
        </div>
    );
}

export function TitanPartTableData({ damagedParts, titanData, showHealthbars }: TitanPartTableDataProps): JSX.Element {
    const { curse_type, parts: cursedParts, name } = titanData;
    const { matches } = useMediaQueries({
        screen: 'screen',
        width: '(max-width: 340px)',
    });

    const isTinyScreen = matches.width;
    const tinyScreenScale = isTinyScreen && !showHealthbars ? 'scale-75' : 'scale-90';
    const colGap = isTinyScreen && !showHealthbars ? 'gap-x-8' : 'gap-x-3';

    return (
        <div
            className={`${
                TitanOverlayImages[name as TitanOverlayImagesType]
            } ${tinyScreenScale} md:scale:100 relative w-fit min-w-fit text-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-0 before:bg-contain before:bg-center before:bg-no-repeat before:opacity-[40%] sm:scale-100 lg:scale-90 xl:scale-100`}
        >
            <div className={`grid ${colGap} grid-cols-3 gap-y-1 sm:gap-x-3`}>
                <TitanPartCellData
                    partNames={['Armor Arm Right', 'Body Arm Right']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Arm Right', damagedParts)?.value, findPart('Body Arm Right', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
                <TitanPartCellData
                    partNames={['Armor Head', 'Body Head']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Head', damagedParts)?.value, findPart('Body Head', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
                <TitanPartCellData
                    partNames={['Armor Arm Left', 'Body Arm Left']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Arm Left', damagedParts)?.value, findPart('Body Arm Left', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
            </div>

            <div className={`grid ${colGap} my-2 grid-cols-3 gap-y-1 sm:gap-x-3`}>
                <TitanPartCellData
                    partNames={['Armor Hand Right', 'Body Hand Right']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Hand Right', damagedParts)?.value, findPart('Body Hand Right', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
                <TitanPartCellData
                    partNames={['Armor Chest', 'Body Chest']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Chest', damagedParts)?.value, findPart('Body Chest', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
                <TitanPartCellData
                    partNames={['Armor Hand Left', 'Body Hand Left']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Hand Left', damagedParts)?.value, findPart('Body Hand Left', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
            </div>

            <div className={`grid ${colGap} mx-11 grid-cols-2 items-center gap-y-1 sm:gap-x-3`}>
                <TitanPartCellData
                    partNames={['Armor Leg Right', 'Body Leg Right']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Leg Right', damagedParts)?.value, findPart('Body Leg Right', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
                <TitanPartCellData
                    partNames={['Armor Leg Left', 'Body Leg Left']}
                    parts={cursedParts}
                    damagedPartsValue={[findPart('Armor Leg Left', damagedParts)?.value, findPart('Body Leg Left', damagedParts)?.value]}
                    curse_type={curse_type}
                    showHealthbars={showHealthbars}
                />
            </div>
        </div>
    );
}
