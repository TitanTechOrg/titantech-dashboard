import { RaidAttack } from '../types';
import RaidDeck from './components/RaidDeck';
import RaidPlayerInfo from './components/RaidPlayerInfo';

type RaidLogItemProps = Pick<RaidAttack, 'titan_attack_id' | 'sources' | 'occurred_at' | 'damage' | 'player_name'>;

function RaidLogItem({ sources, titan_attack_id, occurred_at, damage, player_name }: RaidLogItemProps) {
    return (
        <div className="inline-flex items-center flex-row ">
            <div>
                <RaidDeck sources={sources} titan_attack_id={titan_attack_id} occurred_at={occurred_at} />
            </div>
            <div className="flex flex-col text-left ml-4">
                <RaidPlayerInfo player_name={player_name} damage={damage} occurred_at={occurred_at} />
            </div>
        </div>
    );
}

export default RaidLogItem;
