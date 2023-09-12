import { RaidAttack } from '../../types';
import RaidCard from './RaidCard';

type RaidDeckProps = Pick<RaidAttack, 'sources' | 'titan_attack_id' | 'occurred_at'>;

const excludeTapDamageCard = (name: string): boolean => name !== 'TapDamage';

function RaidDeck({ sources, titan_attack_id, occurred_at }: RaidDeckProps) {
    return sources.filter(excludeTapDamageCard).map((name: string) => <RaidCard key={titan_attack_id + occurred_at + name} cardName={name} />);
}

export default RaidDeck;
