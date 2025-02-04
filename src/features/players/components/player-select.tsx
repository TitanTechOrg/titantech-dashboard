import { CustomSelect } from '@/components';
import { Skeleton } from "@heroui/react";

type PlayerSelectProps = {
    overviewPlayers: { players_data: { player_id: string; player_name: string }[] } | undefined;
    isLoading: boolean;
};

function PlayerSelect({ overviewPlayers, isLoading }: PlayerSelectProps) {
    return (
        <div>
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
