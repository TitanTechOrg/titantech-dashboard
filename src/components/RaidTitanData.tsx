import { TitanCurseData, TitanSequence } from '@/features/titans';
import { Skeleton } from '@nextui-org/react';
import { TitanPart } from '@/features/attacks';
import { TitanPartTableData } from '.';

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

export function RaidTitanData({ titan, parts, showHealthbars }: RaidTitanDataProps) {
    return (
        <div className="flex flex-col gap-4 flex-wrap">
            <Skeleton className="rounded-md" isLoaded={!!parts && !!titan}>
                {parts && titan && <TitanPartTableData parts={parts} titanData={getTitanCursedParts(titan)} showHealthbars={showHealthbars} />}
            </Skeleton>
        </div>
    );
}
