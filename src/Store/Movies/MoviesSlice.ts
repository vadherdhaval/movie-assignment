import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMoviesAPI, getPosterApi } from "./MovieServices";

interface MovieListI {
    isLoading: true | false;
    isPosterDataLoading: true | false;
    error: any | any[] | null;
    movies:[
        {
            title:string,
            episode_id: number,
            opening_crawl:string,
            director:string,
            producer:string,
            release_date:string,
            characters:any[],
            planets:any[],
            starships:any[],
            vehicles:any[],
            species:any[],
            created:string,
            edited:string,
            url:string

        }
    ];
    movies_count:number;
    movie_detail: {};

}
const movies: MovieListI = {
  isLoading: false,
  isPosterDataLoading:false,
  error: null,
  movies: [
    {
        title:'',
        episode_id: 0,
        opening_crawl: '',
        director: '',
        producer:'',
        release_date: '',
        characters:[],
        planets:[],
        starships:[],
        vehicles:[],
        species:[],
        created:'',
        edited:'',
        url:''
    }
  ],
  movies_count: 0,
  movie_detail: {}
};

function LoadingFailed(state: MovieListI, action: PayloadAction<string>) {
    state.isLoading = false;
    state.isPosterDataLoading = false;
    state.error = action.payload;
}
export const fetchMovies = createAsyncThunk(
    "fetch_movies",
    async (arg: any, { dispatch }) => {
        try {
            dispatch(startStopLoader(true));
            const res = await getMoviesAPI({});
            const results = await res.json();
            dispatch(getMoviesAction(results));
        } catch (err: any) {
            dispatch(setOnFailure(`fetchMovies:::: ${err.toString()}`));
            return err.response.data;
        } finally {
            dispatch(startStopLoader(false));
        }
    }
);
export const fetchPosterApi = createAsyncThunk(
    "fetch_movie_poster",
    async (arg: any, { dispatch }) => {
        try {
            dispatch(startStopPosterDataLoader(true));
            const res = await getPosterApi(arg);
            const results = await res.json();
            dispatch(getMoviePosterAction(results));
        } catch (err: any) {
            dispatch(setOnFailure(`fetchPoster:::: ${err.toString()}`));
            return err.response.data;
        } finally {
            dispatch(startStopPosterDataLoader(false));
        }
    }
);
export const moviesSlice = createSlice({
    name: "Movies",
    initialState: movies,
    reducers:{
        setOnFailure: LoadingFailed,
        startStopLoader: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = payload;
        },
        startStopPosterDataLoader: (state, { payload }: PayloadAction<any>) => {
            state.isPosterDataLoading = payload;
        },
        getMoviesAction: (state, {payload}:PayloadAction<any>) => {
            state.movies_count = payload.count;
            state.movies = payload.results;
        },
        getMoviePosterAction: (state, {payload}:PayloadAction<any>) => {
            state.movie_detail = payload;
        },
        clearMovieDetailsAction: (state, {payload}:PayloadAction<any>) => {
            state.movie_detail = {};
        }
    }
});

export const {
    startStopLoader,
    startStopPosterDataLoader,
    setOnFailure,
    getMoviesAction,
    getMoviePosterAction,
    clearMovieDetailsAction
} = moviesSlice.actions;

export default moviesSlice.reducer;