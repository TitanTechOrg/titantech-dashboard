import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { PercentageCardsType } from '../raid-log/types';
import React from 'react';

function MirrorForceCard({ imageUrl, usage }: PercentageCardsType) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between mt-0 p-4 pb-2 ">
                <p className="text-sm font-medium">Mirror Force Bonus</p>
                <Image src={imageUrl} className="rounded-lg flex object-cover w-full h-full h-10 w-10" />
            </CardHeader>
            <CardBody>
                <div className="text-2xl font-bold">{usage}%</div>
                <p className="text-xs text-muted-foreground">{usage} MF used this cycle</p>
            </CardBody>
        </Card>
    );
}

export default React.memo(MirrorForceCard);
