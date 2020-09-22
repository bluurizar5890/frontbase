import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Exportar } from '../../../helpers/Exportar';
class BarBasicChart extends React.Component {
    render() {
        const data = (canvas) => {
            let bar = canvas.getContext('2d');
            let theme_g1 = bar.createLinearGradient(0, 300, 0, 0);
            theme_g1.addColorStop(0, '#4680ff');
            theme_g1.addColorStop(1, '#4680ff');
            let theme_g2 = bar.createLinearGradient(0, 300, 0, 0);
            theme_g2.addColorStop(0, '#0e9e4a');
            theme_g2.addColorStop(1, '#0e9e4a');

            return {
                labels: [0, 1, 2, 3],
                title: "Prueba",
                datasets: [{
                    label: "Data 1",
                    data: [25, 45, 74, 85],
                    borderColor: theme_g1,
                    backgroundColor: theme_g1,
                    hoverBorderColor: theme_g1,
                    hoverBackgroundColor: theme_g1,
                }, {
                    label: "Data 2",
                    data: [30, 52, 65, 65],
                    borderColor: theme_g2,
                    backgroundColor: theme_g2,
                    hoverBorderColor: theme_g2,
                    hoverBackgroundColor: theme_g2,
                }]
            }
        };

        return (
            <>
                <Exportar id={"graficasLineas"} nombre="Grafica de prueba" />
                <Bar id="graficasLineas"
                    data={data}
                    options={{
                        barValueSpacing: 20,
                        title: {
                            display: true,
                            text: 'Titulo de la gráfica',
                            fontSize:24
                        }
                    }}
                />
            </>
        );
    }
}

export default BarBasicChart;