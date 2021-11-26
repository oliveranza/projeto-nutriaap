import React, { Component } from 'react';
import { Chart } from 'primereact/chart';

export default class GraficoBarras extends Component {

    constructor(props) {
        super(props);

        this.data = {
            labels: props.data || ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                tension: .4,
                data: [50, 25, 12, 48, 56, 76, 42]
            },

            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: '#66BB6A',
                data: [21, 84, 24, 75, 37, 65, 34],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: '#FFA726',
                data: [41, 52, 24, 74, 23, 21, 32]
            }]
        };

        this.lightOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

    render() {
        return (
            <>
                <label style={{"color": "#22b2aa"}}>
                    {this.props.titulo}
                </label>
                <Chart type="bar" data={this.data} options={this.lightOptions} />
            </>
        )
    }
}


