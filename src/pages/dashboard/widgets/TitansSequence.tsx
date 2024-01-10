import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { TitanPart, TitanSequence, TitanSequenceParts } from '../raid-log/types';
import RaidTitanData from '@/components/RaidTitanData';
import { useBoundStore } from '@/stores/useBoundStore';
import { useMediaQueries } from '@react-hook/media-query';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/titans/avatars/${name}.webp`, import.meta.url).href;
}

const titanAvatarSuffix = '_avatar';

export default function TitansSequence() {
    const { matches } = useMediaQueries({
        screen: 'screen',
        width: '(min-width: 1024px)', // tailwindcss 'lg'
    });

    const { titans, currentTitan } = useBoundStore();

    const [selectedTitan, setSelectedTitan] = useState<TitanSequence>();

    useEffect(() => {
        if (currentTitan) setSelectedTitan(currentTitan);
    }, [currentTitan]);

    const selectTitan = (titanId: string) => {
        setSelectedTitan(titans.find((titan) => titan.id === titanId));
    };

    const [selectedOption, setSelectedOption] = React.useState(new Set([currentTitan?.id]));

    return (
        <Card className="dark:bg-neutral-800 p-4 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-md font-semibold">Titan Sequence</h2>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Divider />
                <div className="flex flex-col lg:flex-row gap-4">
                    <span className="inline-block text-medium font-semibold lg:hidden">Select a titan</span>
                    <div className="flex flex-row justify-center flex-wrap lg:flex-nowrap lg:flex-col gap-2 lg:justify-start">
                        <span className="hidden text-medium font-semibold lg:inline-block">Select a titan</span>
                        <div className="flex flex-row justify-center flex-wrap lg:flex-nowrap lg:flex-col gap-2 lg:justify-start border-2 p-2 border-default-400 rounded-lg">
                            {titans.map((titan) =>
                                matches.width ? (
                                    <Button
                                        key={titan.id}
                                        className="p-0 m-0 flex flex-row min-w-24 min-h-fit"
                                        size="lg"
                                        radius="sm"
                                        onPress={() => selectTitan(titan.id)}
                                        color={selectedTitan?.sequence_index === titan.sequence_index ? 'primary' : 'default'}
                                    >
                                        <div className="flex flex-row justify-between items-center w-full gap-2 pl-6">
                                            <span>{titan.sequence_index + 1}</span>
                                            <Image
                                                shadow="sm"
                                                radius="none"
                                                width="100%"
                                                alt={titan.name}
                                                className="object-cover h-12 w-12 rounded-lg"
                                                src={getImageUrl(titan.name + titanAvatarSuffix)}
                                            />
                                        </div>
                                    </Button>
                                ) : (
                                    <Card
                                        shadow="sm"
                                        key={titan.id}
                                        isPressable
                                        onPress={() => selectTitan(titan.id)}
                                        className={`rounded  ${
                                            selectedTitan?.sequence_index === titan.sequence_index ? 'bg-primary' : 'bg-default'
                                        } ${selectedTitan?.sequence_index === titan.sequence_index ? 'text-white' : 'text-inherit'}`}
                                    >
                                        <CardBody className="overflow-visible p-0">
                                            <Image
                                                shadow="sm"
                                                radius="none"
                                                width="100%"
                                                alt={titan.name}
                                                className="object-cover h-10 w-10 rounded-b-lg"
                                                src={getImageUrl(titan.name + titanAvatarSuffix)}
                                            />
                                        </CardBody>
                                        <CardFooter className="flex flex-row text-small justify-center items-end p-0.5">
                                            <span className="font-normal text-medium">{titan.sequence_index + 1}</span>
                                        </CardFooter>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <span className="hidden text-medium font-semibold lg:inline-block">Select a titan</span>
                        <ButtonGroup variant="flat">
                            <Button key={selectedTitan?.id} className="p-0 m-0 flex flex-row min-w-20 min-h-fit" radius="sm">
                                <div className="flex flex-row justify-between items-center w-full gap-2">
                                    <Image
                                        shadow="sm"
                                        radius="sm"
                                        width="100%"
                                        alt={selectedTitan?.name}
                                        className="object-cover h-10 w-10"
                                        src={getImageUrl(selectedTitan?.name + titanAvatarSuffix)}
                                    />
                                    <span>
                                        {selectedTitan?.name} &nbsp;
                                        {selectedTitan?.sequence_index! + 1} / {titans?.length}
                                    </span>
                                </div>
                            </Button>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button isIconOnly>
                                        <ChevronDownIcon />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Titan Sequence options"
                                    selectedKeys={selectedOption}
                                    selectionMode="single"
                                    onSelectionChange={setSelectedOption}
                                    className="max-w-[300px]"
                                >
                                    {titans.map((titan) => (
                                        <DropdownItem key={titan.id}>
                                            <div className="flex flex-row justify-between items-center w-full gap-2">
                                                <Image
                                                    shadow="sm"
                                                    radius="sm"
                                                    width="100%"
                                                    alt={titan.name}
                                                    className="object-cover h-10 w-10"
                                                    src={getImageUrl(titan.name + titanAvatarSuffix)}
                                                />
                                                <span>
                                                    {titan.name} &nbsp;
                                                    {titan.sequence_index! + 1} / {titans?.length}
                                                </span>
                                            </div>
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </ButtonGroup>
                    </div>

                    <div className="flex flex-row items-start mx-auto">
                        <RaidTitanData
                            titan={selectedTitan}
                            parts={selectedTitan?.parts.map(({ name, current_health: value }: TitanSequenceParts) => {
                                const titanPart: TitanPart = { name, value };
                                return titanPart;
                            })}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
