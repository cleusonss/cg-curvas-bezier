
// Based on https://jsfiddle.net/zt1s7ecp/
import React, { useEffect, useRef, useState } from "react";

import Point from './Point';
import Line from './Line';
import Circle from "./Circle";

const { log } = console;

const Canvas = props => {

    const canvasRef = useRef(null);
    const cellSize = 10;
    const defaultFrameSize = 812;
    const defaultColor = 'gray';

    useEffect(() => {
                
        const canvas = canvasRef.current
        canvas.width = defaultFrameSize;
        canvas.height = defaultFrameSize;

        const context = canvas.getContext("2d");

        /* ---- Funções ---- */

        /* Escolhe Linha de acordo com o Algoritmo */
        const line = () => {
            const array = Line(
                Point(parseInt(props.startX), parseInt(props.startY)),
                Point(parseInt(props.endX), parseInt(props.endY))
            )
            switch (props.algorithm) {
                case 'Analitico':
                    return array.analytic;
                case 'Bresenham':
                    return array.bresenham;
                case 'DDA':
                    return array.dda;
                default:
                    return [];
            }
        };

        /* Plota ponto no Grid */
        function plot(point) {
            let x = 40 + point.x;
            let y = 40 - point.y;
            context.fillStyle = 'cornflowerblue';
            context.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 1, cellSize - 1);
        }


        /* Plota Pixel com uma cor definida */
        function highlightCell(x, y, color) {
            context.fillStyle = color;
            context.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 1, cellSize - 1);
        }

        /* Desenha Grid */
        function drawGrid(canvas, context, step) {

            context.strokeStyle = 'lightgrey';
            context.moveTo(0.5, 0.5);
            context.lineTo(canvas.width + 0.5, 0.5);
            context.lineTo(0.5, canvas.height + 0.5);
            context.lineTo(0.5, 0.5);

            //Draw grid lines
            for (let i = 1; i <= canvas.width; i++) {
                context.moveTo(step * i + 1.5, 0.5);
                context.lineTo(step * i + 1.5, canvas.height + 0.5);
            }

            for (let i = 1; i <= canvas.width; i++) {
                context.moveTo(0.5, step * i + 1.5);
                context.lineTo(canvas.width + 0.5, step * i + 1.5);
            }
            context.stroke();
        }

        /* Aplica Funcoes */

        /* Desenha o Grid */
        drawGrid(canvas, context, cellSize);

        /* Marca Eixo X e Eixo Y*/
        for (let i = 0; i < (canvas.width / cellSize); i++) {
            highlightCell(i, 40, 'whitesmoke');
            highlightCell(40, i, 'whitesmoke');
        }

        /* Marca o centro do plano */
        highlightCell(40, 40, defaultColor);

        /* Plota Linha */
        line().forEach(plot);

        // /* Testa Algoritmo */
        // let x = -40;
        // for (let y = -40; y <= 40; y += 20) {
        //     switch (props.algorithm) {
        //         case 'Analitico':
        //             Line(Point(x, y), Point(-x, -y)).analytic.forEach(plot);
        //             break;
        //         case 'Bresenham':
        //             Line(Point(x, y), Point(-x, -y)).bresenham.forEach(plot);
        //             break;
        //         case 'DDA':
        //             Line(Point(x, y), Point(-x, -y)).dda.forEach(plot);
        //             break;
        //     }
        // }
        // let y = -40;
        // for (let x = -20; x <= 20; x += 20) {
        //     switch (props.algorithm) {
        //         case 'Analitico':
        //             Line(Point(x, y), Point(-x, -y)).analytic.forEach(plot);
        //             break;
        //         case 'Bresenham':
        //             Line(Point(x, y), Point(-x, -y)).bresenham.forEach(plot);
        //             break;
        //         case 'DDA':
        //             Line(Point(x, y), Point(-x, -y)).dda.forEach(plot);
        //             break;
        //     }
        // }

        Circle(
            Point(parseInt(props.startX), parseInt(props.startY)),
            20
        ).bresenham.forEach(plot);


    }, [props])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas