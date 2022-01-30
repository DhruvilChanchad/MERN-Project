import React , { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import "./chart.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Online Project Management Bar Chart',
        },
    },
};

const Barchart = () => {

    const [data, setdata] = useState({
        labels : ['Finance' , 'HR' , 'Maintenance' , 'Quality' , 'Stores' , 'Stratergy'],
        datasets:[
            {
                label: 'Dataset 1',
                data:[1,2,3,4,5,6],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data:[1,2,3,4,5,6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })

    useEffect(() => {
        const fetchData= async()=> {
            const url = 'http://localhost:9002/chartdata'

            const labelset = [];
            const dataset1 = [];
            const dataset2 = [];

            await fetch(url).then((data) => {
                const res = data.json();
                return res
            }).then((res) => {
                console.log(res)
                for(const val of res){
                    dataset1.push(val.Registered[0].Registered);
                    dataset1.push(val.Registered[1].Registered);
                    dataset1.push(val.Registered[2].Registered);
                    dataset1.push(val.Registered[3].Registered);
                    dataset1.push(val.Registered[4].Registered);
                    dataset1.push(val.Registered[5].Registered);

                    dataset2.push(val.Completed[0].Completed);
                    dataset2.push(val.Completed[1].Completed);
                    dataset2.push(val.Completed[2].Completed);
                    dataset2.push(val.Completed[3].Completed);
                    dataset2.push(val.Completed[4].Completed);
                    dataset2.push(val.Completed[5].Completed);

                    labelset.push(val.Registered[0]._id)
                    labelset.push(val.Registered[1]._id)
                    labelset.push(val.Registered[2]._id)
                    labelset.push(val.Registered[3]._id)
                    labelset.push(val.Registered[4]._id)
                    labelset.push(val.Registered[5]._id)
                }
                setdata({
                    labels : labelset,
                    datasets:[
                        {
                            label: 'Total Project Registered',
                            data:dataset1,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Total Projects Closed',
                            data:dataset2,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                })

                console.log(dataset1);
                console.log(dataset2);
                console.log(labelset);
            }).catch(e => {
                console.log("Error",e)
            })
        }

        fetchData();
    },[])
  return (
    <div className="chart">
        <h1 className="chartTitle">Project Plan Vs Actual</h1>
        <h3 className="chartTitle">Registration</h3>
        <Bar data={data} options={options} />
    </div>
  )
};

export default Barchart;
