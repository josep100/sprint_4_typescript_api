// tests/fetchJoke.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
// vi.mock('../src/ts/jokes.service.ts', () => ({
//     registerScore: vi.fn(),
// }));
import { fetchJoke, registerScore, reportAcudits, ReportAcudits} from '../src/ts/jokes.service.ts';
import { setScore } from '../src/ts/main';


describe('fetchJoke', () => {

  // Limpiar los mocks después de cada test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls fetch and returns the joke string', async () => {
    // Mock global fetch
    (globalThis as any).fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ joke: "esto es un chiste" }),
      })
    );

    // Llamada a la función
    const joke = await fetchJoke();

    // Verificaciones
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://icanhazdadjoke.com', {
      headers: { Accept: "application/json" },
    });
    expect(joke).toBe("esto es un chiste");
  });

  it('calls fetch and returns the response false', async () => {
    // Mock global fetch
    (globalThis as any).fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    // Llamada a la función
    const joke = await fetchJoke();

    // Verificaciones
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://icanhazdadjoke.com', {
      headers: { Accept: "application/json" },
    });
    expect(joke).toBe("Ocurrió un error");
  });

   it('calls fetch and returns connection failure error', async () => {
    // Mock global fetch
    (globalThis as any).fetch = vi.fn(() =>
      Promise.reject(new Error("Ocurrió un error"))
    );

    // Llamada a la función
    const joke = await fetchJoke();

    // Verificaciones
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://icanhazdadjoke.com', {
      headers: { Accept: "application/json" },
    });
    expect(joke).toBe("Ocurrió un error");
  });
});

it('call to the function on click', async () => {
      
        const btnNextJoke = document.createElement("button");
        btnNextJoke.id = "nextJoke";
        document.body.appendChild(btnNextJoke); 

        const mockFn = vi.fn()
        btnNextJoke.addEventListener("click", mockFn)

      
        btnNextJoke?.click()
    
      
        expect(mockFn).toHaveBeenCalled();
});

it("save valid entry", () => {
    
    const ScoreEntry: ReportAcudits = {
        joke: "esto es un chiste",
        score: 1,
        date: "2023-10-27"
    };

    const testReportAcudits: ReportAcudits[] = [];
  

    registerScore(ScoreEntry, testReportAcudits);

    expect(testReportAcudits).toHaveLength(1);
    
});

// it("save invalid entry", () => {
    
//     const score = 0;
//     const joke = "esto es un chiste";
//     const date = "2025-12-6";
//     reportAcudits.length = 0;

//     setScore(score);

//     expect(registerScore).toHaveBeenCalled();
// });





