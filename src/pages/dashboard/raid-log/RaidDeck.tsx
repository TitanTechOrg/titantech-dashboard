import { RaidCardMap } from '@/lib/constants';
import { RaidCardType } from './types';
import { Image } from '@nextui-org/react';
import React from 'react';

type RaidDeckProps = { id: string; sources: RaidCardType[] };

function getCardImageUrl(name: string): string {
    return new URL(`../../../assets/cards/${findCard(name)}.webp`, import.meta.url).href;
}

function getCardTypeImageUrl(name: string): string {
    return new URL(`../../../assets/cardTypes/${findCardType(name)}.webp`, import.meta.url).href;
}

const findCardType = (name: string) => RaidCardMap[findCard(name) as RaidMapKey].type;

const findCard = (name: string): string =>
    Object.keys(RaidCardMap).find((v: string) => RaidCardMap[v as RaidMapKey].name === name) ?? RaidCardMap.Wildcard.name;

const excludeTapDamageCard = ({ name }: RaidCardType): boolean => name !== 'TapDamage';

type RaidMapKey = keyof typeof RaidCardMap;

function RaidDeck({ id, sources }: RaidDeckProps) {
    return (
        <div className="items-center flex justify-center h-auto w-max-content gap-1">
            {sources.filter(excludeTapDamageCard).map(({ name: cardName, value: cardLevel }: RaidCardType, index: number) => {
                return (
                    <div key={id + cardName + cardLevel + index + 'container'} className="relative">
                        <span key={id + cardName + cardLevel + index + 'span'} className="absolute z-20 inset-x-0 -left-1 -top-1">
                            <Image key={id + cardName + cardLevel + 'image'} src={getCardTypeImageUrl(cardName)} className="h-4 w-4 sm:h-6 sm:w-6" />
                        </span>
                        <Image
                            key={id + cardName + index + 'image'}
                            src={getCardImageUrl(cardName)}
                            className="rounded flex object-cover h-8 w-8 sm:h-16 sm:w-16"
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

export default React.memo(RaidDeck);
