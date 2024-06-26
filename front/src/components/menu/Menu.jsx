import { useCallback, useState, useEffect } from "react";
import config from "../../params/config.js";
import './style.css';

export default function Menu({ curPath }) {
    const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(false);

    const fetchMenu = useCallback(async () => {
        // setLoading(true);
        const response = await fetch(config.api + 'get/Menu/');
        const answer = await response.json();
        setMenu(answer.data);
        // setLoading(false);
    }, [])

    useEffect(
        () => {fetchMenu()}, [fetchMenu] 
    )

    return (
            <menu>   
                {
                menu && menu.map(menuElement => (
                    <li className={curPath == menuElement.LINK ? 'selected': null} key={menuElement._id}><a href={menuElement.LINK}>{menuElement.NAME}</a></li>
                    ))
                }
            </menu>
            // <menu>
            // {
            //     !loading && data.map((menuElement) => (
            //         <li key={menuElement._id}>
            //             <a href={menuElement.LINK} className={curPath == menuElement.LINK ? 'selected' : ''}>{menuElement.NAME}</a>
            //         </li>
            //     ))
            // }
            // </menu>
        
    )
}