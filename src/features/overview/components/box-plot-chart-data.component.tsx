import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LogarithmicScale, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import { PlayerData } from '../types';
import { formatter } from '@/utils/number-formatter';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BoxPlotController, BoxAndWiskers, LogarithmicScale);

//register custome positioner
Tooltip.positioners.myCustomPositioner = function (elements, position) {
    if (!elements.length) {
        return false;
    }
    // const tooltip = this;

    let offset = 0;
    //adjust the offset left or right depending on the event position
    if (this.chart.width / 2 > position.x) {
        offset = 20;
    } else {
        offset = -20;
    }
    return {
        x: position.x + offset,
        y: position.y,
    };
};

const getOrCreateTooltip = (chart: any) => {
    console.log(chart);
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const formatNumbers = (val: string) => {
    const trimAndRemoveDecimals = val
        .trim()
        .replace(/[\. ]+/g, '')
        .replace(/\,.*/, '');

    const convertToNumber = Number(trimAndRemoveDecimals);
    const formatted = formatter().format(convertToNumber);

    return formatted;
};

const constructElement = (title: string, value: string) => {
    const paragraphElement = document.createElement('p');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    paragraphElement.className = 'flex flex-row items-center justify-between gap-8 text-xs font-semibold';

    span1.append(title);
    span2.append(value);

    paragraphElement.appendChild(span1);
    paragraphElement.appendChild(span2);

    return paragraphElement;
};

const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title: string) => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = '0';

            const th = document.createElement('th');
            th.style.borderWidth = '0';
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');

        bodyLines.forEach((body: string, i: number) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'col';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = '0';

            const td = document.createElement('td');
            td.style.borderWidth = '0';

            let text = document.createTextNode(body);

            let textData = text.data;
            textData = textData.replace(/([()])/g, '');
            let splitData = textData.split(/, \s*/); // split by , followed by whitespace, eg. ', '

            const [min, quantile1, median, mean, quantile2, max] = splitData;
            const splitMin = min.split(':')[1];
            const splitMax = max.split(':')[1];
            const splitMedian = median.split(':')[1];
            const splitMean = mean.split(':')[1];
            const splitQuantile1 = quantile1.split(':')[1];
            const splitQuantile2 = quantile2.split(':')[1];

            const damageRange = Number(splitMax.replace(/[\. ]+/g, '')) - Number(splitMin.replace(/[\. ]+/g, ''));

            td.appendChild(div);

            td.appendChild(constructElement('Q4 (MAX)', formatNumbers(splitMax)));
            td.appendChild(constructElement('Q3', formatNumbers(splitQuantile2)));
            td.appendChild(constructElement('Q2 (MEDIAN)', formatNumbers(splitMedian)));
            td.appendChild(constructElement('Q1', formatNumbers(splitQuantile1)));
            td.appendChild(constructElement('Q0 (MIN)', formatNumbers(splitMin)));
            td.appendChild(constructElement('AVERAGE', formatNumbers(splitMean)));
            td.appendChild(constructElement('DAMAGE RANGE', formatNumbers(damageRange.toString())));

            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    // tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.top = positionY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const options: ChartOptions<'boxplot'> = {
    responsive: true,
    maintainAspectRatio: false,
    // minStats: 'min',
    // maxStats: 'max',
    interaction: {
        mode: 'index',
        intersect: false,
    },

    plugins: {
        legend: {
            display: false,
        },

        tooltip: {
            enabled: false,
            // position: 'nearest',
            external: externalTooltipHandler,
            // yAlign: 'bottom',
            position: 'myCustomPositioner',
        },
        // tooltip: {
        //     callbacks: {
        //         label: function (tooltipItem) {
        //             const { min, max, mean, median, q1, q3 } = tooltipItem.parsed;

        //             // const range = max - min;
        //             // const interQuartileRange = q3 - q1;

        //             // return [
        //             //     `min: ${formatter().format(min)}`,
        //             //     `q1: ${formatter().format(q1)}`,
        //             //     `median: ${formatter().format(median)}`,
        //             //     `mean: ${formatter().format(mean)}`,
        //             //     `q3: ${formatter().format(q3)}`,
        //             //     `max: ${formatter().format(max)}`,
        //             //     `range: ${formatter().format(range)}`,
        //             //     `IQR: ${formatter().format(interQuartileRange)}`,
        //             // ];

        //             return [
        //                 `Q4 (MAX): ${formatter().format(max)}`,
        //                 `Q3: ${formatter().format(q3)}`,
        //                 `Q2 (MEDIAN): ${formatter().format(median)}`,
        //                 `MEAN: ${formatter().format(mean)}`,
        //                 `Q1: ${formatter().format(q1)}`,
        //                 `Q0 (MIN): ${formatter().format(min)}`,
        //             ];
        //         },
        //     },
        // },
    },
    scales: {
        x: {
            stacked: 'single',
            // stacked: true,
        },
        y: {
            type: 'logarithmic',
            stacked: 'single',
            stack: 'y',
            // stacked: true,
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
    return (
        <div className="chart-container relative h-[512px] w-[1024px] sm:h-72 sm:w-dvw sm:max-w-full">
            <Chart type="boxplot" options={options} data={mapBoxPlotPlayerData(playersData)} />
        </div>
    );
}
