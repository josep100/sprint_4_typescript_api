interface Joke {
    id: string,
    joke: string,
    status: number
}

export interface ReportAcudits {
    joke: string,
    score: 0 | 1 | 2 | 3,
    date: string
}

export const reportAcudits: ReportAcudits[] = [];

export const fetchJoke = async () => {

    try{
        const response = await fetch("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json"}});
        
         if(!response.ok) throw new Error("Ocurrió un error");
        
        const jokeObject: Joke = await response.json();
        return jokeObject.joke;
    }catch (error) {
        if (error instanceof Error) {
             return error.message;
        }
    }   
}

export const registerScore = (ScoreEntry: ReportAcudits, array:ReportAcudits []) => {
        array.push(ScoreEntry);
        console.log(reportAcudits);
}



