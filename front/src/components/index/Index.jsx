import { useCallback, useState, useEffect } from "react";
import config from "../../params/config.js";
import { CChart } from '@coreui/react-chartjs';
import '../table/style.css';
import Editor from 'react-simple-wysiwyg';



export default function Index() {
    const [table, setTable] = useState({
        body: []
    });
    const [pie, setPie] = useState({
        labels: [],
        numbers: [],
        indexes: [],
        count: 1
    });
    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.api+ 'get/collection/list/');
        let answer = await response.json();

        let labels = [];
        let numbers = [];
        let indexes = [];

        answer.forEach(item => {
            labels.push(item.TITLE.split('.')[1]);
            numbers.push(item.DOCUMENTS);
            indexes.push(item.INDEXES);
        });

        setPie({
            labels: labels,
            numbers: numbers,
            indexes: indexes,
            count: labels.length
        });

        setTable({
            body: answer
        });
        setLoading(false);
    }, [])

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getColors(count) {
        if(count > 0) {
            let arColors = [];
            for (let j = 0; j < count; j++) {
                let arColorCode = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                // HEX: 00 00 00    - #000000
                let color = '#';
        
                for (let i = 0; i < 6; i++) {
                    color += arColorCode[getRandomInt(16)]
                }

                arColors.push(color);
            }

            return arColors;
        }
        else return false;
    }

    useEffect(
        () => {
            fetchTable()
        }, [fetchTable] 
    )

    return (
        <>
           <div className="text">
            <h1>Танк — бронированная боевая машина, чаще всего на гусеничном ходу, как правило с пушечным и дополнительным пулемётным вооружением,  обычно установленным во вращающейся полноповоротной башне, предназначенным, в основном, для стрельбы прямой наводкой.

На ранних стадиях развития танкостроения иногда выпускали танки с исключительно пулемётным вооружением, а после Второй мировой войны проводились эксперименты по созданию танков с ракетным вооружением в качестве основного. Известны варианты танков с огнемётным вооружением. Определения танка, как боевой машины, были разными в разных армиях, так как назначение и способы их применения в разные эпохи менялись.</h1>


           </div>


     

      
            

                    <div className="Dovoen">
                <button onClick={() => this.dov()}>Довоенная эпоха</button>
                    </div>

                    <div className="Voen">
                <button onClick={() => this.voen()}>Военная эпоха</button>
                    </div>

                    <div className=" Poslevoen">
                <button onClick={() => this.pos()}>Послевоенная эпоха</button>
                    </div>
            
        
            

        </>

        
       
    )
}