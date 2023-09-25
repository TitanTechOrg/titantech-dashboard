import { Accordion, AccordionItem, Avatar, AvatarGroup } from '@nextui-org/react';
import { ChevronUpIcon } from '@nextui-org/shared-icons';

import '@/App.css';
import { RaidAttack } from './types';
import TitanPartTableInfo from './detail-view';
import { RaidCardMap } from '@/lib/constants';
import { formatter } from '@/lib/utils';

type RaidLogProps = {
    data: RaidAttack[];
};

const excludeTapDamageCard = (name: string): boolean => name !== 'TapDamage';

type RaidMapKey = keyof typeof RaidCardMap;

const findCard = (name: string): string =>
    Object.keys(RaidCardMap).find((v: string) => RaidCardMap[v as RaidMapKey] === name) ?? RaidCardMap['Wildcard'];

function getImageUrl(name: string): string {
    return new URL(`../../../assets/${findCard(name)}.webp`, import.meta.url).href;
}

type RaidDeckProps = { id: string; sources: string[] };

const RaidDeck = ({ id, sources }: RaidDeckProps) => {
    return (
        <AvatarGroup isBordered>
            {sources.filter(excludeTapDamageCard).map((cardName: string) => (
                // <Badge style={index === 0 ? { marginLeft: -8 } : {}} content="5" color="default" placement="bottom-left" shape="rectangle">
                <Avatar key={id + cardName} src={getImageUrl(cardName)} isBordered radius="md" />
                // </Badge>
            ))}
        </AvatarGroup>
    );
};

function RaidLog({ data }: RaidLogProps) {
    return (
        <div>
            <Accordion selectionMode="multiple">
                {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts }: RaidAttack) => {
                    return (
                        <AccordionItem
                            key={titan_attack_id}
                            aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                            startContent={<RaidDeck id={`${titan_attack_id}${occurred_at}${player_name}`} sources={sources} />}
                            subtitle={
                                <p className="font-bold flex flex-row justify-between items-center">
                                    {player_name}{' '}
                                    <span className="font-light text-xs pl-2">
                                        {new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}
                                    </span>
                                </p>
                            }
                            title={formatter().format(damage)}
                            className="[&_span.rotate-0]:data-[open=true]:rotate-180"
                            indicator={<ChevronUpIcon />}
                        >
                            <TitanPartTableInfo data={parts} />
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}

export default RaidLog;
