import { CustomSelect } from '@/components';
import { Skeleton } from '@nextui-org/react';

type PlayerSelectProps = {
    overviewPlayers: { players_data: { player_id: string; player_name: string }[] } | undefined;
    isLoading: boolean;
};

function PlayerSelect({ overviewPlayers, isLoading }: PlayerSelectProps) {
    return (
        <div className="col-span-2 row-span-1 row-start-1 flex flex-col items-center justify-start gap-4">
            <div className="text-left">
                <h1 className="text-2xl font-bold">Player Raid Profile</h1>
                <p>Select a player to show their raid info</p>
            </div>
            {!isLoading && overviewPlayers ? (
                <CustomSelect
                    selectKey="player-selector"
                    label="Clan member"
                    placeholder="Select player"
                    options={overviewPlayers.players_data
                        .map((player) => ({ value: player.player_id, label: player.player_name }))
                        .sort((a, b) => a.label.localeCompare(b.label))}
                />
            ) : (
                <Skeleton className="min-h-14 w-full max-w-xs rounded-lg px-3 py-2" />
            )}
        </div>
    );
}

export default PlayerSelect;
