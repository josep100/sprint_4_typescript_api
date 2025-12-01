// tests/fetchJoke.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchJoke } from '../src/ts/jokes.service.ts';


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

