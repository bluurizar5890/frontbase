import React from 'react'
import pdfConverter from 'jspdf';
import { saveAs } from 'file-saver';
const alturaHojaPx = 612;
const anchoHojaPx = 792;
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
        const pdf = new pdfConverter("l", "pt");
        pdf.addImage(base64Image, "JPEG", x, 10, anchoC, alturaC);
        pdf.save(`${nombre}.pdf`);
    }

    const handleTodos = () => {
        const canvass = document.getElementsByTagName("canvas");
        const pdf = new pdfConverter("l", "pt");
        let y = 30;
        console.log("total Imagenes", canvass.length);
        let pagina=1;
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
            pdf.text("Nombre de la empresa", 74, 20);
            if ((y + alturaC) >= alturaHojaPx) {
                pdf.addPage();
                y = 10;
                pagina++;
                pdf.text('Page ' + String(pagina) + ' of ' + String(10), pdf.internal.pageSize.width / 2, 287, {
                    align: 'center'
                  })
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
