import { formatter } from '@/utils/number-formatter';
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { DamageCardData } from '..';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length && payload.length > 1) {
        if (
            typeof payload[0].name === 'string' &&
            typeof payload[0].value === 'number' &&
            typeof payload[1].name === 'string' &&
            typeof payload[1].value === 'number'
        ) {
            return (
                <div className="rounded-lg bg-default-200/90 p-2">
                    <p className="text-base font-semibold">{`Round ${label}`}</p>
                    <Divider className="my-1" />
                    <p className="text-sm font-medium capitalize">{`${payload[0].name} — ${formatter().format(payload[0].value)}`}</p>
                    <p className="text-sm font-medium capitalize">{`${payload[1].name} — ${formatter().format(payload[1].value)}`}</p>
                </div>
            );
        }

        return null;
    }

    return null;
};

type PreviousValueProps = {
    index: number;
    listLength: number;
    value: string;
};

type DamageData = {
    items: string[];
};

function CardPreviousValue({ index, listLength, value }: PreviousValueProps) {
    const showArrow: boolean = index !== listLength - 1;
    return (
        <span className="flex flex-row items-center justify-center gap-1 text-sm font-bold text-neutral-600/70 dark:text-neutral-50/70">
            {value}
            {showArrow ? <ArrowRightIcon /> : null}
        </span>
    );
}

function CardValues({ items }: DamageData) {
    if (items && !items?.length && items?.length === 0) return null;

    return (
        <div className="flex flex-row flex-wrap gap-x-2">
            {items?.map((value: string, index: number) => (
                <CardPreviousValue key={`${index}_morale-bonus_${value}`} index={index} value={value} listLength={items.length} />
            ))}
        </div>
    );
}

export function RaidDamageInfo({ imageUrl, title, data }: DamageCardData) {
    let overallRaidDamage = 0;

    if (data.length > 1) {
        const { overall } = data[data.length - 2];
        overallRaidDamage = overall;
    }

    return (
        <Card className="h-full w-full min-w-72 px-2 dark:bg-neutral-800">
            <CardHeader className="flex flex-row items-start justify-between gap-4 py-4">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Image src={imageUrl} className="h-8 w-8 rounded object-cover" />
                    </div>
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <div className="text-xl font-bold">{formatter().format(overallRaidDamage)}</div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Divider />

                <CardValues items={data.map((val) => formatter().format(val.average))} />

                {data && data.length > 0 ? (
                    <div className="h-40">
                        <ResponsiveContainer>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <Legend />
                                <XAxis dataKey="name" id="rechartsXFillColor" />
                                <YAxis
                                    id="rechartsYFillColor"
                                    tickFormatter={(value) => formatter().format(value)}
                                    type="number"
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={3} />
                                <Line type="monotone" dataKey="overall" stroke="#82ca9d" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div>No chart data</div>
                )}
            </CardBody>
        </Card>
    );
}
