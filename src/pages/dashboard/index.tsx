import RaidLog from './raid-log';
// import 'chartjs-adapter-date-fns';
// import { nl } from 'date-fns/locale';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { RaidAttack } from './raid-log/types';

// ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend);

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top' as const,
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Bar Chart',
//         },
//     },
// };

// const labels = [
//     '00:00',
//     // '00:30',
//     '01:00',
//     // '01:30',
//     '02:00',
//     // '02:30',
//     '03:00',
//     // '03:30',
//     '04:00',
//     // '04:30',
//     '05:00',
//     // '05:30',
//     '06:00',
//     // '06:30',
//     '07:00',
//     // '07:30',
//     '08:00',
//     // '08:30',
//     '09:00',
//     // '09:30',
//     '10:00',
//     // '10:30',
//     '11:00',
//     // '11:30',
//     '12:00',
//     // '12:30',
//     '13:00',
//     // '13:30',
//     '14:00',
//     // '14:30',
//     '15:00',
//     // '15:30',
//     '16:00',
//     // '16:30',
//     '17:00',
//     // '17:30',
//     '18:00',
//     // '18:30',
//     '19:00',
//     // '19:30',
//     '20:00',
//     // '20:30',
//     '21:00',
//     // '21:30',
//     '22:00',
//     // '22:30',
//     '23:00',
//     // '23:30',
// ];

function Dashboard() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const fetchAttacks = async () => {
        try {
            const response = await axios.get('https://titan-tech-api.silical.dev/api/v1/raid/attacks', {
                headers: { Authorization: token },
            });
            return response.data.attack_logs as RaidAttack[];
        } catch (err) {
            handleError();
            return [];
        }
    };

    const handleError = () => {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your token.',
        });
        navigate('/');
    };

    const postQuery = useQuery({
        queryKey: ['latest_raid_attacks'],
        queryFn: fetchAttacks,
        // onError: handleError,
    });

    // const chartData = {
    //     labels: labels.map((time) => '1970-01-01T' + time), //['2022-01-01', '2022-02-04', '2022-03-11'],
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: (() => {
    //                 const a = postQuery.data?.map((val) => {
    //                     const time = val.occurred_at.split('T')[1].slice(0, 5);
    //                     const datetime = new Date('1970-01-01T' + time);
    //                     // console.log(datetime.getHours());
    //                     return datetime.getHours();
    //                     // return val.occurred_at;
    //                     // const date = new Date(val.occurred_at);
    //                     // return new Date(val.occurred_at).getUTCHours();
    //                 });
    //                 // console.log(a);
    //                 const b = a?.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    //                 // console.log([...b!.values()]);
    //                 return [...b?.values()!];
    //                 // return [3, 6, 7, 9, 2, 1, 4, 5, 6];
    //             })(),
    //             // data: [3, 6, 7, 9, 2, 1, 4, 5, 6],
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //             borderColor: 'black',
    //             // tension: 0.4,
    //         },
    //     ],
    // };

    // const options = {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 unit: 'hour',
    //             },
    //         },
    //         y: {
    //             beginAtZero: true,
    //         },
    //     },
    //     adapters: {
    //         date: {
    //             locale: nl,
    //         },
    //     },
    // };

    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;

    return (
        <div>
            {/* <Bar datatype="bar" options={options} data={chartData} /> */}
            {/* <Line options={options} data={data} /> */}
            {/* <Line options={options} data={chartData} redraw={true} fallbackContent={<h1>Loading chart....</h1>} /> */}
            <RaidLog data={postQuery.data} />
        </div>
    );
}
export default Dashboard;
