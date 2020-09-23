import React from 'react'
import pdfConverter from 'jspdf';
import { saveAs } from 'file-saver';
//import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react';
import iconoEmpresa from '../assets/images/fafg/imgFafg.png';
var alturaHojaPx = 0;
var anchoHojaPx = 0;
const calcular = (ancho, altura) => {
    let salida = {};
    for (let porcentaje = 1; porcentaje <= 100; porcentaje++) {
        ancho = ancho - ancho * (porcentaje * 0.01);
        altura = altura - altura * (porcentaje * 0.01);

        if (ancho <= anchoHojaPx && altura <= alturaHojaPx) {
            salida.ancho = ancho;
            salida.altura = altura;
            return salida;
        }
    }
}
export const Exportar = ({ id, nombre = "descarga" }) => {

    const handleExportar = () => {
        const canvas = document.getElementById(id);
        const pdf = new pdfConverter("l", "pt", "letter");
        anchoHojaPx = pdf.internal.pageSize.width;
        alturaHojaPx = pdf.internal.pageSize.height;
        let anchoC = canvas.clientWidth;
        let alturaC = canvas.clientHeight;
        let x = 10;
        let y = 80;
        if (anchoC > anchoHojaPx || alturaC > alturaHojaPx) {
            const item = calcular(anchoC, alturaC);
            console.log(item);
            let { ancho, altura } = item;
            anchoC = ancho;
            alturaC = altura;
        }

        const auxAncho = anchoHojaPx - anchoC;
        x = auxAncho / 2;

        // Inicio Encabezado
        const agregarEncabezado = () => {
            pdf.addImage(iconoEmpresa, "JPEG", 40, 20, 113, 57);
            pdf.setFontSize(12);
            const titulo = "Fundación de Antropología Forence de Guatemala";
            const calculoXTitulo = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(titulo) * pdf.internal.getFontSize() / 2);
            pdf.text(titulo, calculoXTitulo, 40);

            pdf.setFontSize(10);
            const subTitulo = "Dirección de generación de reportes";
            const calculoXSubTitulo = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(subTitulo) * pdf.internal.getFontSize() / 2);
            pdf.text(subTitulo, calculoXSubTitulo, 52);

            pdf.setFontSize(12);
            const descripcionReporte = "Reporte de Graficas";
            const calculoXDescripcionReporte = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(descripcionReporte) * pdf.internal.getFontSize() / 2);
            pdf.text(descripcionReporte, calculoXDescripcionReporte, 64);
            pdf.setLineWidth(0.8);
            pdf.line(20, 80, anchoHojaPx - 20, 80);


            pdf.setLineWidth(0.8);
            pdf.line(20, alturaHojaPx-40, anchoHojaPx - 20,  alturaHojaPx-40);
            pdf.setFontSize(12);
            const descripcionPaginas = "Pagina 1 de 10";
            const calculoDescripcionPaginas =(pdf.internal.pageSize.width-20) - (pdf.getStringUnitWidth(descripcionPaginas) * pdf.internal.getFontSize());
            pdf.text(descripcionPaginas, calculoDescripcionPaginas, alturaHojaPx-25);

        }
        // Fin Encabezado
        agregarEncabezado();
        const base64Image = canvas.toDataURL();
        pdf.addImage(base64Image, "JPEG", x, y, anchoC, alturaC);
        pdf.save(`${nombre}.pdf`);
    }

    const handleTodos = () => {
        const canvass = document.getElementsByTagName("canvas");
        const pdf = new pdfConverter("l", "pt", "letter");
        let y = 40;
        console.log("total Imagenes", canvass.length);
        let pagina = 1;
        for (let canvas of canvass) {
            let anchoC = canvas.clientWidth;
            let alturaC = canvas.clientHeight;
            let x = 10;
            if (anchoC > anchoHojaPx || alturaC > alturaHojaPx) {
                const item = calcular(anchoC, alturaC);
                console.log(item);
                let { ancho, altura } = item;
                anchoC = ancho;
                alturaC = altura;
            }

            const auxAncho = anchoHojaPx - anchoC;
            x = auxAncho / 2;
            const base64Image = canvas.toDataURL();

            pdf.text("Fundación para el desarrollo FONDESOL", 10, 40);
            if ((y + alturaC) >= alturaHojaPx) {
                pdf.addPage();
                y = 40;
                // pagina++;
                // pdf.text('Page ' + String(pagina) + ' of ' + String(10), pdf.internal.pageSize.width / 2, 287, {
                //     align: 'center'
                //   })
            }
            pdf.addImage(base64Image, "JPEG", x, y, anchoC, alturaC);
            y += alturaC + 30;
        }
        pdf.save(`${nombre}.pdf`);
    }
    const handleJpg = () => {
        const canvas = document.getElementById(id);
        canvas.toBlob((blob) => {
            saveAs(blob, `${nombre}`);
        });
    }
    return (
        <div>
            <div id="imgTest"></div>
            {
                id !== undefined ? <>
                    <button className="btn btn-danger btn-sm mr-1" onClick={handleExportar}>Exportar a Pdf</button>
                    <button className="btn btn-info btn-sm mr-1" onClick={handleJpg}>Exportar Image</button>
                </>
                    :
                    <button className="btn btn-success btn-sm mr-1" onClick={handleTodos}>Exportar Gráficas</button>
            }
        </div>
    )
}
