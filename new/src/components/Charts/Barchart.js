import React from 'react';
import { Calendar, Download } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'
import { saveAs } from 'file-saver';


const ChartjsBarChart = ({ labels, dataset, name, id }) => {
    const saveCanvas = () => {
        //save to png
        const canvasSave = document.getElementById('stackD3');
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "chart.png")
        })
    }

    const options = {
        elements: {
            rectangle: {
                borderWidth: 2,
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            display: false
        },
        tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            backgroundColor: '#fff',
            titleFontColor: '#000',
            bodyFontColor: '#000'
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)',
                        zeroLineColor: 'rgba(200, 200, 200, 0.2)'
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        fontColor: '#6e6b7b'
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0.2)',
                        zeroLineColor: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        stepSize: 10,
                        min: 0,
                        max: 50,
                        fontColor: '#6e6b7b'
                    }
                }
            ]
        }
    },
        data = {
            labels: labels,
            datasets: [
                {
                    data: dataset,
                    backgroundColor: '#28dac6',
                    borderColor: 'transparent',
                    barThickness: 30
                }
            ]
        }

    return (
        <Card>
            <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column bar-chart'>
                <CardTitle className='bar-title' tag='h4'>{name}</CardTitle>
                <div className='d-flex align-items-center'>
                    <Button className='btn-icon' outline color='primary' onClick={saveCanvas} >
                        <Download size={16} />
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div style={{ height: '400px' }}>
                    <Bar id="stackD3" data={data} options={options} height={400} />
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartjsBarChart
