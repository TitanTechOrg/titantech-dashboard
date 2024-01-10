import { Accordion, AccordionItem } from '@nextui-org/react';
import { RaidAttack } from './types';
import { formatter } from '@/lib/utils';
import RaidDeck from './RaidDeck';
import React from 'react';
import RaidTitanData from '@/components/RaidTitanData';
import { useBoundStore } from '@/stores/useBoundStore';

type RaidLogProps = {
    data: RaidAttack[];
};

function RaidLog({ data }: RaidLogProps) {
    const titan = useBoundStore((state) => state.currentTitan);

    if (!titan) return null;
    if (data.length === 0) return null;

    return (
        <Accordion selectionMode="multiple">
            {data?.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts }: RaidAttack) => {
                return (
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
                        <RaidTitanData titan={titan} parts={parts} />
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

export default React.memo(RaidLog);
