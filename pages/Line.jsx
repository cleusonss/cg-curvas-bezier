
const Line = props => {

    const point1 = props.point1;
    const point2 = props.point2;

    function analytic() {

        const points = [];

        //Reta Vertical
        if (point1.x === point2.x) {
            for (let y = point1.y; y <= point2.y; y++) {
                points.push(Point(point1.x, y));
            }
        }
        // Reta Inclinada
        else {
            const m = (point2.y - point1.y) / (point2.x - point1.x);
            const b = point2.y - m * point2.x;

            for (let x = point1.x; x <= point2.x; x++) {
                let y = m * x + b;
                points.push(Point(x, Math.round(y)));
            }
        }

        return points;
    }

    function dda() {

        const points = [];

        const dx = Math.abs(point2.x - point1.x);
        const dy = Math.abs(point2.y - point1.y);

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

    function bresenham(){

        const points = [];
        let dx = point2.x - point1.x;
        let dy = point2.y - point1.y;
        let y = point1.y;

        let p = ( 2 * dy ) - dx;
        
        for (let x = point1.x; x < point2.x; x++){
            
            points.push(Point(x,y));

            if( p >= 0){
                y = y + 1;
                p = p + 2 * (dy - dx);   
            }else{
                p = p - 2 * dy;
            }
        }

        return points;
    }



    function Point(x, y) {
        return {
            'x': x,
            'y': y
        };
    }
}

export default Line