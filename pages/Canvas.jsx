
// Based on https://jsfiddle.net/zt1s7ecp/
import React, { useEffect, useRef } from "react";

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

        drawGrid(canvas, context, cellSize);

        for (let i = 0; i < (canvas.width / cellSize); i++) {
            highlightCell(i, 40, 'whitesmoke');
            highlightCell(40, i, 'whitesmoke');
        }

        highlightCell(40, 40, 'gray');

        /* Testa Algoritmo */
        let linha0 = bresenham(Point(-40, 0), Point(40, 0));
        linha0.forEach(plot);

        let linha1 = bresenham(Point(-40, -20), Point(40, 20));
        linha1.forEach(plot);

        let linha2 = bresenham(Point(-40, -40), Point(40, 40));
        linha2.forEach(plot);

        // let linha3 = bresenham(Point(-20, -40), Point(20, 40));
        // linha3.forEach(plot);

        // let linha4 = bresenham(Point(0, -40), Point(0, 40));
        // linha4.forEach(plot);

        // let linha5 = bresenham(Point(20, -40), Point(-20, 40));
        // linha5.forEach(plot);

        // let linha6 = bresenham(Point(-40, 40), Point(40, -40));
        // linha6.forEach(plot);

        // let linha7 = bresenham(Point(-40, 20), Point(40, -20));
        // linha7.forEach(plot);

        /* Algoritmos e Funcoes */
        function analytic(point1, point2) {

            let points = [];

            //Reta Vertical
            if (point1.x === point2.x) {

                // Inverte os valores de y
                if (point1.y > point2.y) {
                    let yAux = point1.y;
                    point1.y = point2.y;
                    point2.y = yAux;
                }

                for (let y = point1.y; y <= point2.y; y++) {
                    points.push(Point(point1.x, y));
                }
            }
            // Reta Inclinada
            else {
                let m = (point2.y - point1.y) / (point2.x - point1.x);
                let b = point2.y - m * point2.x;

                for (let x = point1.x; x <= point2.x; x++) {
                    let y = m * x + b;
                    points.push(Point(x, Math.round(y)));
                }
            }

            return points;
        }

        function dda(point1, point2) {

            let points = [];

            let dx = Math.abs(point2.x - point1.x);
            let dy = Math.abs(point2.y - point1.y);

            if (dx > dy) {
                // Inverte Pontos
                if (point1.x > point2.x) {
                    const endPoint = point1;
                    point1 = point2;
                    point2 = endPoint;
                }

                let inc = (point2.y - point1.y) / (point2.x - point1.x);
                let y = point1.y;

                for (let x = point1.x; x <= point2.x; x++) {
                    points.push(Point(x, Math.round(y)));
                    y += inc;
                }
            }
            else {

                // Inverte Pontos
                if (point1.y > point2.y) {
                    const endPoint = point1;
                    point1 = point2;
                    point2 = endPoint;
                }

                let inc = (point2.x - point1.x) / (point2.y - point1.y);
                let x = point1.x;

                for (let y = point1.y; y <= point2.y; y++) {
                    points.push(Point(Math.round(x), y));
                    x += inc;
                }
            }

            return points;
        }

        /* Algoritmo Bresenham */
        function bresenham(point1, point2) {

            // Armazena os porntos para retorno
            const line = [];

            // Inverte Pontos
            if (point1.x > point2.x) {
                return bresenham(point2, point1);
            }

            //Define dx e dy
            const dx = Math.abs(point2.x - point1.x);
            const dy = Math.abs(point2.y - point1.y);
            
            //Define y inicial como y1
            let y = point1.y;

            //Define o parametro de decidao d
            let d = 2 * dy - dx;

            /* 
                d >= 0 : incrementa y em uma unidade
                d < 0 : mantem y
            */

            // Percorre incrementando x em uma unidade
            for( let x = point1.x; x <= point2.x; x++){
                
                // Acende o o pixel
                line.push( Point( x, y ) );

                if (d>=0){

                    // Incrementa y
                    y = y + 1;

                    // Atualiza parametro de decisao
                    d = d + 2 * (dy - dx); 
                }
                else{

                    // Mantem o y
                    //atualiza o parametro de decisao
                    d = d + 2 * dy;
                }
            }

                // Se Reta é Crescente: Incremeta x ou x,y

                // Se Reta é Decrescente: Incremeta y ou x,y

            console.log(line);
            return line;


        }




        /* Nossas Funcoes */
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

        function highlightCell(x, y, color) {
            context.fillStyle = color;
            context.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 1, cellSize - 1);
        }

        function plot(point) {
            let x = 40 + point.x;
            let y = 40 - point.y;
            context.fillStyle = 'cornflowerblue';
            context.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 1, cellSize - 1);
        }

        function Point(x, y) {
            return {
                'x': x,
                'y': y
            };
        }

    }, [])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas