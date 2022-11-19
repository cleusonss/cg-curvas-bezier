
import { NumberInputField } from '@chakra-ui/react';
import Point from './Point';

const { log } = console;

export default function Circle(center, r) {

    return {
        'parametric': parametric(center, r),
        'increment': increment(center, r),
        'bresenham': bresenham(center, r)
    };

};


/* Funcoes */

/* -- Metodo Analitico -- */
export const parametric = (center, r) => {

    let circle = [];

    let x = center.x + r;
    let y = center.y;

    for (let i = 1; i <= 360; i++) {
        circle.push(Point(Math.round(x), Math.round(y)));
        x = center.x + (r * Math.cos((Math.PI * i) / 180));
        y = center.y + (r * Math.sin((Math.PI * i) / 180));
    }

    return circle;
}

/* -- Metodo Incremental -- */
export const increment = (center, r) => {

    /* Armazena pontos da Circuferencia */
    let circle = [];

    /* Define o Angulo do Incremento */
    let theta = 0;
    if (r !== 0) {
        theta = (1 / r);
    }

    /* Sen e Cos  */
    let cos = Math.cos(theta);
    let sin = Math.sin(theta);

    /* X e Y Inicial */
    let x = r;
    let y = 0;

    // Calcula os pontos do Primeiro Octante
    // Por Simetria replica nos demais
    while (x > y) {

        // Primeiro Octante
        circle.push(Point(Math.round(x + center.x), Math.round(y + center.y)));

        // Segundo Octante
        circle.push(Point(Math.round(y + center.x), Math.round(x + center.y)));

        // Terceiro Octante
        circle.push(Point(Math.round(-y + center.x), Math.round(x + center.y)));

        // Quarto Octante
        circle.push(Point(Math.round(-x + center.x), Math.round(y + center.y)));

        // Quinto Octante
        circle.push(Point(Math.round(-x + center.x), Math.round(-y + center.y)));

        // Sexto Octante
        circle.push(Point(Math.round(-y + center.x), Math.round(-x + center.y)));
        
        // Setimo Octante
        circle.push(Point(Math.round(y + center.x), Math.round(-x + center.y)));
        
        // Oitavo Octante
        circle.push(Point(Math.round(x + center.x), Math.round(-y + center.y)));

        
        /* valor temporario de x */
        let xn = x;

        /* Calcula nova coordenada x,y */
        x = (xn * cos) - (y * sin);
        y = (y * cos) + (xn * sin);
    }

    return circle;
}



/* -- Metodo Bresenham -- */
export const bresenham = (center, r) => {

    /* Armazena pontos da Circuferencia */
    let circle = [];

    /* X e Y Inicial */
    let x = 0;
    let y = r;
    let p = 1 - r;

    // Calcula os pontos do Primeiro Octante
    // Por Simetria replica nos demais
    while (x <= y) {

        // Primeiro Octante
        circle.push(Point(x + center.x, y + center.y));

        // Segundo Octante
        circle.push(Point(Math.round(y + center.x), Math.round(x + center.y)));

        // Terceiro Octante
        circle.push(Point(Math.round(-y + center.x), Math.round(x + center.y)));

        // Quarto Octante
        circle.push(Point(Math.round(-x + center.x), Math.round(y + center.y)));

        // Quinto Octante
        circle.push(Point(Math.round(-x + center.x), Math.round(-y + center.y)));

        // Sexto Octante
        circle.push(Point(Math.round(-y + center.x), Math.round(-x + center.y)));
        
        // Setimo Octante
        circle.push(Point(Math.round(y + center.x), Math.round(-x + center.y)));
        
        // Oitavo Octante
        circle.push(Point(Math.round(x + center.x), Math.round(-y + center.y)));

        if(p>=0){
            y = y - 1;
            p = p + 2*x - 2*y + 5;

        }else{
            p = p + 2*x + 3;
        }

        
        x++;

        log(circle);
    }

    return circle;
}