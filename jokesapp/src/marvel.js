import { useEffect, useState } from "react";
import Character from "./character";

function Marvel() {

    let [characters, setCharacters] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            console.log('IS OFFLINE')
            if(localStorage.getItem("characters") === null) {
                console.log('No characters found');
                setCharacters("Loading...")
            } else {
                console.log('Characters found: ',localStorage.getItem("characters"));
                setCharacters(localStorage.getItem("characters"));
            }
        } else {
            fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=7d65f7d421178128d498070af0170141&hash=d656e8ee197b36219f09752b48113180')
            .then(resp=>resp.json())
            .then(resp=>resp.data.results)
            .then(characters=>{
                console.log(characters);
                setCharacters(characters);
                localStorage.setItem("characters", characters);
            });
        }
    }, []);

    return (
        <div className="row">
            {characters.map((item) => (
                <div className="col-3" key={item.id} >
                    <Character data={item}/>
                </div>
            ))}
        </div>
    );
}

export default Marvel;