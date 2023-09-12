import { formatter } from '@/lib/utils';
import { RaidAttack } from '../../types';

type RaidPlayerInfoProps = Pick<RaidAttack, 'player_name' | 'damage' | 'occurred_at'>;

function RaidPlayerInfo({ player_name, damage, occurred_at }: RaidPlayerInfoProps) {
    return (
        <>
            <p className="text-xl text-muted-foreground">{formatter().format(damage)}</p>
            <p className="text-sm text-muted-foreground">
                {player_name} at {new Date(occurred_at + 'Z').toLocaleTimeString()}
            </p>
        </>
    );
}

export default RaidPlayerInfo;
