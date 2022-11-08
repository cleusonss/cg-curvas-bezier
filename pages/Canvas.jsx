
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

        const pointsA = analytic(Point(-5, 9), Point(10, -4));
        const pointsB = bresenham(Point(-5, 9), Point(10, -4));
        const pointsD = dda(Point(-5, 9), Point(10, -4));

        console.log(pointsB);
        
        //pointsA.forEach(plot);
        pointsB.forEach(plot);
        //pointsD.forEach(plot);

        function analytic(point1, point2) {

            let points = [];

            //Reta Vertical
            if (point1.x === point2.x) {
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
                let inc = (point2.y - point1.y) / (point2.x - point1.x);
                let y = point1.y;

                for (let x = point1.x; x <= point2.x; x++) {
                    points.push(Point(x, Math.round(y)));
                    y += inc;
                }
            }
            else {
                let inc = (point2.x - point1.x) / (point2.y - point1.y);
                let x = point1.x;

                for (let y = point1.y; y <= point2.y; y++) {
                    points.push(Point(Math.round(x), y));
                    x += inc;
                }
            }

            return points;
        }

        function bresenham(point1, point2) {

            // y2 menor que y1 
            if (point2.y < point1.y) {
                point1.y = point1.y * -1;
                point2.y = point2.y * -1;
            }

            // // |y2 - y1| maior que |y2 - y1|
            // if (Math.abs(point2.y - point1.y) > Math.abs(point2.x - point1.x)) {
            //     let xAux = point1.x;
            //     point1.x = point1.y;
            //     point1.y = xAux;

            //     xAux = point2.x;
            //     point2.x = point2.y;
            //     point2.y = xAux;
            // }

            let points = [];
            let dx = point2.x - point1.x;
            let dy = point2.y - point1.y;
            let y = point1.y;
            let x = point1.x;
            let p = 2 * dy - dx;


            for (x; x <= point2.x; x++) {

                points.push(Point(x, y));

                if (p >= 0) {
                    y = y + 1;
                    p = p + 2 * (dy - dx);
                } else {
                    p = p - 2 * dy;
                }
            }

            return points;
        }


        /* Nossas Funcoes */
        function drawGrid(canvas, context, step) {

            context.strokeStyle = 'gray';
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
            context.fillStyle = 'blue';
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