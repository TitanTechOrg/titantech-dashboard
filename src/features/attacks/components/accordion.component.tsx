import { Accordion, AccordionItem } from '@nextui-org/react';
import { RaidTitanData } from '@/components';
import { useBoundStore } from '@/stores/bound.store';
import { RaidAttack } from '../types';
import { RaidDeck } from './raid-deck.component';
import { formatter } from '@/utils/number-formatter';
import { useMediaQueries } from '@react-hook/media-query';

type RaidLogProps = {
    data: RaidAttack[];
};

export function RaidLog({ data }: RaidLogProps) {
    const { matches } = useMediaQueries({
        screen: 'screen',
        width: '(max-width: 640px)',
    });

    const titan = useBoundStore((state) => state.currentTitan);

    if (!titan) return null;
    if (data.length === 0) return null;

    return (
        <Accordion selectionMode="multiple">
            {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts }: RaidAttack) => {
                return matches.width ? (
                    <AccordionItem
                        key={titan_attack_id}
                        aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                        title={
                            <div className="flex flex-row justify-between items-center gap-4">
                                <RaidDeck id={`${titan_attack_id}${occurred_at}${player_name}`} sources={sources} />
                                <p className="font-bold text-lg">{formatter().format(damage)}</p>
                            </div>
                        }
                        subtitle={
                            <div className="flex flex-row justify-between items-center gap-4">
                                <span className="text-sm font-normal text-black dark:text-white">{player_name}</span>
                                <span className="font-light text-xs">
                                    {new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}
                                </span>
                            </div>
                        }
                    >
                        <RaidTitanData titan={titan} damagedParts={parts} />
                    </AccordionItem>
                ) : (
                    <AccordionItem
                        key={titan_attack_id}
                        aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                        startContent={<RaidDeck id={`${titan_attack_id}${occurred_at}${player_name}`} sources={sources} />}
                        title={<p className="flex flex-row justify-between items-center pl-2">{formatter().format(damage)}</p>}
                        subtitle={
                            <p className="font-bold flex flex-row justify-between items-center pl-2">
                                {player_name}{' '}
                                <span className="font-light text-xs pl-2">
                                    {new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}
                                </span>
                            </p>
                        }
                    >
                        <RaidTitanData titan={titan} damagedParts={parts} />
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
