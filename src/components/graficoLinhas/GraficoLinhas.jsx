import { Chart } from "primereact/chart";
import { Component } from "react";

export default class GraficoLinhas extends Component {
    constructor(props) {
        super(props)
        this.data = props.data || {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Linha Vermelha',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#ff383f',
                    tension: .4
                },
                {
                    label: 'Linha Verde',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#1cff6f',
                    tension: .4
                }
            ]
        }
    }



    render() {
        return (
            <>
                <label style={{"color":"#22b2aa"}}>
                    {this.props.titulo}
                </label>
                <Chart type="line" data={this.data} options="" />
            </>
        )
    }



}