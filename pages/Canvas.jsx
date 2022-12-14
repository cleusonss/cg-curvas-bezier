// Based on https://jsfiddle.net/zt1s7ecp/
import React, { useEffect, useRef, useState } from "react";

import Point from "./Point";
import Line from "./Line";

const { log } = console;

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const cellSize = 10;
  const defaultFrameSize = 812;
  const defaultColor = "gray";

  useEffect(() => {
    const canvas = canvasRef.current;
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
        case "Analitico":
          return array.analytic;
        case "Bresenham":
          return array.bresenham;
        case "DDA":
          return array.dda;
        default:
          return [];
      }
    };

    /* Plota ponto no Grid */
    function plot(point) {
      let x = 40 + point.x;
      let y = 40 - point.y;
      context.fillStyle = "cornflowerblue";
      context.fillRect(
        x * cellSize + 2,
        y * cellSize + 2,
        cellSize - 1,
        cellSize - 1
      );
    }

    /* Plota ponto no Grid */
    function plotWithColor(point, color) {
      let x = 40 + point.x;
      let y = 40 - point.y;
      context.fillStyle = color;
      context.fillRect(
        x * cellSize + 2,
        y * cellSize + 2,
        cellSize - 1,
        cellSize - 1
      );
    }

    /* Plota Pixel com uma cor definida */
    function highlightCell(x, y, color) {
      context.fillStyle = color;
      context.fillRect(
        x * cellSize + 2,
        y * cellSize + 2,
        cellSize - 1,
        cellSize - 1
      );
    }

    /* Desenha Grid */
    function drawGrid(canvas, context, step) {
      context.strokeStyle = "lightgrey";
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
    for (let i = 0; i < canvas.width / cellSize; i++) {
      highlightCell(i, 40, "whitesmoke");
      highlightCell(40, i, "whitesmoke");
    }

    /* Marca o centro do plano */
    highlightCell(40, 40, "gray");

    /* Plota Linha Controle P0-P1 */
    Line(
      Point(parseInt(props.startX), parseInt(props.startY)),
      Point(parseInt(props.control1X), parseInt(props.control1Y))
    ).bresenham.forEach(plot);

    /* Plota Linha Controle P0-P1 */
    Line(
      Point(parseInt(props.control1X), parseInt(props.control1Y)),
      Point(parseInt(props.control2X), parseInt(props.control2Y))
    ).bresenham.forEach(plot);

    /* Plota Linha Controle P2-P3 */
    Line(
      Point(parseInt(props.control2X), parseInt(props.control2Y)),
      Point(parseInt(props.endX), parseInt(props.endY))
    ).bresenham.forEach(plot);

    /* Plota Bezier */
    Bezier(
      Point(parseInt(props.startX), parseInt(props.startY)),
      Point(parseInt(props.control1X), parseInt(props.control1Y)),
      Point(parseInt(props.control2X), parseInt(props.control2Y)),
      Point(parseInt(props.endX), parseInt(props.endY))
    ).forEach(plot);
  }, [props]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;

const Bezier = (start, control1, control2, end) => {
  let curve = [];

  curve = curve.concat(start);

  // C(t) = [(1-t)^3 * P0] + [ 3t * (1-t)^2 * P1] + [ 3t ^ 2 * (1-t) * P2 ] + [t3 * P3 ]
  // P0 = Start --> TO =  [(1-t)^3 * P0]
  // P1 = control1 --> T1 =  [ 3t * (1-t)^2 * P1]
  // P2 = control2 -- >T2 =   [ 3t ^ 2 * (1-t) * P2 ]
  // P3 = end --> T2 =   [ 3t ^ 2 * (1-t) * P2 ]

  for (let t = 0; t <= 1; t = t + 0.005) {
    let x = Math.pow(1 - t, 3) * start.x; // -> P0
    x += 3 * t * Math.pow(1 - t, 2) * control1.x; // -> P1
    x += 3 * Math.pow(t, 2) * (1 - t) * control2.x; // -> P2
    x += Math.pow(t, 3) * end.x; // -> P3

    let y = Math.pow(1 - t, 3) * start.y; // -> P0
    y += 3 * t * Math.pow(1 - t, 2) * control1.y; // -> P1
    y += 3 * Math.pow(t, 2) * (1 - t) * control2.y; // -> P2
    y += Math.pow(t, 3) * end.y; // -> P3

    curve = curve.concat(Point(x, y));
  }

  curve = curve.concat(end);


  return curve;
};

const Casteljau = (start, control1, control2, end) => {
    let curve = [];
  
    curve = curve.concat(start);
  
    // C(t) = [(1-t)^3 * P0] + [ 3t * (1-t)^2 * P1] + [ 3t ^ 2 * (1-t) * P2 ] + [t3 * P3 ]
    // P0 = Start --> TO =  [(1-t)^3 * P0]
    // P1 = control1 --> T1 =  [ 3t * (1-t)^2 * P1]
    // P2 = control2 -- >T2 =   [ 3t ^ 2 * (1-t) * P2 ]
    // P3 = end --> T2 =   [ 3t ^ 2 * (1-t) * P2 ]
  
    for (let t = 0; t <= 1; t = t + 0.005) {
      let x = Math.pow(1 - t, 3) * start.x; // -> P0
      x += 3 * t * Math.pow(1 - t, 2) * control1.x; // -> P1
      x += 3 * Math.pow(t, 2) * (1 - t) * control2.x; // -> P2
      x += Math.pow(t, 3) * end.x; // -> P3
  
      let y = Math.pow(1 - t, 3) * start.y; // -> P0
      y += 3 * t * Math.pow(1 - t, 2) * control1.y; // -> P1
      y += 3 * Math.pow(t, 2) * (1 - t) * control2.y; // -> P2
      y += Math.pow(t, 3) * end.y; // -> P3
  
      curve = curve.concat(Point(x, y));
    }

    curve = curve.concat(end);

  
    return curve;
  };
