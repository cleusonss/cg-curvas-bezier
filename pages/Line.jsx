
import Point from './Point';

export default function Line(start, end) {

    return {
        'analytic':
            analytic(start, end),
        'bresenham':
            bresenham(start, end),
        'dda':
            dda(start, end)
    };
}

/* Funcoes */

/* -- Metodo Analitico -- */
export const analytic = (start, end) => {

    //Inverte pontos
    if (start.x > end.x) {
        return analytic(end, start);
    }

    let line = [];

    //Reta Vertical
    if (start.x === end.x) {
        
        //Inverte pontos
        if (start.y > end.y) {
            return analytic(end, start);
        }

        for (let y = start.y; y <= end.y; y++) {
            line.push(Point(start.x, y));
        }
    }

    // Reta Inclinada
    else {
        const m = (end.y - start.y) / (end.x - start.x);
        const b = end.y - m * end.x;

        for (let x = start.x; x <= end.x; x++) {
            let y = m * x + b;
            line.push(Point(x, Math.round(y)));
        }
    }
    return line;
}

/* -- Metodo DDA --  */
const dda = (start, end) => {

    let line = [];

    let dx = Math.abs(end.x - start.x);
    let dy = Math.abs(end.y - start.y);

    if (dx > dy) {
        // Inverte Pontos
        if (start.x > end.x) {
            const temp = start;
            start = end;
            end = temp;
        }

        let inc = (end.y - start.y) / (end.x - start.x);
        let y = start.y;

        for (let x = start.x; x <= end.x; x++) {
            line.push(Point(x, Math.round(y)));
            y += inc;
        }
    }
    else {

        // Inverte Pontos
        if (start.y > end.y) {
            const temp = start;
            start = end;
            end = temp;
        }

        let inc = (end.x - start.x) / (end.y - start.y);
        let x = start.x;

        for (let y = start.y; y <= end.y; y++) {
            line.push(Point(Math.round(x), y));
            x += inc;
        }
    }

    return line;
}

/* -- Método de Bresenhan -- */
// http://letslearnbits.blogspot.com/2014/10/icgt1-algoritmo-de-bresenham.html
function bresenham(start, end) {

    // Armazena os porntos para retorno
    const line = [];

    //Define dx e dy
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Inverte Pontos
    if (dx < 0) {
        return bresenham(end, start);
    }

    // Define a inclinacao da reta
    let m = 0;
    if (dy < 0) {
        m = -1;
    } else {
        m = 1;
    }

    /*
       dx >= m * dy : inclinca m <= 1
       dx < m * dy => |m| > 1
     */
    if (dx >= m * dy) {

        /* 
            dy < 0 => y2 < y1
            dy > 0 => y2 > y1
        */
        if (dy < 0) {

            //Define y inicial como y1
            let y = start.y;

            // Define Parametro de decisao
            let d = 2 * dy + dx;

            // Percorre incrementando x em uma unidade
            for (let x = start.x; x <= end.x; x++) {
                line.push(Point(x, y));

                if (d < 0) {
                    d = d + 2 * (dy + dx);
                    y = y - 1;
                } else {
                    d = d + 2 * dy;
                }
            }
        }
        else {
            let y = start.y;
            let d = 2 * dy - dx;

            for (let x = start.x; x <= end.x; x++) {
                line.push(Point(x, y));

                if (d < 0) {
                    d = d + 2 * dy;
                } else {
                    d = d + 2 * (dy - dx);
                    y = y + 1;
                }

            }
        }
    }
    else {

        if (dy < 0) { // y2 < y1
            let x = start.x;
            let d = dy + 2 * dx;


            for (let y = start.y; y >= end.y; y--) {
                line.push(Point(x, y));
                if (d < 0) {
                    d = d + 2 * dx; //varia apenas no eixo y
                } else {
                    d = d + 2 * (dy + dx);
                    x = x + 1;
                }
            }
        } else {
            let x = start.x;
            let d = dy - 2 * dx;


            for (let y = start.y; y <= end.y; y++) {
                line.push(Point(x, y));
                if (d < 0) {
                    d = d + 2 * (dy - dx);
                    x = x + 1;
                } else {
                    d = d + (-2) * dx;
                }
            }
        }
    }

    return line;
}