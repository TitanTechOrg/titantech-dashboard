import { TitanCurseData, TitanSequence, TitanSequenceParts } from '@/features/titans';
import { Image } from '@nextui-org/react';
import { TitanPart } from '@/features/attacks';
import { RaidTitanPartPlayerPerspective, TitanPartTableData } from '.';
import SkeletalSmash from '@/assets/cards/SkeletalSmash.webp';
import { TitanPartMapPlayerPerspective } from '@/constants/titans';

type RaidTitanDataProps = {
    titan?: TitanSequence;
    damagedParts?: TitanPart[];
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

    let ssTargetPart = Object.keys(TitanPartMapPlayerPerspective).find(
        (key) => TitanPartMapPlayerPerspective[key as RaidTitanPartPlayerPerspective] === foundTarget.name
    );

    if (!ssTargetPart) return null;

    ssTargetPart = ssTargetPart.replace(/Armor|Body/g, '').trim();

    return ssTargetPart;
};

type SkeletalSmashCardProps = {
    text: string;
};

function SkeletalSmashCard({ text }: SkeletalSmashCardProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-2 mt-4 p-2 bg-default rounded-lg max-w-fit mx-auto">
            <div className="min-w-fit">
                <Image src={SkeletalSmash} className="rounded flex object-cover h-8 w-8" alt="Skeletal Smash icon" />
            </div>
            <span className='"text-sm font-medium'>{text}</span>
        </div>
    );
}

export function RaidTitanData({ titan, damagedParts, showHealthbars }: RaidTitanDataProps) {
    const ssTarget = titan ? findSkeletalSmashTarget(getTitanCursedParts(titan).parts) : null;
    return (
        <div className="flex flex-col flex-wrap">
            {titan && <TitanPartTableData damagedParts={damagedParts ?? []} titanData={getTitanCursedParts(titan)} showHealthbars={showHealthbars} />}

            {ssTarget && showHealthbars ? <SkeletalSmashCard text={ssTarget} /> : null}
        </div>
    );
}
