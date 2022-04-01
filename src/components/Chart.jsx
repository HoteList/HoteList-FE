import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto' 

function Chart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
            },
            y: {
                ticks: {
                    color: "white",
                },
            }
        }
    }

    return (
        <div className=''>
            <Bar data={data} options={options} />
        </div>
    )
}

export default Chart