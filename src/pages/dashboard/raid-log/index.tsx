import { Accordion, AccordionItem, Image, Spacer } from '@nextui-org/react';
import { ChevronUpIcon } from '@nextui-org/shared-icons';

import '@/App.css';
import { RaidAttack, TitanCurseData, TitanSequence } from './types';
import TitanPartTableInfo from './detail-view';
import { TitanPartMap } from '@/lib/constants';
import { formatter } from '@/lib/utils';
import useTitanStore from '@/stores/titansStore';
import RaidDeck from './RaidDeck';
import React from 'react';

type RaidLogProps = {
    data: RaidAttack[];
};

function getTitanImageUrl(name: string): string {
    return new URL(`../../../assets/titans/${name}.webp`, import.meta.url).href;
}

function getTitanMarkImageUrl(name: string): string {
    return new URL(`../../../assets/titanPartTargets/${name}.webp`, import.meta.url).href;
}

function RaidLog({ data }: RaidLogProps) {
    const titans = useTitanStore((state) => state.titans);

    const getTitan = (titanId: string): TitanSequence | undefined => titans.find(({ id }: TitanSequence) => id === titanId);

    const getTitanName = (titanId: string, isForImage: boolean = true): string => {
        const fallbackName: string = 'Jukk';
        const titanName: string = getTitan(titanId)?.name ?? fallbackName;

        const missingTitanImages = ['Priker', 'Klonk'];

        if (!isForImage) return titanName;

        return missingTitanImages.includes(titanName) ? fallbackName : titanName;
    };

    const getTitanCursedParts = (titanId: string): TitanCurseData | undefined => {
        const titan = getTitan(titanId);

        if (!titan) return undefined;

        const returnData: TitanCurseData = {
            curse_type: titan.curse_type,
            parts: titan.parts,
            id: titan.id,
        };
        return returnData;
    };

    const getTitanMarkParts = (titanId: string, partName: string): 'on' | 'off' => {
        const titan = getTitan(titanId);

        if (!titan) return 'on';

        const partsWithoutBody = titan.parts.filter((part) => part.name.includes('Armor'));
        const isTarget = partsWithoutBody.some((part) => part.name === partName && part.target);

        return isTarget ? 'on' : 'off';
    };

    const getTitanSequence = (titanId: string) => {
        const titan = getTitan(titanId);
        if (!titan || !titans) return 0;

        const titanSequencePosition: number = titan.sequence_index + 1;
        const sequenceText: string = `(${titanSequencePosition}/${titans.length})`;

        return sequenceText;
    };

    return (
        <Accordion selectionMode="multiple">
            {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts, raid_titan_id }: RaidAttack) => {
                return (
                    <AccordionItem
                        key={titan_attack_id}
                        className="[&_span.rotate-0]:data-[open=true]:rotate-180"
                        aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                        indicator={<ChevronUpIcon />}
                        startContent={<RaidDeck id={`${titan_attack_id}${occurred_at}${player_name}`} sources={sources} />}
                        title={<p className="flex flex-row justify-between items-center pl-6">{formatter().format(damage)}</p>}
                        subtitle={
                            <p className="font-bold flex flex-row justify-between items-center pl-6">
                                {player_name}{' '}
                                <span className="font-light text-xs pl-2">
                                    {new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}
                                </span>
                            </p>
                        }
                    >
                        <div className="flex flex-row gap-8 flex-wrap">
                            <div className="w-[12.5rem]">
                                <Image src={getTitanImageUrl(getTitanName(raid_titan_id))} width={200} />
                                <div className="relative">
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Arm Right']))}
                                        width={24}
                                        className="absolute -top-40 left-5"
                                        radius="none"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Hand Right']))}
                                        width={24}
                                        className="absolute bottom-16 left-6"
                                        radius="none"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Head']))}
                                        width={24}
                                        className="absolute -top-40 left-[5.75rem]"
                                        radius="none"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Chest']))}
                                        width={24}
                                        className="absolute bottom-24 left-[5.75rem]"
                                        radius="none"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Leg Right']))}
                                        width={24}
                                        className="absolute -top-10 left-16"
                                        radius="none"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Leg Left']))}
                                        width={24}
                                        className="absolute -top-10 left-28"
                                        radius="none"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Arm Left']))}
                                        width={24}
                                        className="absolute -top-40 left-40"
                                        radius="none"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Hand Left']))}
                                        width={24}
                                        className="absolute bottom-16 left-[9.25rem]"
                                        radius="none"
                                    />
                                </div>
                                <Spacer />
                                <p className="font-semibold text-center">
                                    {getTitanName(raid_titan_id, false)} {getTitanSequence(raid_titan_id)}
                                </p>
                            </div>

                            <TitanPartTableInfo parts={parts} titanData={getTitanCursedParts(raid_titan_id)} />
                        </div>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

export default React.memo(RaidLog);
