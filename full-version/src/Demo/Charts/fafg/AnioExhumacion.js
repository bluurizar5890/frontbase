import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
export const AnioExhumacion = ({dataApi}) => {
    const distintos = (array) => {
        const result = [];
        const miLista = new Map();
        for (const item of array) {
            if (!miLista.has(item)) {
                miLista.set(item, true);    // set any value to Map
                result.push(item);
            }
        }
        var ordenar=(a,b)=>(Number(a)-Number(b))
        return result.sort(ordenar);
    }
    const analisisData = () => {
        const auxData = [];
        dataApi.data.rows.map(({ Osamenta }) => {
            if (Osamenta) {
                if(Osamenta.fechaExhumacion){
                    let anio=Osamenta.fechaExhumacion.split('-')[0];
                    auxData.push(anio);
                }else{
                    auxData.push('No Asignado');    
                }
            } else {
                auxData.push('Sin Asignar Osamenta');
            }
        });

        let colores = ['#4680ff', '#0e9e4a', '#16B4F4', '#05CE63', '#4680ff', '#0e9e4a', '#16B4F4', '#05CE63'];

        let datasetAux = [];
        let contador = 0;
        distintos(auxData).map((item) => {
            let total = auxData.filter(i => i === item).length;
            let fila = {
                label: item,
                data: [total],
                backgroundColor: colores[contador]
            }
            contador++;
            datasetAux.push(fila);
        })
        console.log({ datasetAux });
        return datasetAux;
    }
    const data = (canvas) => {
        return {
            labels: ['-'],
            title: "Prueba",
            datasets: analisisData(),
        }
    };


    return (
            <Bar id="graficasLineas"
                data={data}
                options={{
                    barValueSpacing: 20,
                    title: {
                        display: true,
                        text: 'Osamenta Año de Exhumación',
                        fontSize: 24
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        
    )
}



