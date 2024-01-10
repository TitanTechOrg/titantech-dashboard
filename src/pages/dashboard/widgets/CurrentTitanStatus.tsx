import { formatter, percentage } from '@/lib/utils';
import { TitanSequence } from '../raid-log/types';
import { Card, CardBody, CardHeader, Divider, Image, Progress, Skeleton } from '@nextui-org/react';
import { useBoundStore } from '@/stores/useBoundStore';

type CurrentTitanStatusProps = {
    titan?: TitanSequence;
};

function getImageUrl(name: string): string {
    return new URL(`../../../assets/cards/${name}.webp`, import.meta.url).href;
}

function getTitanImageUrl(name: string): string {
    return new URL(`../../../assets/titans/avatars/${name}.webp`, import.meta.url).href;
}

const titanAvatarSuffix = '_avatar';

type TitanHealthBarsProps = {
    titanArmourHealthPercentage: number;
    titanBodyHealthPercentage: number;
    titanArmourHealthValue: number;
    titanBodyHealthValue: number;
};

const getTitanHealthPercentage = (titan: TitanSequence | undefined, partType: 'Body' | 'Armor'): number => {
    if (!titan) return 0;

    const markedParts = titan.parts.filter((part) => part.target && part.name.includes(partType));
    const totalHealth = markedParts.reduce((prev, curr) => prev + curr.health, 0);
    const totalRemainingHealth = markedParts.reduce((prev, curr) => prev + curr.current_health, 0);

    const remainingTitanBodyHealth = titan.health - totalHealth + totalRemainingHealth;

    let result = partType === 'Armor' ? percentage(totalHealth, totalRemainingHealth) : percentage(titan.health, remainingTitanBodyHealth);

    if (result < 0) result = 0;

    return result;
};

const getTitanHealth = (titan: TitanSequence | undefined, partType: 'Body' | 'Armor'): number => {
    if (!titan) return 0;

    const markedParts = titan.parts.filter((part) => part.target && part.name.includes(partType));
    const totalHealth = markedParts.reduce((prev, curr) => prev + curr.health, 0);
    const totalRemainingHealth = markedParts.reduce((prev, curr) => prev + curr.current_health, 0);

    const remainingTitanBodyHealth = titan.health - totalHealth + totalRemainingHealth;

    const result = partType === 'Armor' ? totalRemainingHealth : remainingTitanBodyHealth;

    return result;
};

function TitanHealthBars({
    titanArmourHealthPercentage,
    titanBodyHealthPercentage,
    titanArmourHealthValue,
    titanBodyHealthValue,
}: TitanHealthBarsProps) {
    // const isNegativeArmour = titanArmourHealthValue < 0;
    // const isNegativeBody = titanBodyHealthValue < 0;

    const armourTooltipContent = `${formatter().format(titanArmourHealthValue)}`;
    const bodyTooltipContent = `${formatter().format(titanBodyHealthValue)}`;

    return (
        <div className="flex flex-col items-center gap-2 py-2">
            <Progress
                className="!gap-1"
                label={<span className="text-sm font-medium">Armor</span>}
                showValueLabel={true}
                aria-label="Titan total armour..."
                valueLabel={
                    <div className="flex flex-row justify-center items-baseline gap-2">
                        <span className="text-md font-semibold">{armourTooltipContent}</span>
                        <span className="text-sm font-light text-right italic">({titanArmourHealthPercentage}%)</span>
                    </div>
                }
                value={titanArmourHealthPercentage}
                size="md"
                color="default"
                isStriped={true}
            />
            <Progress
                className="!gap-1"
                label={<span className="text-sm font-medium">Body</span>}
                showValueLabel={true}
                aria-label="Titan total health..."
                valueLabel={
                    <div className="flex flex-row justify-center items-baseline gap-2">
                        <span className="text-md font-semibold">{bodyTooltipContent}</span>
                        <span className="text-sm font-light text-right italic">({titanBodyHealthPercentage}%)</span>
                    </div>
                }
                value={titanBodyHealthPercentage}
                size="md"
                color="primary"
                isStriped={true}
            />
        </div>
    );
}

export default function CurrentTitanStatus({ titan }: CurrentTitanStatusProps) {
    const { isInsanityVoid, isSkeletalSmash, isDecayingStrike, isVictoryMarch, hasActiveConditionals } = useBoundStore();

    return (
        <Card className="dark:bg-neutral-800 min-w-72 w-full h-full p-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Skeleton isLoaded={!!titan} className="rounded-lg">
                            <Image src={getTitanImageUrl(titan?.name + titanAvatarSuffix)} className="rounded-lg flex object-cover h-8 w-8" />
                        </Skeleton>
                    </div>

                    <Skeleton isLoaded={!!titan} className="rounded-lg">
                        <h3 className="text-lg font-medium">Current titan</h3>
                    </Skeleton>
                </div>

                <Skeleton isLoaded={!!titan} className="rounded-lg">
                    <div className="text-xl font-bold">{titan?.name}</div>
                </Skeleton>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Divider />
                <div className="text-sm font-medium flex justify-between space-x-4">
                    <Skeleton isLoaded={!!titan} className="rounded-lg">
                        <span>Titan Debuff</span>
                    </Skeleton>
                    <Skeleton isLoaded={!!titan} className="rounded-lg">
                        <span>
                            {titan?.area_type} {titan?.area_amount}
                        </span>
                    </Skeleton>
                </div>
                <Skeleton isLoaded={!!titan} className="rounded-lg">
                    <TitanHealthBars
                        titanArmourHealthPercentage={getTitanHealthPercentage(titan, 'Armor')}
                        titanBodyHealthPercentage={getTitanHealthPercentage(titan, 'Body')}
                        titanArmourHealthValue={getTitanHealth(titan, 'Armor')}
                        titanBodyHealthValue={getTitanHealth(titan, 'Body')}
                    />
                </Skeleton>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                        <Skeleton isLoaded={!!titan} className="rounded-lg">
                            <h3 className="text-md font-medium">
                                {hasActiveConditionals() ? 'Active conditional cards' : 'No active conditional cards'}
                            </h3>
                        </Skeleton>
                    </div>
                    {hasActiveConditionals() ? (
                        <div className="flex flex-row gap-4">
                            {isVictoryMarch() ? <Image src={getImageUrl('VictoryMarch')} width={36} radius="md" /> : null}
                            {isInsanityVoid() ? <Image src={getImageUrl('InsanityVoid')} width={36} radius="md" /> : null}
                            {isSkeletalSmash() ? <Image src={getImageUrl('SkeletalSmash')} width={36} radius="md" /> : null}
                            {isDecayingStrike() ? <Image src={getImageUrl('DecayingStrike')} width={36} radius="md" /> : null}
                        </div>
                    ) : null}
                </div>
            </CardBody>
        </Card>
    );
}
