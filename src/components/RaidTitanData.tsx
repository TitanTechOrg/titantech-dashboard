import { TitanCurseData, TitanPart, TitanSequence } from '@/pages/dashboard/raid-log/types';
import TitanPartTableData from './TitanPartsTableData';
import { Skeleton } from '@nextui-org/react';

type RaidTitanDataProps = {
    titan?: TitanSequence;
    parts?: TitanPart[];
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

export default function RaidTitanData({ titan, parts }: RaidTitanDataProps) {
    return (
        <div className="flex flex-col gap-4 flex-wrap">
            <Skeleton className="rounded-lg" isLoaded={!!titan}>
                <h2 className="font-medium text-lg text-center">{titan?.name}</h2>
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!!parts}>
                {parts && titan && <TitanPartTableData parts={parts} titanData={getTitanCursedParts(titan)} />}
            </Skeleton>
        </div>
    );
}
