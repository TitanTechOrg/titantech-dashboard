import { RaidCardMap } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type RaidMapKey = keyof typeof RaidCardMap;

const findCard = (name: string): string =>
    Object.keys(RaidCardMap).find((v: string) => RaidCardMap[v as RaidMapKey] === name) ?? RaidCardMap['Wildcard'];

function getImageUrl(name: string): string {
    return new URL(`../../../../../assets/${findCard(name)}.webp`, import.meta.url).href;
}

type RaidCardProps = { cardName: string };

function RaidCard({ cardName }: RaidCardProps) {
    return (
        <Avatar className="bg-blackA3 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-lg align-middle">
            <AvatarImage className="h-full w-full rounded-[inherit] object-cover" src={getImageUrl(cardName)} alt={cardName} />
            <AvatarFallback
                className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                delayMs={600}
            >
                {cardName}
            </AvatarFallback>
        </Avatar>
    );
}

export default RaidCard;
