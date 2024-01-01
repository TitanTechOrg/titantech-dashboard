import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { TitanPart, TitanSequence, TitanSequenceParts } from '../raid-log/types';
import useTitanStore from '@/stores/titansStore';
import RaidTitanData from '@/components/RaidTitanData';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/titans/avatars/${name}.webp`, import.meta.url).href;
}

const titanAvatarSuffix = '_avatar';

export default function TitanState() {
    const { titans, currentTitan } = useTitanStore();

    const [selectedTitan, setSelectedTitan] = useState<TitanSequence>();

    useEffect(() => {
        if (currentTitan) setSelectedTitan(currentTitan);
    }, [currentTitan]);

    const selectTitan = (titanId: string) => {
        setSelectedTitan(titans.find((titan) => titan.id === titanId));
    };

    return (
        <Card className="pb-4">
            <CardHeader className="flex flex-row items-center justify-between mt-0 p-4">
                <h2 className="text-md font-semibold">Titan State</h2>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 justify-between sm:justify-normal flex-wrap">
                    {titans.map((titan) => {
                        return (
                            <div
                                key={titan.id}
                                className={`flex flex-col items-center rounded-md p-1 ${
                                    selectedTitan?.sequence_index === titan.sequence_index ? 'bg-primary/50' : 'bg-default'
                                }`}
                                onClick={() => selectTitan(titan.id)}
                            >
                                <Avatar src={getImageUrl(titan.name + titanAvatarSuffix)} name={titan.name} size="sm" radius="sm" />
                                {titan.sequence_index + 1}
                            </div>
                        );
                    })}
                </div>

                {selectedTitan != null && (
                    <RaidTitanData
                        titan={selectedTitan}
                        showConditionalSection={true}
                        parts={selectedTitan.parts.map(({ name, current_health: value }: TitanSequenceParts) => {
                            const titanPart: TitanPart = { name, value };
                            return titanPart;
                        })}
                    />
                )}
            </CardBody>
        </Card>
    );
}
