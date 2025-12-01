import { fetchJoke } from "./jokes.service"


const app = document.querySelector<HTMLDivElement>('#app');
const btnNextJoke = document.querySelector<HTMLButtonElement>('#nextJoke');
const div = document.createElement("div");
let text = document.createTextNode("");

addEventListener("load", async () =>{
    const joke = await fetchJoke();
    text = document.createTextNode(joke || ""); 
    div.appendChild(text);
    app?.appendChild(div);
})

btnNextJoke?.addEventListener("click", async () =>{
        const joke = await fetchJoke();
        const nuevoNodoTexto = document.createTextNode(joke || "");
        console.log(`chiste: ${joke}`);
        if(div.firstChild){
            const nodoTextoAntiguo = div.firstChild;
            div.replaceChild(nuevoNodoTexto, nodoTextoAntiguo);
        }
})
