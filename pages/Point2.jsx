class Point {

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    get x(){
        return this.x;
    }
    
    get y(){
        return this.y;
    }

    octantes(){

        let points = [];

        // Primeiro Octante
        points.push(Point(x, y));
    
        // Segundo Octante
        points.push(Point(y, x));
    
        // Terceiro Octante
        points.push(Point(-y, x));
    
        // Quarto Octante
        points.push(Point(-x, y));
    
        // Quinto Octante
        points.push(Point(-x, -y));
    
        // Sexto Octante
        points.push(Point(-y, -x));
    
        // Setimo Octante
        points.push(Point(y, -x));
    
        // Oitavo Octante
        points.push(Point(x, -y));
    
        return points;
    }

    invert(){
        let t = this.x;
        this.x = this.y;
        this.y = t;
    }

    distance( point ){
        return Math.sqrt( point.x * point.x + point.y * point.y );
    }
}