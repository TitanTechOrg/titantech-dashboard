import { Avatar, Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { TitanPart, TitanSequence, TitanSequenceParts } from '../raid-log/types';
import useTitanStore from '@/stores/titansStore';
import RaidTitanData from '@/components/RaidTitanData';
import ConditionalCardsStatus from './ConditionalCardsStatus';

const titanAvatarSuffix = '_avatar';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/titans/avatars/${name}.webp`, import.meta.url).href;
}

type TitanStateDesktopProps = {
    children: React.ReactNode;
};

export default function TitanStateDesktop({ children }: TitanStateDesktopProps) {
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
                <h2 className="text-md font-semibold">Raid info</h2>
            </CardHeader>

            <CardBody className="flex flex-row justify-around">
                <div className="flex flex-col gap-2 justify-between sm:justify-normal flex-wrap">
                    {titans.map((titan) => {
                        return (
                            <div key={titan.id} className={`flex flex-row items-center rounded-md`}>
                                <Button
                                    size="lg"
                                    onPress={() => selectTitan(titan.id)}
                                    color={selectedTitan?.sequence_index === titan.sequence_index ? 'primary' : 'default'}
                                    startContent={<span>{titan.sequence_index + 1}</span>}
                                    endContent={<Avatar src={getImageUrl(titan.name + titanAvatarSuffix)} name={titan.name} size="lg" radius="md" />}
                                />
                            </div>
                        );
                    })}
                </div>

                {selectedTitan != null && (
                    <RaidTitanData
                        titan={selectedTitan}
                        showConditionalSection={false}
                        parts={selectedTitan.parts.map(({ name, current_health: value }: TitanSequenceParts) => {
                            const titanPart: TitanPart = { name, value };
                            return titanPart;
                        })}
                    />
                )}

                <div className="flex flex-col gap-4">
                    {children}
                    <ConditionalCardsStatus titan={selectedTitan} />
                </div>
            </CardBody>
        </Card>
    );
}
