import { TitanCurseData, TitanSequence, TitanSequenceParts } from '@/features/titans';
import { Image } from '@nextui-org/react';
import { TitanPart } from '@/features/attacks';
import { RaidTitanPart, TitanPartTableData } from '.';
import SkeletalSmash from '@/assets/cards/SkeletalSmash.webp';
import { TitanPartMap } from '@/constants/titans';

type RaidTitanDataProps = {
    titan?: TitanSequence;
    parts?: TitanPart[];
    showHealthbars?: boolean;
};

const getTitanCursedParts = (titan: TitanSequence): TitanCurseData => {
    const returnData: TitanCurseData = {
        curse_type: titan.curse_type,
        parts: titan.parts,
        id: titan.id,
        name: titan.name,
    };
    return returnData;
};

const findSkeletalSmashTarget = (data: TitanSequenceParts[]) => {
    const foundTarget = data?.find((part) => {
        if (!!part.skeleton_smash_target) return part.name;
    });

    if (!foundTarget) return null;

    function getKeyByValue() {
        return Object.keys(TitanPartMap).find((key) => TitanPartMap[key as RaidTitanPart] === foundTarget?.name);
    }
    let ssTargetPart = getKeyByValue();

    if (!ssTargetPart) return null;

    if (ssTargetPart) {
        ssTargetPart = ssTargetPart.replace(/Armor|Body/g, '').trim();
        ssTargetPart = ssTargetPart.replace(/Arm/g, 'Shoulder').trim();
    }

    return ssTargetPart;
};

export function RaidTitanData({ titan, parts, showHealthbars }: RaidTitanDataProps) {
    const ssTarget = parts && titan ? findSkeletalSmashTarget(getTitanCursedParts(titan).parts) : null;
    return (
        <div className="flex flex-col flex-wrap">
            {parts && titan && <TitanPartTableData parts={parts} titanData={getTitanCursedParts(titan)} showHealthbars={showHealthbars} />}
            {ssTarget && showHealthbars ? (
                <div className="flex flex-row justify-center items-center gap-4 pt-4">
                    <div className="min-w-fit">
                        <Image src={SkeletalSmash} className="rounded flex object-cover h-8 w-8" alt="Skeletal Smash icon" />
                    </div>
                    <span className='"text-sm font-medium'>{ssTarget}</span>
                </div>
            ) : null}
        </div>
    );
}
