// tests/fetchJoke.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as jokeService from "../src/ts/service.ts";
import type { ReportAcudits} from "../src/ts/config.ts";
import { setScore } from '../src/ts/main';

interface Joke {
  joke: string;
}

describe('fetchData', () => {

  // Limpiar los mocks después de cada test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls fetch and returns the object as T", async () => {
      // Arrange: mock de fetch
      const mockResponse: Joke = { joke: "esto es un chiste" };
      (globalThis as any).fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse,
        })
      );

      const url = "https://icanhazdadjoke.com";

      // Act: llamamos a la función genérica
      const result = await jokeService.fetchData<Joke>(url);

      // Assert: verificaciones
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url, {
        headers: { Accept: "application/json" },
      });
      expect(result).toEqual(mockResponse);
  });

  it("returns an error message when response.ok is false", async () => {
      // Arrange: mock de fetch que devuelve ok: false
      (globalThis as any).fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      );

      const url = "https://icanhazdadjoke.com";

      // Assert: verificamos que fetch fue llamado y que devolvió el mensaje de error
      
      await expect(jokeService.fetchData<Joke>(url)).rejects.toThrow("Ocurrió un error en la petición");
  });

   it("returns an error message when fetch throws (connection failure)", async () => {
      // Arrange: mock de fetch que simula un error de conexión
      (globalThis as any).fetch = vi.fn(() =>
        Promise.reject(new Error("Ocurrió un error"))
      );

      const url = "https://icanhazdadjoke.com";

      // Assert: verificamos que fetch fue llamado y devolvió el mensaje de error
      
      await expect(jokeService.fetchData<Joke>(url)).rejects.toThrow("Ocurrió un error");
  });
});

describe("Click the button that asks for a new joke", () => {
    it('call to the function on click', async () => {
      
        const btnNextJoke = document.createElement("button");
        btnNextJoke.id = "nextJoke";
        document.body.appendChild(btnNextJoke); 

        const mockFn = vi.fn()
        btnNextJoke.addEventListener("click", mockFn)

      
        btnNextJoke?.click()
    
      
        expect(mockFn).toHaveBeenCalled();
    });
});

describe("validate the scoring of the jokes", () => {
      it("save valid entry", () => {
      
        const ScoreEntry: ReportAcudits = {
            joke: "esto es un chiste",
            score: 1,
            date: "2023-10-27"
        };

        const testReportAcudits: ReportAcudits[] = [];
      

        jokeService.registerScore(ScoreEntry, testReportAcudits);

        expect(testReportAcudits).toHaveLength(1);
      
    });

    it("save invalid entry", () => {

        const registerScore = vi.spyOn(jokeService, "registerScore").mockImplementation(() => {});

        const score = 0;
        setScore(score);

        expect(registerScore).not.toHaveBeenCalled();
    });
});





