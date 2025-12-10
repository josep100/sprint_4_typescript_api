export const weatherIcons: Record<number, string> = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌦️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    95: "⛈️",
};

export interface NormalizedJoke {
    text: string;  // SIEMPRE este campo
}

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

export interface ChuckJoke {
  icon_url: string;
  id: string;
  url: string;
  value: string; // ← aquí está el chiste
}

export interface ReportAcudits {
    joke: string,
    score: 0 | 1 | 2 | 3,
    date: string
}

export const reportAcudits: ReportAcudits[] = [];