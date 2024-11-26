export async function getMoviesAPI(payload: any): Promise<any> {
    let url = 'https://swapi.dev/api/films/?format=json';
    try {
      return await fetch(url);
    } catch (error) {
      throw error;
    }
}
export async function getPosterApi(payload: any): Promise<any> {
    let url = `https://www.omdbapi.com/?apikey=b9a5e69d&t=${payload.name}&y=${payload.year}`;
    try {
      return await fetch(url);
    } catch (error) {
      throw error;
    }
}