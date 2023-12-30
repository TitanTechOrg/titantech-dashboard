import { percentage } from '@/lib/utils';
import { TitanSequence } from '../raid-log/types';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

type ConditionalCardsStatusProps = {
    titan?: TitanSequence;
};

function getImageUrl(name: string): string {
    return new URL(`../../../assets/cards/${name}.webp`, import.meta.url).href;
}

export default function ConditionalCardsStatus({ titan }: ConditionalCardsStatusProps) {
    if (!titan) return null;

    const markedParts = titan.parts.filter((part) => part.target);
    const markedArmouredParts = markedParts.filter((part) => part.name.includes('Armor'));
    const markedBodyParts = markedParts.filter((part) => part.name.includes('Body'));

    const isInsanityVoid = () => {
        const isAllArmouredPartsBroken = markedArmouredParts.every((part) => part.current_health <= 0);

        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);
        const isMoreThanHalfPartsBroken = brokenBodyParts.length <= markedBodyParts.length / 2;

        return isMoreThanHalfPartsBroken && isAllArmouredPartsBroken;
    };

    const isVictoryMarch = () => {
        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);
        const isAllButOneBodyPartsBroken = brokenBodyParts.length === markedBodyParts.length - 1;

        return isAllButOneBodyPartsBroken;
    };

    const isDecayingStrike = () => {
        const hasAtLeastOnePartUnder30Percent = markedParts.some((part) => {
            const remainingHealthPercentage = percentage(part.health, part.current_health);
            return part.current_health > 0 && remainingHealthPercentage <= 30;
        });

        return hasAtLeastOnePartUnder30Percent;
    };

    const isSkeletalSmash = () => {
        const hasAtLeastOneSkeletonPart = markedBodyParts.some((part) => part.current_health <= 0);
        const hasAtLeastOneRemainingArmouredPart = markedArmouredParts.some((part) => part.current_health > 0);

        return hasAtLeastOneSkeletonPart && hasAtLeastOneRemainingArmouredPart;
    };

    const hasActiveConditionals: boolean = [isVictoryMarch(), isInsanityVoid(), isSkeletalSmash(), isDecayingStrike()].some(Boolean);

    if (!hasActiveConditionals) return null;

    return (
        <Card className="dark:bg-default">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <h3 className="text-md font-medium">Active conditional cards</h3>
            </CardHeader>
            <CardBody className="pt-0 flex flex-row gap-1">
                {isVictoryMarch() ? <Image src={getImageUrl('VictoryMarch')} width={36} radius="md" /> : null}
                {isInsanityVoid() ? <Image src={getImageUrl('InsanityVoid')} width={36} radius="md" /> : null}
                {isSkeletalSmash() ? <Image src={getImageUrl('SkeletalSmash')} width={36} radius="md" /> : null}
                {isDecayingStrike() ? <Image src={getImageUrl('DecayingStrike')} width={36} radius="md" /> : null}
            </CardBody>
        </Card>
    );
}
