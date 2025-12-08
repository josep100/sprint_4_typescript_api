export interface Joke {
    id: string,
    joke: string,
    status: number
}

export interface WeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
}

export interface ReportAcudits {
    joke: string,
    score: 0 | 1 | 2 | 3,
    date: string
}

export const reportAcudits: ReportAcudits[] = [];

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: { Accept: "application/json" }
    });

    if (!response.ok) {
        throw new Error("Ocurrió un error en la petición");
    }

    const data = await response.json();
    return data as T;
};

export const registerScore = (ScoreEntry: ReportAcudits, array:ReportAcudits []) => {
        array.push(ScoreEntry);
        console.log(reportAcudits);
}



