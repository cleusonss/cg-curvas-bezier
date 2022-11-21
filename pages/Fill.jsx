import Point from './Point';

export default function Fill(poligon, seed, array){

    return {
        'fill': fill(poligon, seed, array)
    };
}

export const fill = (poligon, seed, array) => {

    array.push(seed);

    if (!contains(poligon, Point(seed.x + 1, seed.y))) {
        if (!contains(array, Point(seed.x + 1, seed.y))) {
            fill(poligon, Point(seed.x + 1, seed.y), array);
        }
    }

    if (!contains(poligon, Point(seed.x - 1, seed.y))) {
        if (!contains(array, Point(seed.x - 1, seed.y))) {
            fill(poligon, Point(seed.x - 1, seed.y), array);
        }
    }

    if (!contains(poligon, Point(seed.x, seed.y + 1))) {
        if (!contains(array, Point(seed.x, seed.y + 1))) {
            fill(poligon, Point(seed.x, seed.y + 1 ), array);
        }
    }

    if (!contains(poligon, Point(seed.x, seed.y - 1))) {
        if (!contains(array, Point(seed.x, seed.y - 1))) {
            fill(poligon, Point(seed.x, seed.y - 1 ), array);
        }
    }

    return array;
}

export const compare2Points = (p1, p2) => {
    if (p1.x === p2.x && p1.y === p2.y) {
        return true;
    } else {
        return false;
    }
}

export const contains = (array, point) => {
    for (let i = 0; i < array.length; i++) {
        if (compare2Points(array[i], point)) {
            return true;
        }
    }
    return false;
}

