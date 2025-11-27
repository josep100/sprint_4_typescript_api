interface Joke {
    id: string,
    joke: string,
    status: number
}

export const fetchJoke = async () => {

    try{
        const response = await fetch("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json"}});
        
         if(!response.ok) throw new Error("Ocurrió un error");
        
        const jokeObject: Joke = await response.json();
        return jokeObject.joke;
    }catch (error) {
        if (error instanceof Error) {
             console.error(error.message);
             return error.message;
        }
    }   
}



