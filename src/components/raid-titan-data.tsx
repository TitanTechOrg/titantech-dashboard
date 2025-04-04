import SkeletalSmash from '@/assets/cards/SkeletalSmash.webp';
import { TitanPartMapPlayerPerspective } from '@/constants/titans';
import { TitanPart } from '@/features/attacks';
import { TitanCurseData, TitanSequence, TitanSequenceParts } from '@/features/titans';
import { Image } from "@heroui/react";
import { RaidTitanPartPlayerPerspective, TitanPartTableData } from '.';

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
        if (part.skeleton_smash_target) return part.name;
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
        <div className="mx-auto mt-4 flex max-w-fit flex-row items-center justify-center gap-2 rounded-lg bg-default p-2">
            <div className="min-w-fit">
                <Image src={SkeletalSmash} className="flex h-8 w-8 rounded-sm object-cover" alt="Skeletal Smash icon" />
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
