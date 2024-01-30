import { Image } from '@nextui-org/react';
import { TitanSequence, TitanSequenceParts } from '@/features/titans';
import { percentage } from '@/utils/number-formatter';
import { MappedArmourColour, MappedArmourType, MappedBodyColour, MappedBodyType, TitanPart } from '..';

import OffStratDamage from '@/assets/titanPartTargets/off-strat-damage.webp';
import { usePreferencesStore } from '@/stores/preferences.store';

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

const isDamagedOffstratPart = (
    offstratDamageThreshold: number,
    partArmourName: string,
    partBodyName: string,
    parts: TitanSequenceParts[] | undefined,
    damagedParts: TitanPart[]
) => {
    if (!parts) return false;

    const foundArmourPart = parts.find((part) => part.name === partArmourName);
    const foundBodyPart = parts.find((part) => part.name === partBodyName);

    const isOffstratPart = !foundArmourPart?.target || !foundBodyPart?.target;

    if (!isOffstratPart) return false;

    const foundDamagedArmourPart = damagedParts.find((part) => part.name === partArmourName);
    const foundDamagedBodyPart = damagedParts.find((part) => part.name === partArmourName);

    const hasDamagedOffstratPart = !!foundDamagedArmourPart || !!foundDamagedBodyPart;

    if (!hasDamagedOffstratPart) return false;

    const armourDamage = foundDamagedArmourPart?.value ?? 0;
    const bodyDamage = foundDamagedBodyPart?.value ?? 0;

    const hasOffstratDamageOverThreshold = armourDamage > offstratDamageThreshold || bodyDamage > offstratDamageThreshold;

    return hasOffstratDamageOverThreshold;
};

const getGradientColour = (armourPart: PartAndColour, bodyPart: PartAndColour) => {
    const hasArmourPart = armourPart[0] != null;
    const hasBodyPart = bodyPart[0] != null;

    if (!hasArmourPart && !hasBodyPart) {
        return MappedArmourColour[armourPart[1] as MappedArmourType];
    }

    if (hasArmourPart && hasBodyPart) {
        return `bg-gradient-to-b from-[#D8E0E8] from-40% to-[#097BFC] to-90%`;
    } else if (hasArmourPart) {
        return MappedArmourColour[armourPart[1] as MappedArmourType];
    } else {
        return MappedBodyColour[bodyPart[1] as MappedBodyType];
    }
};

export function QuickView({ data, titan, isCompactView = false }: QuickViewProps) {
    const { offstratDamageThreshold } = usePreferencesStore();

    const totalDamage = data.reduce((prev, curr) => prev + curr.value, 0);

    const classes = isCompactView
        ? `flex flex-col text-center items-center justify-center scale-75 max-h-16`
        : `flex flex-col text-center absolute -top-14 right-16 scale-90`;

    return (
        <div className={`${classes}`}>
            <span>{titan?.name}</span>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`relative h-6 w-6 border-1 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorArmUpperRight', data, totalDamage),
                        getBackgroundKey('BodyArmUpperRight', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorArmUpperRight', 'BodyArmUpperRight', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div
                    className={`relative h-6 w-6 border-1 border-x-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHead', data, totalDamage),
                        getBackgroundKey('BodyHead', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorHead', 'BodyHead', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div
                    className={`relative h-6 w-6 border-1 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorArmUpperLeft', data, totalDamage),
                        getBackgroundKey('BodyArmUpperLeft', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorArmUpperLeft', 'BodyArmUpperLeft', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`relative h-6 w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHandRight', data, totalDamage),
                        getBackgroundKey('BodyHandRight', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorHandRight', 'BodyHandRight', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div
                    className={`relative h-6 w-6 border-1 border-x-0 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorChestUpper', data, totalDamage),
                        getBackgroundKey('BodyChestUpper', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorChestUpper', 'BodyChestUpper', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div
                    className={`relative h-6 w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorHandLeft', data, totalDamage),
                        getBackgroundKey('BodyHandLeft', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorHandLeft', 'BodyHandLeft', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6 ">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
                <div
                    className={`relative h-6 w-6 border-1 border-r-0 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorLegUpperRight', data, totalDamage),
                        getBackgroundKey('BodyLegUpperRight', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorLegUpperRight', 'BodyLegUpperRight', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div
                    className={`relative h-6 w-6 border-1 border-t-0 border-gray-400 ${getGradientColour(
                        getBackgroundKey('ArmorLegUpperLeft', data, totalDamage),
                        getBackgroundKey('BodyLegUpperLeft', data, totalDamage)
                    )}`}
                >
                    {isDamagedOffstratPart(offstratDamageThreshold, 'ArmorLegUpperLeft', 'BodyLegUpperLeft', titan?.parts, data) ? (
                        <div className="h-full min-h-6 w-full min-w-6 sm:min-h-5 sm:min-w-5">
                            <Image
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-1/2 scale-[33%]"
                                src={OffStratDamage}
                                alt="Off-strat damage"
                            />
                        </div>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
            </div>
        </div>
    );
}
