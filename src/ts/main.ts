import { fetchData, registerScore,reportAcudits} from "./jokes.service";
import type { Joke, WeatherResponse, ChuckJoke } from './jokes.service';

// Referencias al contenedor principal
const app = document.querySelector<HTMLDivElement>("#app");

interface NormalizedJoke {
    text: string;  // SIEMPRE este campo
}

// Elementos que vamos a usar
let main: HTMLElement;
let article: HTMLElement;
let section: HTMLElement;
let h1: HTMLHeadingElement;
let pJoke: HTMLParagraphElement;
let btnNextJoke: HTMLButtonElement;
let btnBadJoke: HTMLButtonElement;
let btnMediumJoke: HTMLButtonElement;
let btnGoodJoke: HTMLButtonElement;
let joke: Joke | ChuckJoke;
let urlJokes: string[] = [];
let currentJoke: NormalizedJoke | null = null;

// Crear la estructura del DOM
const createUI = () => {
  main = document.createElement("main");
  article = document.createElement("article");
  
  section = document.createElement("section");
  section.id = "contentJoke";

  h1 = document.createElement("h1");
  h1.textContent = "Preparat per riure?";

  pJoke = document.createElement("p");
  pJoke.ariaLive = "assertive";

  btnNextJoke = document.createElement("button");
  btnNextJoke.id = "nextJoke";
  btnNextJoke.ariaLabel = "Mostrar un nuevo chiste";
  btnNextJoke.textContent = "Mostrar un nuevo chiste";

  btnBadJoke = document.createElement("button");
  btnBadJoke.textContent = "😞";
  btnBadJoke.value = "1";
  btnMediumJoke = document.createElement("button");
  btnMediumJoke.textContent = "🙂";
  btnMediumJoke.value = "2";
  btnGoodJoke = document.createElement("button");
  btnGoodJoke.textContent = "😄";
  btnGoodJoke.value = "3";

  // Componer sección
  article.appendChild(btnBadJoke);
  article.appendChild(btnMediumJoke);
  article.appendChild(btnGoodJoke);
  section.appendChild(h1);
  section.appendChild(pJoke);
  section.appendChild(article);
  section.appendChild(btnNextJoke);

  // Componer main y añadir a app
  main.appendChild(section);
  app?.appendChild(main);
}

// Cargar un chiste y actualizar el <p>
const loadJoke = async () => {
    try {
        urlJokes = ["https://icanhazdadjoke.com/", "https://api.chucknorris.io/jokes/random"];
        const randomIndex = Math.floor(Math.random() * urlJokes.length);
        if (urlJokes[randomIndex].includes("icanhazdadjoke")) {
             joke = await fetchData<Joke>(urlJokes[randomIndex]);
             currentJoke = { text: joke.joke }; 
             pJoke.textContent = currentJoke.text;
        }

        if (urlJokes[randomIndex].includes("chucknorris")) {
             joke = await fetchData<ChuckJoke>(urlJokes[randomIndex]);
             currentJoke = { text: joke.value }; 
             pJoke.textContent = currentJoke.text;
        }
       
    } catch (err) {
        console.error("No se pudo cargar el chiste");
    }
}

const loadWeather = async () => {
    const pTiempo = document.getElementById("tiempo") as HTMLParagraphElement;
    try {
        const weather = await fetchData<WeatherResponse>("https://api.open-meteo.com/v1/forecast?latitude=41.38879&longitude=2.15899&current_weather=true");
        console.log("tiempo:" + weather.current_weather.temperature);
        pTiempo.textContent = `${weather.current_weather.temperature}`;
    } catch (err) {
        console.error("No se pudo cargar el tiempo");
    }
}

export const setScore = (score: 0 | 1 | 2 | 3) => {
      let fechaActual = new Date();
      let date = fechaActual.toISOString();
      if(score !== 0)
        registerScore({joke: currentJoke?.text ?? "Chiste no disponible", score, date},reportAcudits);
}

// Configurar eventos
const setupEventListeners = () => {
    let score: 0 | 1 | 2 | 3 = 0;
    btnNextJoke.addEventListener("click", () => {
        loadJoke();
        setScore(score);
        score = 0;
    });
    article.addEventListener("click", (event) => {
          const target = event.target as HTMLButtonElement;
          score = parseInt(target.value) as 1 | 2 | 3;
    });
}

// Inicializar la app
async function init() {
  createUI();
  setupEventListeners();
  await loadWeather();
  await loadJoke(); // cargar primer chiste
}

// Iniciar al cargar la página
window.addEventListener("load", init);

