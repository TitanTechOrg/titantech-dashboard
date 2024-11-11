import { RaidCard } from '@/components';
import { useFilterStore } from '@/features/players';
import { addSpacesBetweenCapitalLetters, findCard, findCardType } from '@/utils';

type RaidCardItem = {
    skill_name: string;
    level: number;
    readable_name: string;
};

type RaidCardsProps = {
    title: 'Burst' | 'Affliction' | 'Support';
    data: { cards: RaidCardItem[] };
};

function sortRaidCards(filters: { sortBy: string; sortOrder: string }, a: RaidCardItem, b: RaidCardItem): number {
    const ascending = filters.sortOrder === 'Asc';
    const property = filters.sortBy === 'Sort by Name' ? 'skill_name' : 'level';

    if (property === 'level') return ascending ? a.level - b.level : b.level - a.level;
    return ascending ? a.readable_name.localeCompare(b.readable_name) : b.readable_name.localeCompare(a.readable_name);
}

export function RaidCards({ title, data }: RaidCardsProps) {
    const { filters } = useFilterStore();

    return (
        <div className="w-full">
            <h1 className="pb-2 text-left text-lg font-medium">{title}</h1>
            <div className="flex flex-wrap gap-1">
                {data.cards
                    .filter((card) => findCardType(card.skill_name) === title)
                    .map((card) => ({
                        ...card,
                        readable_name: addSpacesBetweenCapitalLetters(findCard(card.skill_name)),
                    }))
                    .sort((a, b) => sortRaidCards(filters, a, b))
                    .map(({ skill_name, level, readable_name }) => (
                        <RaidCard key={skill_name} name={skill_name} value={level} readableName={readable_name} />
                    ))}
            </div>
        </div>
    );
}
