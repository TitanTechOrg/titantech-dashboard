import { RaidCardMap } from '@/constants/cards';
import { Image } from '@nextui-org/react';
import { RaidCard } from '../types';

type RaidDeckProps = { id: string; sources: RaidCard[] };

function getCardImageUrl(name: string): string {
    return new URL(`../../../assets/cards/${findCard(name)}.webp`, import.meta.url).href;
}

function getCardTypeImageUrl(name: string): string {
    return new URL(`../../../assets/cardTypes/${findCardType(name)}.webp`, import.meta.url).href;
}

const findCardType = (name: string) => RaidCardMap[findCard(name) as RaidMapKey].type;

const findCard = (name: string): string =>
    Object.keys(RaidCardMap).find((v: string) => RaidCardMap[v as RaidMapKey].name === name) ?? RaidCardMap.Wildcard.name;

const excludeTapDamageCard = ({ name }: RaidCard): boolean => name !== 'TapDamage';

type RaidMapKey = keyof typeof RaidCardMap;

export function RaidDeck({ id, sources }: RaidDeckProps) {
    return (
        <div className="w-max-content flex h-auto items-center justify-center gap-1">
            {sources?.filter(excludeTapDamageCard)?.map(({ name: cardName, value: cardLevel }: RaidCard, index: number) => {
                return (
                    <div key={id + cardName + cardLevel + index + 'container'} className="relative">
                        <span key={id + cardName + cardLevel + index + 'span'} className="absolute inset-x-0 -left-1 -top-1 z-10">
                            <Image key={id + cardName + cardLevel + 'image'} src={getCardTypeImageUrl(cardName)} className="h-4 w-4 sm:h-6 sm:w-6" />
                        </span>
                        <Image
                            key={id + cardName + index + 'image'}
                            src={getCardImageUrl(cardName)}
                            className="z-0 h-8 w-8 rounded object-cover sm:h-16 sm:w-16"
                        />
                        <span
                            key={id + cardLevel + index + 'span'}
                            className="absolute inset-x-0 bottom-0 z-10 rounded-b bg-black/50 pr-1 text-right text-tiny text-white"
                        >
                            {cardLevel}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
