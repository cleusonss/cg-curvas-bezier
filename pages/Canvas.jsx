
// Based on https://jsfiddle.net/zt1s7ecp/
import React, { useEffect, useRef, useState } from "react";

import Point from './Point';
import Line from './Line';
import Circle from "./Circle";
import Fill from "./Fill";
import { NumberInputField } from "@chakra-ui/react";
import { platform } from "os";

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
            );

            switch (props.lineAlgorithm) {
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

        /* Escolhe Circulo de acordo com o Algoritmo */
        const circle = () => {
            const array = Circle(
                Point(parseInt(props.centerX), parseInt(props.centerY)),
                parseInt(props.radius)
            );

            switch (props.circleAlgorithm) {
                case 'Bresenham':
                    return array.bresenham;
                case 'Incremental':
                    return array.increment;
                case 'Parametrico':
                    return array.parametric;
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

        /* Plota ponto no Grid */
        function plotWithColor(point, color) {
            let x = 40 + point.x;
            let y = 40 - point.y;
            context.fillStyle = color;
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
        highlightCell(40, 40, 'gray');

        /* Plota Linha */
        line().forEach(plot);

        /* Plota Circulo */
        circle().forEach(plot);

        /* Flood Fill */

        /* Circuferencia */
        //floodFill(circle(), Point(0, 0), []).forEach( element => plotWithColor(element, 'violet'));
        //fillCircle(props.centerX, props.centerY, props.radius).forEach(element => plotWithColor(element, 'violet'));

        /* Quadrado */
        let square = [];
        square = square.concat(Line(Point(-25, -5), Point(-25, 5)).bresenham);
        square = square.concat(Line(Point(25, -5), Point(25, 5)).bresenham);
        square = square.concat(Line(Point(-25, 5), Point(25, 5)).bresenham);
        square = square.concat(Line(Point(-25, -5), Point(25, -5)).bresenham);
        //square.forEach(plot);
        //floodFill(square, Point(0, 0), []).forEach( element => plotWithColor(element, 'purple'));
        //fillSquare(square).forEach( element => plotWithColor(element, 'purple'));

        let poligonA = [];
        // poligonA = poligonA.concat(Line(Point(-5, -5), Point(-30, 10)).bresenham);
        // poligonA = poligonA.concat(Line(Point(-30, 10), Point(0, 20)).bresenham);
        // poligonA = poligonA.concat(Line(Point(30, 0), Point(0, 20)).bresenham);
        // poligonA = poligonA.concat(Line(Point(30, 0), Point(25, -10)).bresenham);
        // poligonA = poligonA.concat(Line(Point(-20, -20), Point(25, -10)).bresenham);
        // poligonA = poligonA.concat(Line(Point(-20, -20), Point(-5, -5)).bresenham);
        // poligonA.forEach(plot);
        // floodFill(poligonA, Point(0, 0), []).forEach( element => plotWithColor(element, 'plum'));

        // /* Preenchimento por Analise de Contorno Geometrico */
        // poligonA.push(Point(-5, -5));
        // poligonA.push(Point(-30, 10));
        // poligonA.push(Point(0, 20));
        // poligonA.push(Point(30, 0));
        // poligonA.push(Point(25, -10));
        // poligonA.push(Point(-20, -20));
        // geometric( poligonA ).forEach(element => plotWithColor(element, 'purple'));

        // let poligon = [];
        // poligon = poligon.concat(Line(Point(-25, -5), Point(-30, 10)).bresenham);
        // poligon = poligon.concat(Line(Point(-30, 10), Point(0, 20)).bresenham);
        // poligon = poligon.concat(Line(Point(0, 20), Point(25, 10)).bresenham);
        // poligon = poligon.concat(Line(Point(25, 10), Point(20, -5)).bresenham);
        // poligon = poligon.concat(Line(Point(20, -5), Point(0, -10)).bresenham);
        // poligon = poligon.concat(Line(Point(-5, 5), Point(0, -10)).bresenham);
        // poligon = poligon.concat(Line(Point(-5, 5), Point(10, 8)).bresenham);
        // poligon = poligon.concat(Line(Point(5, 0), Point(10, 8)).bresenham);
        // poligon = poligon.concat(Line(Point(5, 0), Point(-25, -5)).bresenham);
        // poligon.forEach(plot);
        // floodFill(poligon, Point(-26, 8), []).forEach( element => plotWithColor(element, 'red'));
        // floodFill(poligon, Point(0, 0), []).forEach( element => plotWithColor(element, 'slateblue'));

        /* Preenchimento por Analise de Contorno Geometrico */
        let poligonB = [];
        poligonB.push(Point(-25, -5));
        poligonB.push(Point(-30, 10));
        poligonB.push(Point(0, 20));
        poligonB.push(Point(25, 10));
        poligonB.push(Point(20, -5));
        poligonB.push(Point(0, -10));
        poligonB.push(Point(-5, 5));
        poligonB.push(Point(10, 8));
        poligonB.push(Point(5, 0));
        poligonB.push(Point(-25, -5));

        geometric( poligonB ).forEach(element => plotWithColor(element, 'purple'));








    }, [props])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas

export function geometric( vertices ) {

    if(vertices.length === 0){
        return [];
    }

    let pixels = [];
    let intersects = [];



    /* Define os Extremos do Poligono */
    let ymin = getYMin(vertices);
    let xmin = getXMin(vertices);

    let ymax = getYMax(vertices);
    let xmax = getXMax(vertices);

    /* Cria Tabela de Aresta Global */
    let arestas = [];
    for (let i = 0; i < vertices.length - 1; i++) {

        // Remove Arestas Horizontais
        if (vertices[i].y !== vertices[i + 1].y) {

            // Inverte Coordenadas no Eixo Y
            if (vertices[i].y < vertices[i + 1].y) {
                arestas.push({ "start": vertices[i], "end": vertices[i + 1] });
            } else {
                arestas.push({ "start": vertices[i + 1], "end": vertices[i] });
            }

        }
    }

    // Adiciona Ultima Aresta: Do ponto final, para pontos inicial
    if (vertices[0].y !== vertices[vertices.length - 1].y) {
        // Inverte Coordenadas no Eixo Y
        if (vertices[0].y < vertices[vertices.length - 1].y) {
            arestas.push({ "start": vertices[0], "end": vertices[vertices.length - 1] });
        } else {
            arestas.push({ "start": vertices[vertices.length - 1], "end": vertices[0] });
        }
    }


    /* Ordenaçao por ymin e depois por x */
    let arestasOrdenadas = [];
    let i = ymin;
    for (i; i <= ymax; i++) {
        let array = arestas.filter(aresta => aresta.start.y === i);
        arestasOrdenadas = arestasOrdenadas.concat(array);
    }
    arestas = arestasOrdenadas;

    // um cesto para cada linha de varredura

    //Tabela de arestas ativas
    //Somente tocada pela linha de varredura
    //Atualiza a medida que a linha segue
    let arestasAtivas = [];

    //1. set y = ymin
    let y = ymin;

    //2. verifiqua no y-bucket
    //3. insere arestas necessarias no AET
    while (y <= ymax) {

        //arestasAtivas = arestasAtivas.concat(arestas.filter(aresta => aresta.start.y === y));
        arestasAtivas = arestas.filter(aresta => aresta.start.y === y);

        //5. ordene por valores de X e preencha entre pares sucessivos
        arestasAtivas.forEach(
            element => {

                let xi = element.start.x;
                let xf = element.end.x;
                let yi = element.start.y;
                let yf = element.end.y;

                let dx = element.end.x - xi;
                let dy = element.end.y - element.start.y;

                while (yi <= yf) {
                    intersects.push(Point(Math.round(xi), yi));
                    xi = xi + dx / dy;
                    yi = yi + 1;

                }
            }
        );
        y++;
    }

    // Remove aresta das tabelas ativas
    arestasAtivas = arestasAtivas.filter(aresta => aresta.end.y < y);

    // Preenchimento
    y = ymin;
    while (y <= ymax) {

        let bucket = intersects.filter(intersect => intersect.y === y);
        let pool = clean(poligonOrderX(bucket)).filter(unique);

        if (pool.length % 2 === 0) {

            for (let i = 0; i < pool.length; i += 2) {

                let j = pool[i];
                while (j < pool[i + 1]) {
                    
                    pixels.push(Point(j, y));
                    j++;
                }
            }
        } else {
            for (let i = 0; i < pool.length - 1; i++) {
                let j = pool[i];
                while (j < pool[i + 1]) {

                    // log (  "start: ", arestas.filter( aresta => aresta.start.y === -25));
                    // if(starts > 0){
                    //     log ( "start: ", Point(j, y));
                    // }
                    
                    pixels.push(Point(j, y));
                    j++;
                }
            }
        }
        y++;
    }

    return intersects = intersects.concat(pixels);

}

export function clean( points ){

    let array = [];
    points.forEach( p => array.push(p.x));

    return array = array.filter(unique);
}

const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }



export function getYMin(poligon) {
    let ymin = poligon[0].y;
    for (let i = 0; i < poligon.length; i++) {
        if (poligon[i].y < ymin) {
            ymin = poligon[i].y;
        }
    }
    return ymin;
}

export function getYMax(poligon) {
    let ymax = poligon[0].y;
    for (let i = 0; i < poligon.length; i++) {
        if (poligon[i].y > ymax) {
            ymax = poligon[i].y;
        }
    }
    return ymax;
}

export function getXMin(poligon) {
    let xmin = poligon[0].x;
    for (let i = 0; i < poligon.length; i++) {
        if (poligon[i].x < xmin) {
            xmin = poligon[i].x;
        }
    }
    return xmin;
}

export function getXMax(poligon) {
    let xmax = poligon[0].x;
    for (let i = 0; i < poligon.length; i++) {
        if (poligon[i].x > xmax) {
            xmax = poligon[i].x;
        }
    }
    return xmax;
}

export function poligonOrder(poligon) {

    let all = [];

    for (let i = getYMin(poligon); i <= getYMax(poligon); i++) {
        let array = poligon.filter(element => element.y === i);
        all = all.concat(array);
    }

    return all;
}

export function poligonOrderY(poligon) {

    let all = [];

    for (let i = getYMin(poligon); i <= getYMax(poligon); i++) {
        let array = poligon.filter(element => element.y === i);
        if (array.length > 0) {
            all = all.concat(array);
        }
    }

    return all;
}

export function poligonOrderX(poligon) {

    let all = [];

    for (let i = getXMin(poligon); i <= getXMax(poligon); i++) {
        let array = poligon.filter(element => element.x === i);
        if (array.length > 0) {
            all = all.concat(array);
        }
    }

    return all;
}

export function fillSquare(square) {

    let array = [];

    for (let y = getYMin(square) + 1; y < getYMax(square); y++) {
        for (let x = getXMin(square) + 1; x < getXMax(square); x++) {
            array.push(Point(x, y));
        }
    }
    return array;

}

export function fillCircle(xc, yc, radius) {

    let array = [];

    let y = yc - radius + 1;
    let ymax = yc + radius;

    for (y; y < ymax; y++) {

        let x = Math.round(xc - Math.sqrt(Math.pow(radius, 2) - Math.pow((y - yc), 2))) + 1;
        let xmax = Math.round(xc + Math.sqrt(Math.pow(radius, 2) - Math.pow((y - yc), 2)));

        for (x; x < xmax; x++) {
            array.push(Point(x, y));
        }
    }

    return array;
}

export function floodFill(poligon, seed, array) {

    if (seed.x > 40 || seed.x < -40 || seed.y > 40 || seed.y < -40) {
        return array;
    }

    array.push(seed);

    if (!contains(poligon, Point(seed.x + 1, seed.y))) {
        if (!contains(array, Point(seed.x + 1, seed.y))) {
            floodFill(poligon, Point(seed.x + 1, seed.y), array);
        }
    }

    if (!contains(poligon, Point(seed.x - 1, seed.y))) {
        if (!contains(array, Point(seed.x - 1, seed.y))) {
            floodFill(poligon, Point(seed.x - 1, seed.y), array);
        }
    }

    if (!contains(poligon, Point(seed.x, seed.y + 1))) {
        if (!contains(array, Point(seed.x, seed.y + 1))) {
            floodFill(poligon, Point(seed.x, seed.y + 1), array);
        }
    }

    if (!contains(poligon, Point(seed.x, seed.y - 1))) {
        if (!contains(array, Point(seed.x, seed.y - 1))) {
            floodFill(poligon, Point(seed.x, seed.y - 1), array);
        }
    }

    return array;
}

export function compare2Points(p1, p2) {
    if (p1.x === p2.x && p1.y === p2.y) {
        return true;
    } else {
        return false;
    }
}

export function contains(array, point) {
    for (let i = 0; i < array.length; i++) {
        if (compare2Points(array[i], point)) {
            return true;
        }
    }
    return false;
}