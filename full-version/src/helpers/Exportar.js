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
        const pdf = new pdfConverter("l", "pt", "letter",true);
        anchoHojaPx = pdf.internal.pageSize.width;
        alturaHojaPx = pdf.internal.pageSize.height;
        let anchoC = canvas.clientWidth;
        let alturaC = canvas.clientHeight;

        if (anchoC > anchoHojaPx || alturaC > alturaHojaPx) {
            const item = calcular(anchoC, alturaC);
            console.log(item);
            let { ancho, altura } = item;
            anchoC = ancho;
            alturaC = altura;
        }
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
            pdf.line(20, alturaHojaPx - 40, anchoHojaPx - 20, alturaHojaPx - 40);
            pdf.setFontSize(12);
            const descripcionPaginas = "Pagina 1 de 1";
            const calculoDescripcionPaginas = (pdf.internal.pageSize.width - 20) - (pdf.getStringUnitWidth(descripcionPaginas) * pdf.internal.getFontSize());
            pdf.text(descripcionPaginas, calculoDescripcionPaginas, alturaHojaPx - 25);

        }
        // Fin Encabezado
        agregarEncabezado();

        let x = 10;
        let y = 80;
        const auxAncho = anchoHojaPx - anchoC;
        x = auxAncho / 2;
        const base64Image = canvas.toDataURL();
        pdf.addImage(base64Image, "JPEG", x, y, anchoC, alturaC);
        pdf.save(`${nombre}.pdf`);
    }

    const handleTodos = () => {
        const canvass = document.getElementsByTagName("canvas");
        const pdf = new pdfConverter("l", "pt", "letter",true);
        let posicionInicialY = 80;
        let posicionInicialX = 10;
        let totalPaginas = canvass.length;
        let paginaActual = 1;
        // Inicio Encabezado
        const agregarEncabezado = (pagina) => {
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
            pdf.line(20, alturaHojaPx - 40, anchoHojaPx - 20, alturaHojaPx - 40);
            pdf.setFontSize(12);
            const descripcionPaginas = `Pagina ${pagina} de ${totalPaginas}`;
            const calculoDescripcionPaginas = (pdf.internal.pageSize.width - 20) - (pdf.getStringUnitWidth(descripcionPaginas) * pdf.internal.getFontSize());
            pdf.text(descripcionPaginas, calculoDescripcionPaginas, alturaHojaPx - 25);

        }
        // Fin Encabezado

        for (let canvas of canvass) {
            
            anchoHojaPx = pdf.internal.pageSize.width;
            alturaHojaPx = pdf.internal.pageSize.height;
            let anchoC = canvas.clientWidth;
            let alturaC = canvas.clientHeight;
            let x = posicionInicialX;
            let y = posicionInicialY;

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
            pdf.addImage(base64Image, "JPEG", x, y, anchoC, alturaC);
            agregarEncabezado(paginaActual);
            if (paginaActual < totalPaginas) {
                pdf.addPage();
            }
            paginaActual++;
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
