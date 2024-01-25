import { Accordion, AccordionItem } from '@nextui-org/react';
import { RaidTitanData } from '@/components';
import { useBoundStore } from '@/stores/bound.store';
import { RaidAttack, TitanPart } from '../types';
import { RaidDeck } from './raid-deck.component';
import { formatter } from '@/utils/number-formatter';
import { useMediaQueries } from '@react-hook/media-query';
import { useMemo } from 'react';
import { QuickView } from '..';
import { TitanSequence } from '@/features/titans';

type RaidLogProps = {
    data: RaidAttack[];
};

const mapUniqueParts = (parts: TitanPart[]) => {
    const summedUpValueInParts = parts.reduce((accumulator: TitanPart[], cur: TitanPart) => {
        const name = cur.name;
        const found = accumulator.find(function (elem) {
            return elem.name === name;
        });
        if (found) found.value += cur.value;
        else accumulator.push(cur);
        return accumulator;
    }, []);

    return summedUpValueInParts;
};

type MobileViewProps = {
    data: RaidAttack[];
    titan: (id: string) => TitanSequence | undefined;
};

function MobileView({ data, titan }: MobileViewProps) {
    return (
        <Accordion selectionMode="multiple">
            {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts, raid_titan_id }: RaidAttack) => (
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
                            <span className="font-light text-xs">{new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}</span>
                        </div>
                    }
                >
                    <RaidTitanData titan={titan(raid_titan_id)} damagedParts={parts} />
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function MobileCompactView({ data, titan }: MobileViewProps) {
    return (
        <Accordion selectionMode="multiple">
            {data.map(({ damage, titan_attack_id, player_name, occurred_at, parts, raid_titan_id }: RaidAttack) => (
                <AccordionItem
                    key={titan_attack_id}
                    aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                    startContent={<QuickView titan={titan(raid_titan_id)} data={mapUniqueParts(parts)} isCompactView={true} />}
                    title={
                        <div className="flex flex-col justify-center items-end">
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-bold text-lg">{formatter().format(damage)}</p>
                                <span className="text-sm font-normal text-black dark:text-white">{player_name}</span>
                            </div>
                            <span className="font-light text-xs">{new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}</span>
                        </div>
                    }
                >
                    <RaidTitanData titan={titan(raid_titan_id)} damagedParts={parts} />
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function DesktopView({ data, titan }: MobileViewProps) {
    return (
        <Accordion selectionMode="multiple">
            {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts, raid_titan_id }: RaidAttack) => (
                <AccordionItem
                    key={titan_attack_id}
                    aria-label={`${player_name} did ${damage} damage at ${occurred_at}`}
                    startContent={<RaidDeck id={`${titan_attack_id}${occurred_at}${player_name}`} sources={sources} />}
                    title={<p className="flex flex-row justify-between items-center pl-2">{formatter().format(damage)}</p>}
                    subtitle={
                        <div className="relative">
                            <QuickView titan={titan(raid_titan_id)} data={mapUniqueParts(parts)} />
                            <p className="font-bold flex flex-row justify-between items-center pl-2">
                                {player_name}
                                <span className="font-light text-xs pl-2">
                                    {new Date(occurred_at + 'Z').toLocaleTimeString([], { timeStyle: 'short' })}
                                </span>
                            </p>
                        </div>
                    }
                >
                    <RaidTitanData titan={titan(raid_titan_id)} damagedParts={parts} />
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export function RaidLog({ data }: RaidLogProps) {
    const { matches } = useMediaQueries({
        screen: 'screen',
        width: '(max-width: 640px)',
    });

    const { titans, showRaidCards } = useBoundStore();

    if (data.length === 0) return null;

    const titan = useMemo(() => (id: string) => titans.find((titan) => titan.id === id), [titans]);

    if (matches.width) {
        if (showRaidCards) {
            return <MobileView data={data} titan={titan} />;
        }

        return <MobileCompactView data={data} titan={titan} />;
    }

    return <DesktopView data={data} titan={titan} />;
}
