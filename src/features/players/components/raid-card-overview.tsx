import { FILTER_OPTIONS, PlayerProfileType, RaidCards, useFilterStore } from '@/features/players';
import { addSpacesBetweenCapitalLetters, findCard } from '@/utils';
import { Button } from '@nextui-org/react';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

type PlayerRaidCardsOverviewProps = {
    cards: PlayerProfileType['cards'];
};

function PlayerRaidCardsOverview({ cards }: PlayerRaidCardsOverviewProps) {
    const { filters, toggleFilter } = useFilterStore();

    const transformedCards = cards.map((card) => ({
        ...card,
        readable_name: addSpacesBetweenCapitalLetters(findCard(card.skill_name)),
    }));

    return (
        <div className="col-span-2 row-start-3 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Raid Cards</h1>
            <div className="flex gap-2">
                <Button onClick={() => toggleFilter('sortBy')}>{filters.sortBy}</Button>
                <Button
                    onClick={() => toggleFilter('sortOrder')}
                    endContent={filters.sortOrder === FILTER_OPTIONS.sortOrder[0] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                >
                    {filters.sortOrder}
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                <RaidCards title="Burst" data={{ cards: transformedCards }} />
                <RaidCards title="Affliction" data={{ cards: transformedCards }} />
                <RaidCards title="Support" data={{ cards: transformedCards }} />
            </div>
        </div>
    );
}

export default PlayerRaidCardsOverview;
