import { Accordion, AccordionItem, Image } from '@nextui-org/react';
import { ChevronUpIcon } from '@nextui-org/shared-icons';

import '@/App.css';
import { RaidAttack, RaidCardType, TitanCurseData, TitanSequence } from './types';
import TitanPartTableInfo from './detail-view';
import { RaidCardMap, TitanPartMap } from '@/lib/constants';
import { formatter } from '@/lib/utils';
import useTitanStore from '@/stores/titansStore';

type RaidLogProps = {
    data: RaidAttack[];
};

const excludeTapDamageCard = ({ name }: RaidCardType): boolean => name !== 'TapDamage';

type RaidMapKey = keyof typeof RaidCardMap;

const findCard = (name: string): string =>
    Object.keys(RaidCardMap).find((v: string) => RaidCardMap[v as RaidMapKey].name === name) ?? RaidCardMap.Wildcard.name;

const findCardType = (name: string) => RaidCardMap[findCard(name) as RaidMapKey].type;

function getCardImageUrl(name: string): string {
    return new URL(`../../../assets/cards/${findCard(name)}.webp`, import.meta.url).href;
}

function getCardTypeImageUrl(name: string): string {
    return new URL(`../../../assets/cardTypes/${findCardType(name)}.webp`, import.meta.url).href;
}

function getTitanImageUrl(name: string): string {
    return new URL(`../../../assets/titans/${name}.webp`, import.meta.url).href;
}

function getTitanMarkImageUrl(name: string): string {
    return new URL(`../../../assets/titanPartTargets/${name}.webp`, import.meta.url).href;
}

type RaidDeckProps = { id: string; sources: RaidCardType[] };

function RaidDeck({ id, sources }: RaidDeckProps) {
    return (
        <div className="items-center flex justify-center h-auto w-max-content gap-1">
            {sources.filter(excludeTapDamageCard).map(({ name: cardName, value: cardLevel }: RaidCardType, index: number) => {
                return (
                    <div key={id + cardName + cardLevel + index + 'container'} className="relative">
                        <span key={id + cardName + cardLevel + index + 'span'} className="absolute z-20 inset-x-0 -left-1 -top-1">
                            <Image
                                key={id + cardName + cardLevel + 'image'}
                                src={getCardTypeImageUrl(cardName)}
                                className="w-full h-full h-4 w-4 sm:h-6 sm:w-6"
                            />
                        </span>
                        <Image
                            key={id + cardName + index + 'image'}
                            src={getCardImageUrl(cardName)}
                            className="rounded flex object-cover w-full h-full h-8 w-8 sm:h-16 sm:w-16"
                        />
                        <span
                            key={id + cardLevel + index + 'span'}
                            className="absolute z-10 inset-x-0 bottom-0 text-white bg-black/50 text-tiny rounded-b text-right pr-1"
                        >
                            {cardLevel}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function RaidLog({ data }: RaidLogProps) {
    const titans = useTitanStore((state) => state.titans);

    const getTitan = (titanId: string): TitanSequence | undefined => titans.find(({ id }: TitanSequence) => id === titanId);

    const getTitanName = (titanId: string): string => {
        const fallbackName: string = 'Jukk';
        const titanName: string = getTitan(titanId)?.name ?? fallbackName;

        return titanName;
    };

    const getTitanCursedParts = (titanId: string): TitanCurseData | undefined => {
        const titan = getTitan(titanId);

        if (!titan) return undefined;

        const returnData: TitanCurseData = {
            curse_type: titan.curse_type,
            parts: titan.parts,
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
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Hand Right']))}
                                        width={24}
                                        className="absolute bottom-16 left-6"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Head']))}
                                        width={24}
                                        className="absolute -top-40 left-[5.75rem]"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Chest']))}
                                        width={24}
                                        className="absolute bottom-24 left-[5.75rem]"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Leg Right']))}
                                        width={24}
                                        className="absolute -top-10 left-16"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Leg Left']))}
                                        width={24}
                                        className="absolute -top-10 left-28"
                                    />

                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Arm Left']))}
                                        width={24}
                                        className="absolute -top-40 left-40"
                                    />
                                    <Image
                                        src={getTitanMarkImageUrl(getTitanMarkParts(raid_titan_id, TitanPartMap['Armor Hand Left']))}
                                        width={24}
                                        className="absolute bottom-16 left-[9.25rem]"
                                    />
                                </div>
                            </div>

                            <TitanPartTableInfo parts={parts} titanData={getTitanCursedParts(raid_titan_id)} />
                        </div>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

export default RaidLog;
