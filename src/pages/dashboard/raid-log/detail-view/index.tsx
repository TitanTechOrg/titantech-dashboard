import { formatter } from '@/lib/utils';
import { CurseTypes, TitanCurseData, TitanPart, TitanSequenceParts } from '../types';
import { TitanPartMap } from '@/lib/constants';

type TitanPartTableInfoProps = {
    parts: TitanPart[];
    titanData?: TitanCurseData;
};

type RaidTitanPart = keyof typeof TitanPartMap;

type TableRowProps = {
    text: string;
    cursedColor?: string | undefined;
};

const getPartDamageText = (part: TitanPart | undefined): string => {
    return part ? formatter().format(part.value) : '--';
};

// PARTS ARE FROM THE TITAN'S PERSPECTIVE
const findPart = (partName: RaidTitanPart, data: TitanPart[]): TitanPart | undefined => data.find((part) => part.name === TitanPartMap[partName]);

const findCursedPart = (partName: RaidTitanPart, data: TitanSequenceParts[] | undefined): TitanSequenceParts | undefined =>
    data?.find((part) => part.name === TitanPartMap[partName] && part.cursed);

const CurseTypeColorMap = {
    BodyDamagePerCurse: 'body-curse',
    AfflictedDamagePerCurse: 'afflict-curse',
    BurstDamagePerCurse: 'burst-curse',
};

const getCurseTypeColor = (part: TitanSequenceParts | undefined, curseType: CurseTypes | undefined): string | undefined => {
    if (!curseType || !part) return undefined;

    return CurseTypeColorMap[curseType];
};
function TableRowArmour({ text, cursedColor }: TableRowProps) {
    const borderColor = `${cursedColor ? 'border-' + cursedColor : 'border-gray-400'}`;
    const bgColor = `${cursedColor ? 'bg-' + cursedColor + '/10' : 'bg-gray-400/10'}`;

    return (
        <div
            className={`w-full col-span-1 row-span-1 border-double border-4 ${borderColor} rounded-md ${bgColor} text-black font-semibold subpixel-antialiased min-w-[80px]`}
        >
            {text}
        </div>
    );
}

function TableRowBody({ text }: TableRowProps) {
    return (
        <div className="w-full col-span-1 row-span-1 border border-2 border-sky-500 rounded-md bg-sky-500/20 text-black font-semibold subpixel-antialiased  min-w-[80px]">
            {text}
        </div>
    );
}

// before:bg-center before:bg-no-repeat
function TitanPartTableInfo({ parts, titanData }: TitanPartTableInfoProps): JSX.Element {
    const curse_type = titanData?.curse_type;
    const cursedParts = titanData?.parts;

    return (
        <div className="text-center w-72 min-w-fit">
            <div className="grid gap-x-3 gap-y-1 grid-cols-3">
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Arm Right', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Right', cursedParts), curse_type)}
                />
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Head', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Head', cursedParts), curse_type)}
                />
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Arm Left', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Arm Left', cursedParts), curse_type)}
                />

                <TableRowBody text={getPartDamageText(findPart('Body Arm Right', parts))} />
                <TableRowBody text={getPartDamageText(findPart('Body Head', parts))} />
                <TableRowBody text={getPartDamageText(findPart('Body Arm Left', parts))} />
            </div>

            <div className="grid gap-x-3 gap-y-1 my-6 grid-cols-3">
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Hand Right', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Right', cursedParts), curse_type)}
                />
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Chest', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Chest', cursedParts), curse_type)}
                />
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Hand Left', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Hand Left', cursedParts), curse_type)}
                />

                <TableRowBody text={getPartDamageText(findPart('Body Hand Right', parts))} />
                <TableRowBody text={getPartDamageText(findPart('Body Chest', parts))} />
                <TableRowBody text={getPartDamageText(findPart('Body Hand Left', parts))} />
            </div>

            <div className="grid gap-x-3 gap-y-1 mx-12 items-center grid-cols-2">
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Leg Right', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Right', cursedParts), curse_type)}
                />
                <TableRowArmour
                    text={getPartDamageText(findPart('Armor Leg Left', parts))}
                    cursedColor={getCurseTypeColor(findCursedPart('Armor Leg Left', cursedParts), curse_type)}
                />

                <TableRowBody text={getPartDamageText(findPart('Body Leg Right', parts))} />
                <TableRowBody text={getPartDamageText(findPart('Body Leg Left', parts))} />
            </div>
        </div>
    );
}

export default TitanPartTableInfo;
