import { CHART_GRID_COLOUR } from '@/constants/theme';
import { usePreferencesStore } from '@/stores/preferences.store';
import { formatter } from '@/utils';
import { Chart as ChartJS, ChartOptions, Tooltip, TooltipModel } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { PlayerData } from '../types';

Tooltip.positioners.myCustomPositioner = function (elements, position) {
    if (!elements.length) {
        return false;
    }
    // const tooltip = this;

    let offset = 0;
    //adjust the offset left or right depending on the event position
    if (this.chart.width / 2 > position.x) {
        offset = 60;
    } else {
        offset = -60;
    }
    return {
        x: position.x + offset,
        y: position.y,
    };
};

type ParsedTooltipDatapointTypes = { max: number; mean: number; median: number; min: number; q1: number; q3: number };
type MappedTooltipDatapointTypes = { q0: string; q1: string; q2: string; q3: string; q4: string; range: string; average: string };

const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'rounded text-white opacity-100 pointer-events-none absolute w-44 bg-black/50';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.className = 'm-0';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const constructElement = (title: string, value: string) => {
    const paragraphElement = document.createElement('p');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    paragraphElement.className = 'flex flex-row justify-between gap-8 text-xs font-semibold';

    span1.append(title);
    span2.append(value);

    paragraphElement.appendChild(span1);
    paragraphElement.appendChild(span2);

    return paragraphElement;
};

const externalTooltipHandler = (context: { chart: ChartJS; tooltip: TooltipModel<'boxplot'> }) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    if (tooltip.body) {
        const titleLines = tooltip.title || [];

        const bodyLines = tooltip.dataPoints.map((b: any) => b.parsed);
        const dataPoints: MappedTooltipDatapointTypes[] = bodyLines.map(({ max, mean, median, min, q1, q3 }: ParsedTooltipDatapointTypes) => {
            return {
                q4: formatter().format(Math.trunc(max)),
                q3: formatter().format(Math.trunc(q3)),
                q2: formatter().format(Math.trunc(median)),
                q1: formatter().format(Math.trunc(q1)),
                q0: formatter().format(Math.trunc(min)),
                average: formatter().format(Math.trunc(mean)),
                range: formatter().format(Math.trunc(max - min)),
            };
        });

        const tableHead = document.createElement('thead');

        titleLines.forEach((title: string) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const text = document.createTextNode(title);

            tr.className = 'border-0';
            th.className = 'border-0';

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');

        dataPoints.forEach(({ q4, q3, q2, q1, q0, range, average }: MappedTooltipDatapointTypes) => {
            const div = document.createElement('div');
            const tr = document.createElement('tr');
            const td = document.createElement('td');

            tr.className = 'bg-inherit border-0';
            td.className = 'border-0';

            td.appendChild(div);

            td.appendChild(constructElement('Q4 (MAX)', q4));
            td.appendChild(constructElement('Q3', q3));
            td.appendChild(constructElement('Q2 (MEDIAN)', q2));
            td.appendChild(constructElement('Q1', q1));
            td.appendChild(constructElement('Q0 (MIN)', q0));
            td.appendChild(constructElement('AVERAGE', average));
            td.appendChild(constructElement('DAMAGE RANGE', range));

            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + 'px';
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const mapBoxPlotPlayerData = (playersData: PlayerData[]) => {
    const playerNames = playersData.map(({ player_name }) => player_name);

    const datasets = [
        {
            // label: 'Player damages',
            // borderColor: 'rgba(54, 162, 235, 0.2)', //'gray',
            // medianColor: 'blue',
            itemBorderWidth: 0.5,
            borderWidth: 1,
            outlierRadius: 3,
            itemRadius: 3,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            itemBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            itemBorderColor: 'rgba(54, 162, 235, 0.8)',
            outlierBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            outlierBorderColor: 'rgba(255, 0, 0, 0.5)',
            // lowerBackgroundColor: 'lightblue',
            meanBackgroundColor: 'pink',
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
    const { darkMode: darkModeStorage } = usePreferencesStore();

    const options: ChartOptions<'boxplot'> = {
        responsive: true,
        maintainAspectRatio: false,
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
                external: externalTooltipHandler,
                position: 'myCustomPositioner',
            },
        },
        scales: {
            x: {
                stacked: 'single',
                grid: {
                    color: darkModeStorage ? CHART_GRID_COLOUR.dark : CHART_GRID_COLOUR.light,
                },
            },
            y: {
                type: 'logarithmic',
                stacked: 'single',
                stack: 'y',
                ticks: {
                    callback: (label) => formatter(0, 0).format(Math.trunc(Number(label))),
                },
                grid: {
                    color: darkModeStorage ? CHART_GRID_COLOUR.dark : CHART_GRID_COLOUR.light,
                },
            },
        },
    };

    return (
        <div className="relative h-[512px] w-[1024px] sm:h-72 sm:w-dvw sm:max-w-full">
            <Chart type="boxplot" options={options} data={mapBoxPlotPlayerData(playersData)} />
        </div>
    );
}
