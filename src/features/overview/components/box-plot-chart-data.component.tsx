import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LogarithmicScale, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import { PlayerData } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BoxPlotController, BoxAndWiskers, LogarithmicScale);

const options: ChartOptions<'boxplot'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            type: 'logarithmic',
        },
    },
};

const mapBoxPlotPlayerData = (playersData: PlayerData[]) => {
    const playerNames = playersData.map(({ player_name }) => player_name);

    const datasets = [
        {
            // label: 'Player damages',
            borderColor: 'rgba(54, 162, 235, 0.2)', //'gray',
            // medianColor: 'blue',
            itemBorderWidth: 0.5,
            borderWidth: 1,
            outlierRadius: 3,
            itemRadius: 3,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', //'#22c55e',
            itemBackgroundColor: 'rgba(54, 162, 235, 0.4)', //'red',
            itemBorderColor: 'rgba(54, 162, 235, 0.8)',
            outlierBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            outlierBorderColor: 'rgba(255, 0, 0, 0.5)',
            // lowerBackgroundColor: 'lightblue',
            // meanBackgroundColor: 'green',
            maxBarThickness: 64,
            // backgroundColor: 'rgba(255,0,0,0.5)',
            // borderColor: 'red',
            // borderWidth: 1,
            // outlierColor: 'green',
            // padding: 10,
            // itemRadius: 0,
            data: playersData.map(({ min_damage, average_damage, max_damage }) => {
                const data = [min_damage, average_damage, max_damage];

                return data;
            }),
        },
    ];

    return {
        labels: playerNames,
        datasets,
    };
};

type BoxPlotChartDataProps = {
    playersData: PlayerData[];
};

export function BoxPlotChartData({ playersData }: BoxPlotChartDataProps) {
    return <Chart type="boxplot" options={options} data={mapBoxPlotPlayerData(playersData)} />;
}
