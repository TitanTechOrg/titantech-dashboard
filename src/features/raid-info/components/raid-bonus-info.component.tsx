import { Accordion, AccordionItem, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { PercentageCardsType } from '..';

type MoraleValuesProps = Pick<PercentageCardsType, 'bonus'>;

type MoralePreviousValueProps = {
    index: number;
    listLength: number;
    value: string;
};

function CardPreviousValue({ index, listLength, value }: MoralePreviousValueProps) {
    const showArrow: boolean = index !== listLength - 1;
    return (
        <span className="flex flex-row justify-center items-center gap-1 text-sm font-bold text-neutral-600/70 dark:text-neutral-50/70">
            {value}
            {showArrow ? <ArrowRightIcon /> : null}
        </span>
    );
}

function CardValues({ bonus }: MoraleValuesProps) {
    return (
        <div className="flex flex-row flex-wrap gap-x-2">
            {bonus?.map((value: string, index: number) => (
                <CardPreviousValue key={`${index}_morale-bonus_${value}`} index={index} value={value} listLength={bonus.length} />
            ))}
        </div>
    );
}

type CardBonusDataProps = {
    data: PercentageCardsType[];
};

export function CardBonusData({ data }: CardBonusDataProps) {
    return (
        <Card className="dark:bg-neutral-800 min-w-72 w-full h-full">
            <Accordion>
                {data?.map(({ title, imageUrl, bonus }: PercentageCardsType) => {
                    const latestBonus: string = bonus[bonus.length - 1] ?? 0;
                    return (
                        <AccordionItem
                            key={title}
                            aria-label={`Accordion for displaying ${title} Info. Tap to open/close.`}
                            title={
                                <CardHeader className="flex flex-row items-center justify-between gap-4">
                                    <div className="flex flex-row items-center justify-start gap-4">
                                        <div className="min-w-fit">
                                            <Image src={imageUrl} className="rounded object-cover h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-medium">{title}</h3>
                                    </div>
                                    <div className="text-xl font-bold">
                                        {latestBonus}
                                        <span className="text-xs font-semibold">&nbsp;%</span>
                                    </div>
                                </CardHeader>
                            }
                        >
                            <CardBody className="pt-0">
                                <CardValues bonus={bonus} />
                            </CardBody>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </Card>
    );
}
