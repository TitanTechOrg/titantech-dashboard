import { TitanSequence } from '@/features/titans';
import { MappedArmourColour, MappedArmourType, MappedBodyColour, MappedBodyType, TitanPart } from '..';
import { percentage } from '@/utils/number-formatter';

type QuickViewProps = {
    data: TitanPart[];
    titan: TitanSequence | undefined;
    isCompactView?: boolean;
};

type PartAndColour = [TitanPart | undefined, string];

const getBackgroundKey = (findPartOnName: string, parts: TitanPart[], totalDamage: number): PartAndColour => {
    const foundPart = parts.find((part) => part.name === findPartOnName);

    let key: MappedArmourType = '-1';

    if (!foundPart) return [foundPart, key];
    const decimals = 9;
    const percent = percentage(totalDamage, foundPart.value, decimals);
    const isBetweenZeroAndOnePercent = percent > 0 && percent < 1;

    if (isBetweenZeroAndOnePercent) {
        key = '0';
    } else {
        key = Math.round(percent).toString() as MappedArmourType;
    }

    return [foundPart, key];
};

const getGradientColour = (armourPart: PartAndColour, bodyPart: PartAndColour) => {
    const hasArmourPart = armourPart[0] != null;
    const hasBodyPart = bodyPart[0] != null;

    if (!hasArmourPart && !hasBodyPart) {
        return MappedArmourColour[armourPart[1] as MappedArmourType];
    }

    if (hasArmourPart && hasBodyPart) {
        return `bg-gradient-to-b from-slate-300 from-40% to-blue-400 to-90%`;
    } else if (hasArmourPart) {
        return MappedArmourColour[armourPart[1] as MappedArmourType];
    } else {
        return MappedBodyColour[bodyPart[1] as MappedBodyType];
    }
};

export function QuickView({ data, titan, isCompactView = false }: QuickViewProps) {
    const totalDamage = data.reduce((prev, curr) => prev + curr.value, 0);

    const classes = isCompactView
        ? `flex flex-col text-center items-center justify-center scale-75 max-h-16`
        : `flex flex-col text-center absolute -top-12 right-16`;

    return (
        <div className={`${classes}`}>
            <span>{titan?.name}</span>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`min-w-6 border-1 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorArmUpperRight', data, totalDamage),
                        getBackgroundKey('BodyArmUpperRight', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`min-w-6 border-1 border-x-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHead', data, totalDamage),
                        getBackgroundKey('BodyHead', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`min-w-6 border-1 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorArmUpperLeft', data, totalDamage),
                        getBackgroundKey('BodyArmUpperLeft', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`min-w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHandRight', data, totalDamage),
                        getBackgroundKey('BodyHandRight', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`min-w-6 border-1 border-x-0 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorChestUpper', data, totalDamage),
                        getBackgroundKey('BodyChestUpper', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`min-w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHandLeft', data, totalDamage),
                        getBackgroundKey('BodyHandLeft', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`min-w-6 border-1 border-r-0 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorLegUpperRight', data, totalDamage),
                        getBackgroundKey('BodyLegUpperRight', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
                <div
                    className={`min-w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorLegUpperLeft', data, totalDamage),
                        getBackgroundKey('BodyLegUpperLeft', data, totalDamage)
                    )}`}
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
}
