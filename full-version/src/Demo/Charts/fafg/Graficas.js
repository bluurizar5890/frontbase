import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Exportar } from '../../../helpers/Exportar';
import Aux from "../../../hoc/_Aux/index";
import { Row, Col, Card } from 'react-bootstrap';
const Graficas = () => {
    const [calidadPerfil, setCalidadPerfil] = useState([]);

    const analisisData = () => {
        const calidadPerfilAux = [];
        dataApi.data.rows.map(({ EstadoCoincidencia:{descripcion} }) => {
            calidadPerfilAux.push(descripcion);
        });

        let colores=['#4680ff','#0e9e4a','#16B4F4','#05CE63','#4680ff','#0e9e4a','#16B4F4','#05CE63'];

        

        console.log(calidadPerfilAux);
        // let unicos=calidadPerfilAux.unique();
        // console.log({unicos});
        
            const result = [];
            const map = new Map();
            for (const item of calidadPerfilAux) {
            if(!map.has(item)){
            map.set(item, true);    // set any value to Map
            result.push(item);
            }
            }

            console.log(result);

    }
    const data = (canvas) => {
        let bar = canvas.getContext('2d');
        analisisData();
        return {
            labels: ['-'],
            title: "Prueba",
            datasets: [{
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
        }
    };


    return (

        <Aux>
            <Row>
                <Col xl={6} md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Exportar id={"graficasLineas"} nombre="Grafica de prueba" />
                            <Bar id="graficasLineas"
                                data={data}
                                options={{
                                    barValueSpacing: 20,
                                    title: {
                                        display: true,
                                        text: 'Titulo de la gráfica',
                                        fontSize: 24
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>

    )
}

export default Graficas;


const dataApi = {
    "error": false,
    "codigo": 202,
    "data": {
        "count": 29,
        "rows": [
            {
                "coincidenciaId": 1,
                "fechaCoincidencia": "2020-09-17T00:00:00.000Z",
                "osamentaId": 1,
                "victimaId": 1,
                "baseInfoId": 1,
                "programaIdentId": 1,
                "lr": "5.00e+0",
                "apriori": "marco",
                "posterior": "si",
                "estadoCoincidenciaId": 3,
                "fechaNotificacionDid": "2020-09-17T00:00:00.000Z",
                "fechaConfExc": "2020-09-17T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 1,
                "tipoCasoDidId": 1,
                "tipoContextoId": null,
                "marcadoresStr": 12,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-17T07:53:46.000Z",
                "usuarioIngresoId": 6,
                "Osamenta": {
                    "casoId": 1848,
                    "fosaDet": "XLL",
                    "osamentaDet": "50",
                    "sexoAdnId": null,
                    "locisAlelosUtiles": 0,
                    "SexoAdn": null
                },
                "Victima": {
                    "codigoVictima": "2961-V02",
                    "nombreVictima": "Carlos Quex"
                },
                "DonanteCoincidencia": [
                    {
                        "donanteCoincidenciaId": 1,
                        "donanteId": 2,
                        "cantidadDonantes": 4,
                        "Donante": {
                            "descripcion": "Padre"
                        }
                    },
                    {
                        "donanteCoincidenciaId": 2,
                        "donanteId": 3,
                        "cantidadDonantes": 1,
                        "Donante": {
                            "descripcion": "Madre"
                        }
                    }
                ],
                "BaseInfo": {
                    "baseInfoId": 1,
                    "descripcion": "Achi"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 3,
                    "descripcion": "Excluida"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 1,
                    "descripcion": "SI"
                },
                "TipoContexto": null,
                "TipoCasoDid": {
                    "tipoCasoDidId": 1,
                    "descripcion": "Muerte Idirecta"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 6,
                    "usuario": "marco.garcia"
                }
            },
            {
                "coincidenciaId": 2,
                "fechaCoincidencia": "2020-09-18T00:00:00.000Z",
                "osamentaId": 1,
                "victimaId": 1,
                "baseInfoId": 3,
                "programaIdentId": 2,
                "lr": "5.60e+8",
                "apriori": "",
                "posterior": "",
                "estadoCoincidenciaId": 1,
                "fechaNotificacionDid": "2020-09-18T00:00:00.000Z",
                "fechaConfExc": "2020-09-18T00:00:00.000Z",
                "estadoInvestigacionId": 2,
                "cromosomaYId": 2,
                "tipoCasoDidId": null,
                "tipoContextoId": null,
                "marcadoresStr": 14,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-18T22:57:41.000Z",
                "usuarioIngresoId": 2,
                "Osamenta": {
                    "casoId": 1848,
                    "fosaDet": "XLL",
                    "osamentaDet": "50",
                    "sexoAdnId": null,
                    "locisAlelosUtiles": 0,
                    "SexoAdn": null
                },
                "Victima": {
                    "codigoVictima": "2961-V02",
                    "nombreVictima": "Carlos Quex"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 3,
                    "descripcion": "Poqomchi"
                },
                "ProgramaIdent": {
                    "programaIdentId": 2,
                    "descripcion": "DNA-VIEW"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 1,
                    "descripcion": "Notificada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 2,
                    "descripcion": "Seguimiento"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": null,
                "TipoCasoDid": null,
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 2,
                    "usuario": "bertoni.giron"
                }
            },
            {
                "coincidenciaId": 3,
                "fechaCoincidencia": "2020-09-21T00:00:00.000Z",
                "osamentaId": 2,
                "victimaId": 2,
                "baseInfoId": 2,
                "programaIdentId": 1,
                "lr": "7.00e+0",
                "apriori": "1/487",
                "posterior": "99.99999%",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-09-21T00:00:00.000Z",
                "fechaConfExc": "2020-09-21T00:00:00.000Z",
                "estadoInvestigacionId": 2,
                "cromosomaYId": 2,
                "tipoCasoDidId": 2,
                "tipoContextoId": 3,
                "marcadoresStr": 14,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-21T20:44:07.000Z",
                "usuarioIngresoId": 2,
                "Osamenta": {
                    "casoId": 0,
                    "fosaDet": "IV",
                    "osamentaDet": "17",
                    "sexoAdnId": null,
                    "locisAlelosUtiles": 10,
                    "SexoAdn": null
                },
                "Victima": {
                    "codigoVictima": "FAFG 1899-001-V01",
                    "nombreVictima": "JENNIFER SANCHEZ"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 2,
                    "descripcion": "Mestizo"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 2,
                    "descripcion": "Seguimiento"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 3,
                    "descripcion": "Desaparicion"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 2,
                    "descripcion": "Desaparicion"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 2,
                    "usuario": "bertoni.giron"
                }
            },
            {
                "coincidenciaId": 4,
                "fechaCoincidencia": "2020-09-21T00:00:00.000Z",
                "osamentaId": 3,
                "victimaId": 3,
                "baseInfoId": 3,
                "programaIdentId": 1,
                "lr": "8.00e+0",
                "apriori": "1/400",
                "posterior": "99.9999%",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-09-21T00:00:00.000Z",
                "fechaConfExc": "2020-09-21T00:00:00.000Z",
                "estadoInvestigacionId": 2,
                "cromosomaYId": 2,
                "tipoCasoDidId": 4,
                "tipoContextoId": 1,
                "marcadoresStr": 13,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-21T21:48:00.000Z",
                "usuarioIngresoId": 2,
                "Osamenta": {
                    "casoId": 0,
                    "fosaDet": "XXX",
                    "osamentaDet": "7",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 13,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG FD-1985",
                    "nombreVictima": "Diego Augusto Ralon"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 3,
                    "descripcion": "Poqomchi"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 2,
                    "descripcion": "Seguimiento"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 1,
                    "descripcion": "Abierto"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 4,
                    "descripcion": "Ejecucion Arbitraria"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 2,
                    "usuario": "bertoni.giron"
                }
            },
            {
                "coincidenciaId": 5,
                "fechaCoincidencia": "2020-09-22T00:00:00.000Z",
                "osamentaId": 2,
                "victimaId": 2,
                "baseInfoId": 3,
                "programaIdentId": 2,
                "lr": "2.00e+0",
                "apriori": "",
                "posterior": "",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-09-22T00:00:00.000Z",
                "fechaConfExc": "2020-09-22T00:00:00.000Z",
                "estadoInvestigacionId": 2,
                "cromosomaYId": 2,
                "tipoCasoDidId": 2,
                "tipoContextoId": 3,
                "marcadoresStr": 5,
                "calidadPerfilId": 2,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-22T13:27:01.000Z",
                "usuarioIngresoId": 2,
                "Osamenta": {
                    "casoId": 0,
                    "fosaDet": "IV",
                    "osamentaDet": "17",
                    "sexoAdnId": null,
                    "locisAlelosUtiles": 10,
                    "SexoAdn": null
                },
                "Victima": {
                    "codigoVictima": "FAFG 1899-001-V01",
                    "nombreVictima": "JENNIFER SANCHEZ"
                },
                "DonanteCoincidencia": [
                    {
                        "donanteCoincidenciaId": 12,
                        "donanteId": 2,
                        "cantidadDonantes": 1,
                        "Donante": {
                            "descripcion": "Padre"
                        }
                    }
                ],
                "BaseInfo": {
                    "baseInfoId": 3,
                    "descripcion": "Poqomchi"
                },
                "ProgramaIdent": {
                    "programaIdentId": 2,
                    "descripcion": "DNA-VIEW"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 2,
                    "descripcion": "Seguimiento"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 3,
                    "descripcion": "Desaparicion"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 2,
                    "descripcion": "Desaparicion"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 2,
                    "descripcion": "Perfil Completo"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 2,
                    "usuario": "bertoni.giron"
                }
            },
            {
                "coincidenciaId": 6,
                "fechaCoincidencia": "2020-07-22T00:00:00.000Z",
                "osamentaId": 4,
                "victimaId": 4,
                "baseInfoId": 1,
                "programaIdentId": 1,
                "lr": "1.00e+0",
                "apriori": "",
                "posterior": "",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-07-24T00:00:00.000Z",
                "fechaConfExc": "2020-08-21T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 2,
                "tipoCasoDidId": 2,
                "tipoContextoId": 3,
                "marcadoresStr": 12,
                "calidadPerfilId": 2,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-22T23:18:53.000Z",
                "usuarioIngresoId": 4,
                "Osamenta": {
                    "casoId": 1842,
                    "fosaDet": "I",
                    "osamentaDet": "P1",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 12,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG 1842-001-V01",
                    "nombreVictima": "JESUS SARPEC TOJ"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 1,
                    "descripcion": "Achi"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 3,
                    "descripcion": "Desaparicion"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 2,
                    "descripcion": "Desaparicion"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 2,
                    "descripcion": "Perfil Completo"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 4,
                    "usuario": "carolina.castillo"
                }
            },
            {
                "coincidenciaId": 7,
                "fechaCoincidencia": "2020-07-22T00:00:00.000Z",
                "osamentaId": 6,
                "victimaId": 5,
                "baseInfoId": 5,
                "programaIdentId": 1,
                "lr": "9.00e+0",
                "apriori": "1/3840",
                "posterior": ">99.999999%",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-09-22T00:00:00.000Z",
                "fechaConfExc": "2020-09-22T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 2,
                "tipoCasoDidId": 2,
                "tipoContextoId": 3,
                "marcadoresStr": 16,
                "calidadPerfilId": 2,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-22T23:44:29.000Z",
                "usuarioIngresoId": 4,
                "Osamenta": {
                    "casoId": 1878,
                    "fosaDet": "I",
                    "osamentaDet": "1",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 24,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG FD-3200-V01",
                    "nombreVictima": "ALBERTO TACEN BAR"
                },
                "DonanteCoincidencia": [
                    {
                        "donanteCoincidenciaId": 4,
                        "donanteId": 2,
                        "cantidadDonantes": 1,
                        "Donante": {
                            "descripcion": "Padre"
                        }
                    },
                    {
                        "donanteCoincidenciaId": 5,
                        "donanteId": 3,
                        "cantidadDonantes": 1,
                        "Donante": {
                            "descripcion": "Madre"
                        }
                    },
                    {
                        "donanteCoincidenciaId": 6,
                        "donanteId": 7,
                        "cantidadDonantes": 2,
                        "Donante": {
                            "descripcion": "Hermana"
                        }
                    }
                ],
                "BaseInfo": {
                    "baseInfoId": 5,
                    "descripcion": "Kaqchikel"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 3,
                    "descripcion": "Desaparicion"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 2,
                    "descripcion": "Desaparicion"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 2,
                    "descripcion": "Perfil Completo"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 4,
                    "usuario": "carolina.castillo"
                }
            },
            {
                "coincidenciaId": 8,
                "fechaCoincidencia": "2020-09-23T00:00:00.000Z",
                "osamentaId": 5,
                "victimaId": 2,
                "baseInfoId": 2,
                "programaIdentId": 1,
                "lr": "5.80e+5",
                "apriori": "",
                "posterior": "",
                "estadoCoincidenciaId": 3,
                "fechaNotificacionDid": "2020-09-23T00:00:00.000Z",
                "fechaConfExc": "2020-09-23T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 1,
                "tipoCasoDidId": null,
                "tipoContextoId": null,
                "marcadoresStr": 2,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-23T07:17:57.000Z",
                "usuarioIngresoId": 1,
                "Osamenta": {
                    "casoId": 1878,
                    "fosaDet": "I",
                    "osamentaDet": "1",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 24,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG 1899-001-V01",
                    "nombreVictima": "JENNIFER SANCHEZ"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 2,
                    "descripcion": "Mestizo"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 3,
                    "descripcion": "Excluida"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 1,
                    "descripcion": "SI"
                },
                "TipoContexto": null,
                "TipoCasoDid": null,
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 1,
                    "usuario": "administrador"
                }
            },
            {
                "coincidenciaId": 9,
                "fechaCoincidencia": "2020-09-23T00:00:00.000Z",
                "osamentaId": 7,
                "victimaId": 6,
                "baseInfoId": 4,
                "programaIdentId": 1,
                "lr": "6.49e+11",
                "apriori": "1/47829",
                "posterior": "1/23",
                "estadoCoincidenciaId": 5,
                "fechaNotificacionDid": "2020-09-23T00:00:00.000Z",
                "fechaConfExc": "2020-09-23T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 2,
                "tipoCasoDidId": null,
                "tipoContextoId": 2,
                "marcadoresStr": 14,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-23T15:44:50.000Z",
                "usuarioIngresoId": 5,
                "Osamenta": {
                    "casoId": 0,
                    "fosaDet": "III",
                    "osamentaDet": "12",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 0,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG-2005-040-V03",
                    "nombreVictima": "Pedro Paul"
                },
                "DonanteCoincidencia": [],
                "BaseInfo": {
                    "baseInfoId": 4,
                    "descripcion": "Ixil"
                },
                "ProgramaIdent": {
                    "programaIdentId": 1,
                    "descripcion": "M-FISys"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 5,
                    "descripcion": "Finalizado"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 2,
                    "descripcion": "NO"
                },
                "TipoContexto": {
                    "tipoContextoId": 2,
                    "descripcion": "Cerrado"
                },
                "TipoCasoDid": null,
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 5,
                    "usuario": "jennifer.torres"
                }
            },
            {
                "coincidenciaId": 10,
                "fechaCoincidencia": "2020-05-11T00:00:00.000Z",
                "osamentaId": 10,
                "victimaId": 9,
                "baseInfoId": 2,
                "programaIdentId": 2,
                "lr": "2.00e+0",
                "apriori": "1/14",
                "posterior": ">99.9999%",
                "estadoCoincidenciaId": 2,
                "fechaNotificacionDid": "2020-07-08T00:00:00.000Z",
                "fechaConfExc": "2020-07-24T00:00:00.000Z",
                "estadoInvestigacionId": 1,
                "cromosomaYId": 1,
                "tipoCasoDidId": 3,
                "tipoContextoId": 2,
                "marcadoresStr": 14,
                "calidadPerfilId": 1,
                "estadoId": 1,
                "fechaHoraIngreso": "2020-09-23T16:58:03.000Z",
                "usuarioIngresoId": 4,
                "Osamenta": {
                    "casoId": 1881,
                    "fosaDet": "III",
                    "osamentaDet": "1",
                    "sexoAdnId": 1,
                    "locisAlelosUtiles": 6,
                    "SexoAdn": {
                        "descripcion": "XY"
                    }
                },
                "Victima": {
                    "codigoVictima": "FAFG 1881-001-V04",
                    "nombreVictima": "JUVENTINO MOLINA DIAZ"
                },
                "DonanteCoincidencia": [
                    {
                        "donanteCoincidenciaId": 7,
                        "donanteId": 9,
                        "cantidadDonantes": 6,
                        "Donante": {
                            "descripcion": "Otro"
                        }
                    }
                ],
                "BaseInfo": {
                    "baseInfoId": 2,
                    "descripcion": "Mestizo"
                },
                "ProgramaIdent": {
                    "programaIdentId": 2,
                    "descripcion": "DNA-VIEW"
                },
                "EstadoCoincidencia": {
                    "estadoCoincidenciaId": 2,
                    "descripcion": "Confirmada"
                },
                "EstadoInvestigacion": {
                    "estadoInvestigacionId": 1,
                    "descripcion": "Finalizado"
                },
                "CromosomaY": {
                    "cromosomaYId": 1,
                    "descripcion": "SI"
                },
                "TipoContexto": {
                    "tipoContextoId": 2,
                    "descripcion": "Cerrado"
                },
                "TipoCasoDid": {
                    "tipoCasoDidId": 3,
                    "descripcion": "Masacre"
                },
                "CalidadPerfil": {
                    "calidadPerfilId": 1,
                    "descripcion": "Perfil Parcial"
                },
                "Estado": {
                    "estadoId": 1,
                    "descripcion": "Activo"
                },
                "Usuario": {
                    "usuarioId": 4,
                    "usuario": "carolina.castillo"
                }
            }
        ]
    }
};