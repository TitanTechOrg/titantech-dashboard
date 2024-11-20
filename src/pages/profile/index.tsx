import { PageContainer } from '@/components';
import { useOverviewPlayers } from '@/features/overview';
import { RaidCardsLevelChart, usePlayerProfile } from '@/features/players';
import PlayerSelect from '@/features/players/components/player-select';
import PlayerStats from '@/features/players/components/player-stats';
import PlayerRaidCardsOverview from '@/features/players/components/raid-card-overview';
import { useRaidList } from '@/features/raid-info';
import { useSelectStore } from '@/stores/useSelectStore';
import { Spinner } from '@nextui-org/react';

export default function PlayerProfile() {
    const { data: raidList, isLoading: isLoadingRaidList } = useRaidList();
    const raidId = raidList?.raids.find((raid) => raid.ended_at != null)?.raid_id;
    const { data: overviewPlayers, isLoading: isLoadingOverviewPlayers } = useOverviewPlayers(raidId);
    const { selectedValues: selectedPlayerId } = useSelectStore();
    const { data: playerProfile, isLoading: isLoadingProfile, isError: isErrorLoadingPlayer } = usePlayerProfile(selectedPlayerId['player-selector']);

    if (isLoadingRaidList) {
        return (
            <div className="flex h-dvh justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <PageContainer>
            <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2">
                <div className="col-span-2 row-span-1 row-start-1">
                    <div className="mb-2 flex flex-col items-start justify-center">
                        <h1 className="text-2xl font-bold">Player Raid Profile</h1>
                        <p>Select a player to show their raid info</p>
                    </div>
                    <PlayerSelect overviewPlayers={overviewPlayers} isLoading={isLoadingOverviewPlayers} />
                </div>

                {isLoadingProfile ? (
                    <div className="col-span-2 mx-auto justify-center">
                        <Spinner label="Loading player data..." />
                    </div>
                ) : isErrorLoadingPlayer ? (
                    <div className="col-span-2 mx-auto justify-center">Player data could not be fetched. Is the player currently in the clan?</div>
                ) : (
                    playerProfile && (
                        <>
                            <PlayerStats playerProfile={playerProfile} />
                            <PlayerRaidCardsOverview cards={playerProfile.cards} />
                            <div className="col-span-2 row-start-4">
                                <RaidCardsLevelChart key={'RaidCardsLevelChart'} cards={playerProfile.cards} />
                            </div>
                        </>
                    )
                )}
            </div>
        </PageContainer>
    );
}
