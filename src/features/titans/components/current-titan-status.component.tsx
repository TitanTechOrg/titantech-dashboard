import { formatter, percentage } from '@/utils/number-formatter';
import { Card, CardBody, CardHeader, Divider, Image, Progress, Skeleton } from '@nextui-org/react';
import { useBoundStore } from '@/stores/bound.store';
import { TitanSequence } from '..';
import JukkAvatar from '@/assets/titans/avatars/Jukk_avatar.webp';
import KlonkAvatar from '@/assets/titans/avatars/Klonk_avatar.webp';
import LojakAvatar from '@/assets/titans/avatars/Lojak_avatar.webp';
import MohacaAvatar from '@/assets/titans/avatars/Mohaca_avatar.webp';
import PrikerAvatar from '@/assets/titans/avatars/Priker_avatar.webp';
import SterlAvatar from '@/assets/titans/avatars/Sterl_avatar.webp';
import TakedarAvatar from '@/assets/titans/avatars/Takedar_avatar.webp';
import TerroAvatar from '@/assets/titans/avatars/Terro_avatar.webp';
import VictoryMarchCard from '@/assets/cards/VictoryMarch.webp';
import SkeletalSmashCard from '@/assets/cards/SkeletalSmash.webp';
import InsanityVoidCard from '@/assets/cards/InsanityVoid.webp';
import DecayingStrikeCard from '@/assets/cards/DecayingStrike.webp';

const TitanImageMapping = {
    Jukk: JukkAvatar,
    Klonk: KlonkAvatar,
    Lojak: LojakAvatar,
    Mohaca: MohacaAvatar,
    Priker: PrikerAvatar,
    Sterl: SterlAvatar,
    Takedar: TakedarAvatar,
    Terro: TerroAvatar,
};

type TitanImageMappingType = keyof typeof TitanImageMapping;

type CurrentTitanStatusProps = {
    titan?: TitanSequence;
};

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
    const isNegativeArmour = titanArmourHealthValue < 0;
    const isNegativeBody = titanBodyHealthValue < 0;

    if (isNegativeArmour) {
        titanArmourHealthValue = 0;
    }

    if (isNegativeBody) {
        titanBodyHealthValue = 0;
    }

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
                    <div className="flex flex-row items-baseline justify-center gap-2">
                        <span className="text-lg font-semibold">{armourTooltipContent}</span>
                        <span className="text-right text-sm font-light italic">({titanArmourHealthPercentage}%)</span>
                    </div>
                }
                value={titanArmourHealthPercentage}
                size="md"
                color="default"
            />
            <Progress
                className="!gap-1"
                label={<span className="text-sm font-medium">Body</span>}
                showValueLabel={true}
                aria-label="Titan total health..."
                valueLabel={
                    <div className="flex flex-row items-baseline justify-center gap-2">
                        <span className="text-lg font-semibold">{bodyTooltipContent}</span>
                        <span className="text-right text-sm font-light italic">({titanBodyHealthPercentage}%)</span>
                    </div>
                }
                value={titanBodyHealthPercentage}
                size="md"
                color="primary"
            />
        </div>
    );
}

const TitanDebuff = {
    AllArmorHpMult: 'All Armor',
    AllArmsHPMult: 'Arm Health',
    AllHeadHPMult: 'Head Health',
    AllLegsHPMult: 'Leg Health',
    AllLimbsHPMult: 'Limb Health',
    AllTorsoHPMult: 'Torso Health',
    ArmorArmsHPMult: 'Arm Armor',
    ArmorLegsHPMult: 'Leg Armor',
} as const;

type TitanDebuffType = keyof typeof TitanDebuff;

export function CurrentTitanStatus({ titan }: CurrentTitanStatusProps) {
    const { isInsanityVoid, isSkeletalSmash, isDecayingStrike, isVictoryMarch, hasActiveConditionals } = useBoundStore();

    return (
        <Card className="h-full w-full min-w-72 p-2 dark:bg-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Skeleton isLoaded={!!titan} className="rounded-md">
                            {titan && (
                                <Image
                                    src={TitanImageMapping[titan.name as TitanImageMappingType]}
                                    className="flex h-8 w-8 rounded object-cover"
                                    alt="Titan image"
                                />
                            )}
                        </Skeleton>
                    </div>

                    <Skeleton isLoaded={!!titan} className="rounded-md">
                        <h3 className="text-lg font-medium">Current titan</h3>
                    </Skeleton>
                </div>

                <Skeleton isLoaded={!!titan} className="rounded-md">
                    {titan && <div className="text-xl font-bold">{titan.name}</div>}
                </Skeleton>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Divider />
                <div className="flex justify-between space-x-4 text-sm font-medium">
                    <Skeleton isLoaded={!!titan} className="rounded-md">
                        <span>Titan Debuff</span>
                    </Skeleton>
                    <Skeleton isLoaded={!!titan} className="rounded-md">
                        {titan && (
                            <span>
                                {TitanDebuff[titan.area_type as TitanDebuffType]}
                                &nbsp;
                                {titan.area_amount.toString().startsWith('-') ? '' : '+'}
                                {titan.area_amount.toLocaleString('en', { style: 'percent' })}
                            </span>
                        )}
                    </Skeleton>
                </div>
                <Skeleton isLoaded={!!titan} className="rounded-md">
                    {titan && (
                        <TitanHealthBars
                            titanArmourHealthPercentage={getTitanHealthPercentage(titan, 'Armor')}
                            titanBodyHealthPercentage={getTitanHealthPercentage(titan, 'Body')}
                            titanArmourHealthValue={getTitanHealth(titan, 'Armor')}
                            titanBodyHealthValue={getTitanHealth(titan, 'Body')}
                        />
                    )}
                </Skeleton>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                        <Skeleton isLoaded={!!titan} className="rounded-md">
                            <h3 className="text-medium font-medium ">{hasActiveConditionals() ? 'Active conditional cards' : null}</h3>
                        </Skeleton>
                    </div>
                    {hasActiveConditionals() ? (
                        <div className="flex flex-row gap-4">
                            {isVictoryMarch() ? <Image src={VictoryMarchCard} className="h-9 w-9 rounded" /> : null}
                            {isInsanityVoid() ? <Image src={InsanityVoidCard} className="h-9 w-9 rounded" /> : null}
                            {isSkeletalSmash() ? <Image src={SkeletalSmashCard} className="h-9 w-9 rounded" /> : null}
                            {isDecayingStrike() ? <Image src={DecayingStrikeCard} className="h-9 w-9 rounded" /> : null}
                        </div>
                    ) : null}
                </div>
            </CardBody>
        </Card>
    );
}
