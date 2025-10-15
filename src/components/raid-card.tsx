import type { RaidCardType } from '@/features/attacks';
import { getCardImageUrl } from '@/utils';
import { Image } from '@heroui/react';

export function RaidCard({
  name: cardName,
  value: cardLevel,
  readableName,
}: RaidCardType) {
  return (
    <div title={readableName} className="relative h-8 w-8 sm:h-16 sm:w-16">
      <Image
        src={getCardImageUrl(cardName)}
        className="z-0 rounded-sm object-cover"
      />
      <span className="text-tiny absolute right-0 bottom-0 z-10 rounded-tl rounded-br bg-black/50 px-0.5 text-right text-white">
        {cardLevel}
      </span>
    </div>
  );
}
