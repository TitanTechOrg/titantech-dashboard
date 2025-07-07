import type { RaidCardType } from '@/features/attacks';
import { getCardImageUrl } from '@/utils';
import { Image } from '@heroui/react';

export function RaidCard({ name: cardName, value: cardLevel, readableName }: RaidCardType) {
    return (
        <div title={readableName} className="relative h-8 w-8 sm:h-16 sm:w-16">
            <Image src={getCardImageUrl(cardName)} className="z-0 rounded-sm object-cover" />
            <span className="absolute bottom-0 right-0 z-10 rounded-br rounded-tl bg-black/50 px-0.5 text-right text-tiny text-white">
                {cardLevel}
            </span>
        </div>
    );
}
