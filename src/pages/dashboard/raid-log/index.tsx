import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import '@/App.css';
import { RaidAttack } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TitanPartTableInfo from './detail-view';
import RaidLogItem from './raid-log-item';

type RaidLogProps = {
    data: RaidAttack[];
};

function RaidLog({ data }: RaidLogProps) {
    if (data.length === 0) {
        return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">No raid data</h2>;
    }

    return (
        <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Raid attack log</h2>
            <div>
                {data.map(({ sources, damage, titan_attack_id, player_name, occurred_at, parts }: RaidAttack) => {
                    return (
                        <Accordion type="single" collapsible key={titan_attack_id}>
                            <AccordionItem value={titan_attack_id}>
                                <AccordionTrigger>
                                    <RaidLogItem
                                        titan_attack_id={titan_attack_id}
                                        sources={sources}
                                        occurred_at={occurred_at}
                                        damage={damage}
                                        player_name={player_name}
                                    />
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-row">
                                        <div>
                                            <Avatar className="bg-blackA3 inline-flex h-[150px] w-[150px] select-none items-center justify-center overflow-hidden rounded-lg align-middle">
                                                <AvatarImage
                                                    className="h-full w-full rounded-[inherit] object-cover"
                                                    src={'https://cdn.discordapp.com/attachments/1023719138495045652/1148262949870391366/jukk.png'}
                                                    alt={'titan'}
                                                />
                                                <AvatarFallback
                                                    className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                                    delayMs={600}
                                                >
                                                    {'titan'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <TitanPartTableInfo data={parts} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                })}
            </div>
        </div>
    );
}

export default RaidLog;
