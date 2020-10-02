import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Exportar } from '../../../helpers/Exportar';

export const EstadoCoincidencia = ({dataApi}) => {
    const distintos = (array) => {
        const result = [];
        const miLista = new Map();
        for (const item of array) {
            if (!miLista.has(item)) {
                miLista.set(item, true);    // set any value to Map
                result.push(item);
            }
        }
        return result;
    }
    const analisisData = () => {
        const estadoCoincidenciaPerfilAux = [];
        dataApi.data.rows.map(({ EstadoCoincidencia }) => {
            if (EstadoCoincidencia) {
                estadoCoincidenciaPerfilAux.push(EstadoCoincidencia.descripcion);
            } else {
                estadoCoincidenciaPerfilAux.push('No Asignado');
            }
        });

        let colores = ['#4680ff', '#0e9e4a', '#16B4F4', '#05CE63', '#4680ff', '#0e9e4a', '#16B4F4', '#05CE63'];

        let datasetAux = [];
        let contador = 0;
        distintos(estadoCoincidenciaPerfilAux).map((item) => {
            let total = estadoCoincidenciaPerfilAux.filter(i => i === item).length;
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
    /*
    [{
                label: "Data 1",
                data: [25],
                backgroundColor: '#4680ff'
            },
            {
                label: "Data 1",
                data: [200],
                backgroundColor: '#0e9e4a'
            },
            {
                label: "Data 1",
                data: [250],
                backgroundColor: '#16B4F4'
            },
            {
                label: "Data 1",
                data: [150],
                backgroundColor: '#05CE63'
            }]
    */
    const data = (canvas) => {
        let bar = canvas.getContext('2d');
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
                        text: 'Estado de Coincidencia',
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



