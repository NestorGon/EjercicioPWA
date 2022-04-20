import { useEffect, useState } from "react";
import Character from "./character";

function Marvel() {

    let [characters, setCharacters] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("characters") === null) {
                setCharacters("Loading...")
            } else {
                setCharacters(JSON.parse(localStorage.getItem("characters")));
            }
        } else {
            fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=7d65f7d421178128d498070af0170141&hash=d656e8ee197b36219f09752b48113180')
            .then(resp=>resp.json())
            .then(resp=>resp.data.results)
            .then(characters=>{
                setCharacters(characters);
                localStorage.setItem("characters", JSON.stringify(characters));
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