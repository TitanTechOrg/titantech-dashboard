import { PlayerProfileType } from '@/features/players';

function calculateAverage(items: { level: number }[]): number {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.level, 0);
  return parseFloat((total / items.length).toFixed(2));
}

type PlayerStatsProps = {
  playerProfile: PlayerProfileType;
};

function PlayerStats({ playerProfile }: PlayerStatsProps) {
  return (
    <div className="col-span-1 row-start-2">
      <h1 className="text-2xl font-bold">Player stats</h1>
      <div className="flex h-full flex-col justify-between gap-1">
        <div>
          <div className="flex justify-between">
            <p>Ingame name</p>
            {playerProfile.name}
          </div>
          <div className="flex justify-between">
            <p>Loyalty</p>
            {playerProfile.loyalty_level}
          </div>
          <div className="flex justify-between">
            <p>Raid level</p>
            {playerProfile.player_raid_level}
          </div>
          <div className="flex justify-between">
            <p>Wildcards</p>
            {playerProfile.raid_wildcard_count}
          </div>
          <div className="flex justify-between">
            <p>Total Card Level</p>
            {playerProfile.total_card_level}
          </div>
          <div className="flex justify-between">
            <p>Average Card Level</p>
            {calculateAverage(playerProfile.cards)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;
