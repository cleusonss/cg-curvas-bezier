
import Point from '../Point';

import Line from '../Line';
import { NumberInputField } from '@chakra-ui/react';

const { log } = console;

export default function handler(req, res) {

    if (req.method === "POST") {

        const payloaded = req?.body;

        const line = Line(
            Point(parseInt(payloaded.startX), parseInt(payloaded.startY)),
            Point(parseInt(payloaded.endX), parseInt(payloaded.endY))
        )

        switch (payloaded.algorithm) {
            case 'Analitico':
                res.status(200).json( line.analytic )
                break;
            case 'Bresenham':
                res.status(200).json( line.bresenham )
                break;
            case 'DDA':
                res.status(200).json( line.dda )
                break;
            default:
                res.status(500).json( { message: 'Algorithm: ' + payloaded.algorithm + "não conhecido" })
                break;
        }
    }

    res.status(500).json(
        { message: "This needs to be a post request" }
    )

}