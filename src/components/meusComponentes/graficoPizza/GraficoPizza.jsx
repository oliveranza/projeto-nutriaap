import { Chart } from "primereact/chart";
import { Component } from "react";
import { ReactChild } from "react";

export default class GraficoPizza extends Component {
    constructor(props) {
        super(props)
        
        this.chartData = props.data || {
            labels: ['A', 'B', 'C'],
            datasets: [{
                data: [120, 50, 100],
                backgroundColor: [ "#1cff6f","#1cfff4", "#ff383f"],
                hoverBackgroundColor: [ "#81C784","#64B5F6", "#a32227"]
            } ]
        }
        //cor da legenda
        this.lightOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#22b2aa'
                    }
                }
            }
        }

    }

    // dados para o grafico de pizza


    render() {
        return (
            <>
                <label style={{"color": "#22b2aa"}}>
                    {this.props.titulo}
                </label>
                <Chart id="pizza" type="pie" data={this.chartData} options={this.lightOptions} 
                    style="" />
            </>
        )
    }

}