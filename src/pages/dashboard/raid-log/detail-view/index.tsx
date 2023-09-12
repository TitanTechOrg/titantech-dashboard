import { formatter } from '@/lib/utils';
import { TitanPart } from '../types';
import { TitanPartMap } from '@/lib/constants';

type TitanPartTableInfoProps = {
    data: TitanPart[];
};

type RaidTitanPart = keyof typeof TitanPartMap;
// const findTitanPart = (name: string) =>
//     Object.keys(TitanPartMap).find((v: string) => TitanPartMap[v as RaidTitanPart] === name) ?? TitanPartMap['Unknown'];

const getPartDamageText = (part: TitanPart | undefined): string => {
    return part ? formatter().format(part.value) : '--';
};

// PARTS ARE FROM THE TITAN'S PERSPECTIVE
const findPart = (partName: RaidTitanPart, data: TitanPart[]): TitanPart | undefined => data.find((part) => part.name === TitanPartMap[partName]);

type TableRowProps = {
    text: string;
};

const TableRowArmour = ({ text }: TableRowProps) => (
    <div className="w-full col-span-1 row-span-1 border-double border-4 border-gray-400 rounded-md">{text}</div>
);

const TableRowBody = ({ text }: TableRowProps) => (
    <div className="w-full col-span-1 row-span-1 border border-2 border-sky-500 rounded-md">{text}</div>
);

function TitanPartTableInfo({ data }: TitanPartTableInfoProps): JSX.Element {
    return (
        <div className="flex-initial ml-4 w-64">
            <div className="grid gap-x-4 gap-y-0.5 grid-cols-3">
                <TableRowArmour text={getPartDamageText(findPart('Armor Arm Right', data))} />
                <TableRowArmour text={getPartDamageText(findPart('Armor Head', data))} />
                <TableRowArmour text={getPartDamageText(findPart('Armor Arm Left', data))} />

                <TableRowBody text={getPartDamageText(findPart('Body Arm Right', data))} />
                <TableRowBody text={getPartDamageText(findPart('Body Head', data))} />
                <TableRowBody text={getPartDamageText(findPart('Body Arm Left', data))} />
            </div>

            <div className="grid gap-x-4 gap-y-0.5 my-4 grid-cols-3">
                <TableRowArmour text={getPartDamageText(findPart('Armor Hand Right', data))} />
                <TableRowArmour text={getPartDamageText(findPart('Armor Chest', data))} />
                <TableRowArmour text={getPartDamageText(findPart('Armor Hand Left', data))} />

                <TableRowBody text={getPartDamageText(findPart('Body Hand Right', data))} />
                <TableRowBody text={getPartDamageText(findPart('Body Chest', data))} />
                <TableRowBody text={getPartDamageText(findPart('Body Hand Left', data))} />
            </div>

            <div className="grid gap-x-4 gap-y-0.5 mx-12 items-center grid-cols-2">
                <TableRowArmour text={getPartDamageText(findPart('Armor Leg Right', data))} />
                <TableRowArmour text={getPartDamageText(findPart('Armor Leg Left', data))} />

                <TableRowBody text={getPartDamageText(findPart('Body Leg Right', data))} />
                <TableRowBody text={getPartDamageText(findPart('Body Leg Left', data))} />
            </div>
        </div>
    );
}

export default TitanPartTableInfo;
