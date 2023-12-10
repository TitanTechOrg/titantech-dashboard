import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import React from 'react';
import { PercentageCardsType } from '../raid-log/types';

function MoraleCard({ imageUrl, bonus, usage }: PercentageCardsType) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between mt-0 p-4 pb-2 ">
                <p className="text-sm font-medium">Morale Bonus</p>
                <Image src={imageUrl} className="rounded-lg flex object-cover w-full h-full h-10 w-10" />
            </CardHeader>
            <CardBody>
                <div className="text-2xl font-bold">{bonus}%</div>
                <p className="text-xs text-muted-foreground">{usage} TT this cycle</p>
            </CardBody>
        </Card>
    );
}

export default React.memo(MoraleCard);
