import { RaidCard } from '@/components/raid-card';
import { RaidCardType } from '../types';

type RaidDeckProps = { id: string; sources: RaidCardType[] };

const excludeTapDamageCard = ({ name }: RaidCardType): boolean =>
  name !== 'TapDamage';

export function RaidDeck({ id, sources }: RaidDeckProps) {
  return (
    <div className="w-max-content flex h-auto items-center justify-center gap-1">
      {sources
        ?.filter(excludeTapDamageCard)
        ?.map((data: RaidCardType, index: number) => {
          return (
            <RaidCard key={id + data.name + data.value + index} {...data} />
          );
        })}
    </div>
  );
}
