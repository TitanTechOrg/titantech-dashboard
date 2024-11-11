import { findCard, getCardImageUrl } from '@/utils';
import { ChartOptions } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

interface Card {
    skill_name: string;
    level: number;
    quantity_received: number;
    quantity_spent: number;
}

interface CardLevelChartProps {
    cards: Card[];
}

const imgSize: number = 20;

export function RaidCardsLevelChart({ cards }: CardLevelChartProps) {
    const cardData = cards.map((card, index) => {
        const img = new Image(imgSize, imgSize);
        img.src = getCardImageUrl(card.skill_name);
        return {
            x: card.level,
            y: index,
            label: findCard(card.skill_name),
            pointStyle: img || undefined,
        };
    });

    const data = {
        datasets: [
            {
                label: 'Card Levels',
                data: cardData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: imgSize / 2,
                pointHoverRadius: imgSize / 2 + 2,
                pointStyle: cardData.map((item) => item.pointStyle),
            },
        ],
    };

    const options: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Levels',
                },
            },
            y: {
                ticks: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const card = cards[tooltipItem.dataIndex];
                        return `${findCard(card.skill_name)
                            .replace(/([A-Z])/g, ' $1')
                            .trim()}: Level ${card.level}`;
                    },
                },
                displayColors: false,
            },
            title: {
                display: true,
                text: 'Card Level Distribution',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="flex h-96 w-full items-center justify-center">
            <Scatter data={data} options={options} />
        </div>
    );
}
