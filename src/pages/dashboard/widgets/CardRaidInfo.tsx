import { Accordion, AccordionItem, Card, CardBody, CardHeader, Image, Spacer, Tooltip } from '@nextui-org/react';
import { RaidCycle, RaidData } from '../raid-log/types';
import Show from '@/components/Show';

type CardRaidInfoProps = {
    raidData?: RaidData;
    raidCycle?: RaidCycle;
};

const convertUTCDateToLocalDate = (dateString: string): string =>
    new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

const RaidBuffMapping = {
    ArmorDamage: 'Armor Damage +25%',
    HeadDamage: 'Head Damage +30%',
    BurstDamage: 'Burst Damage +30%',
    AfflictedDamage: 'Affliction Damage +30%',
    AllRaidDamage: 'All Raid Damage +15%',
    BurstChance: 'Burst Chance +30%',
    AfflictedDuration: 'Affliction Duration +40%',
    ChestDamage: 'Torso Damage +30%',
    LimbDamage: 'Limb Damage +30%',
    AfflictedChance: 'Affliction Chance +30%',
    RaidAttackDuration: 'Attack Duration +3s',
    BodyDamage: 'Body Damage +20%',
    SupportEffect: 'All Support Effects +15%',
} as const;

type RaidBuffMappingType = keyof typeof RaidBuffMapping;

const raidIconFileName = 'RaidIcon';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/${name}.webp`, import.meta.url).href;
}

export default function CardRaidInfo({ raidCycle, raidData }: CardRaidInfoProps) {
    if (!raidData) return null;

    const { buff_type, level, raid_id, started_at: raid_started_at, tier } = raidData;
    const raidStarted: string[] = raidCycle ? [] : [raid_id];

    return (
        <Card className="dark:bg-default min-w-72 w-full">
            <Accordion defaultExpandedKeys={raidStarted}>
                <AccordionItem
                    key={raid_id}
                    aria-label="Accordion for displaying Raid Info. Tap to open/close."
                    title={
                        <CardHeader className="flex flex-row items-center justify-between gap-4 mt-0">
                            <div className="flex flex-row items-center justify-start gap-4">
                                <div className="min-w-fit">
                                    <Image src={getImageUrl(raidIconFileName)} className="rounded-lg flex object-cover w-full h-full h-8 w-8" />
                                </div>

                                <h3 className="text-md font-medium">
                                    {tier === '9999' ? 'Master Tier ⦁ ' : tier} {level}
                                </h3>
                            </div>

                            {raidCycle != null && (
                                <div className="text-xl font-bold">
                                    {raidCycle.cycle}
                                    <span className="text-sm font-semibold">
                                        {getOrdinalSuffix(raidCycle.cycle)}
                                        {' round'}
                                    </span>
                                </div>
                            )}
                        </CardHeader>
                    }
                >
                    <CardBody className="pt-0">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-medium flex justify-between space-x-4">
                                <span>Raid Bonus</span>
                                <span>{RaidBuffMapping[buff_type as RaidBuffMappingType]} </span>
                            </div>

                            <div className="text-sm font-medium flex justify-between">
                                <span>Raid start</span>
                                <Tooltip showArrow={true} content={new Date(raid_started_at).toUTCString()}>
                                    <span className="text-sm font-medium">{convertUTCDateToLocalDate(raid_started_at)}</span>
                                </Tooltip>
                            </div>

                            {raidCycle != null && (
                                <div className="text-sm font-medium flex justify-between">
                                    <span>Next cycle</span>
                                    <Tooltip showArrow={true} content={new Date(raidCycle.next_reset_at).toUTCString()}>
                                        <span className="text-sm font-medium">{convertUTCDateToLocalDate(raidCycle.next_reset_at)}</span>
                                    </Tooltip>
                                </div>
                            )}
                        </div>

                        <Spacer y={4} />

                        <span className="text-sm font-light text-right italic">All times are local</span>
                    </CardBody>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
