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
        const response = await fetch(config.api+ 'get/collections/');
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
        <div className='s'>
            <h1>
Хотык — многослойный разновременный палеолитический комплекс, расположенный в Хоринском районе Республики Бурятии, на реке Она. Первоначально разделялся на четыре уровня, два из которых определены как долговременные поселения, остальные — как кратковременные стоянки. В результате последующих исследований был разделен на шесть культурных слоёв. Один из уровней был отмечен как место проведения ритуальных или сакральных действий. Во время раскопок был найден фрагмент флейты, возможно, один из древнейших музыкальных инструментов, обнаруженных на территории Сибири.</h1>
        </div>
        
        
        </>

        
        // <>
        // <div ClassName ="sss">
        //     <h1></h1>
        // </div>

        //     <table className='simple-table'>
        //         <thead>
        //             <tr>
        //                 <th>Коллекция</th>
        //                 <th>Индексы</th>
        //                 <th>ntrckdnds</th>
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {
        //                 !loading && table.body.map((row, key) => (
        //                     <tr key={key}>
        //                         {Object.values(row).map((col, index )=> (
        //                             <td key={index}>{col}</td>
        //                         ))}
        //                     </tr>
        //                 ))
        //             }
        //         </tbody>
        //     </table>

        //     <div>
        //         <h2>Количество документов</h2>
        //     <CChart
        //         type="doughnut"
        //         data={{
        //             labels: pie.labels,
        //             datasets: [
        //             {
        //                 backgroundColor: getColors(pie.count),
        //                 data: pie.numbers,
        //             },
        //             ],
        //         }}
        //         options={{
        //             plugins: {
        //             legend: {
        //                 labels: {
        //                 //color: getStyle('--cui-body-color'),
        //                 }
        //             }
        //             },
        //         }}
        //         />
        //     </div>
            
        //     <div>
        //         <h2>Индексы</h2>
        //     <CChart
        //         type="doughnut"
        //         data={{
        //             labels: pie.labels,
        //             datasets: [
        //             {
        //                 backgroundColor: getColors(pie.count),
        //                 data: pie.indexes,
        //             },
        //             ],
        //         }}
        //         options={{
        //             plugins: {
        //             legend: {
        //                 labels: {
        //                 //color: getStyle('--cui-body-color'),
        //                 }
        //             }
        //             },
        //         }}
        //         />
        //     </div>
        // </>
    )
}