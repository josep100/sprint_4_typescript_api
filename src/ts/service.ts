import type { ReportAcudits} from "./config";
import { reportAcudits } from "./config";

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



