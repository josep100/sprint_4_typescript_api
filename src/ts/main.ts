import { fetchJoke } from "./jokes.service";

// Referencias al contenedor principal
const app = document.querySelector<HTMLDivElement>("#app");

// Elementos que vamos a usar
let main: HTMLElement;
let section: HTMLElement;
let h1: HTMLHeadingElement;
let pJoke: HTMLParagraphElement;
let btnNextJoke: HTMLButtonElement;

// Crear la estructura del DOM
const createUI = () => {
  main = document.createElement("main");
  
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

  // Componer sección
  section.appendChild(h1);
  section.appendChild(pJoke);
  section.appendChild(btnNextJoke);

  // Componer main y añadir a app
  main.appendChild(section);
  app?.appendChild(main);
}

// Cargar un chiste y actualizar el <p>
const loadJoke = async () => {
  const joke = await fetchJoke();
  pJoke.textContent = joke || "No se pudo cargar el chiste";
}

// Configurar eventos
const setupEventListeners = () => {
  btnNextJoke.addEventListener("click", loadJoke);
}

// Inicializar la app
async function init() {
  createUI();
  setupEventListeners();
  await loadJoke(); // cargar primer chiste
}

// Iniciar al cargar la página
window.addEventListener("load", init);

