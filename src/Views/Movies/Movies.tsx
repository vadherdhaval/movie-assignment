import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMovieDetailsAction, fetchMovies } from "../../Store/Movies/MoviesSlice";
import Svg from '../../Components/loader.svg';
import './Movies.scss';
import MovieDetails from "./MovieDetails";
import SearchSort from "./SearchSort";

const MovieList = () => {
    const [selectedMovieId,setSelectedMovieId] = useState<number>(0);
    const [movies,setMovies] = useState<any>([]);
    const dispatch = useDispatch();
    const {isLoading,moviesList,movies_count} = useSelector((state:any) => ({
        isLoading: state.MOVIES.isLoading,
        moviesList: state.MOVIES.movies,
        movies_count: state.MOVIES.movies_count
    }))
    useEffect(() => {
        setSelectedMovieId(0)
        dispatch(fetchMovies({}) as any);
        dispatch(clearMovieDetailsAction({})as any)
    },[]);
    useEffect(() => {
        setMovies(moviesList)
    },[moviesList])
    const movieClickHandler = (movieId:number) => {
        if(window.outerWidth < 992 && selectedMovieId !== 0 && selectedMovieId === movieId){
            setSelectedMovieId(0);
            dispatch(clearMovieDetailsAction({})as any);
        }else{
            setSelectedMovieId(movieId)
        }
    };
    const handleSearch = (val:string) => {
        const searchedMovies = moviesList.filter((m:any) => m.title.toLowerCase().includes(val.toLocaleLowerCase()));
        const allMovieId = searchedMovies.map((m:any) => m.episode_id);
        if(!allMovieId.includes(selectedMovieId)){
            setSelectedMovieId(0);
        }
        setMovies(searchedMovies);
    };
    const handleSort = (val:string) => {
        const key = val === 'Episode' ? 'episode_id' : 'title';
        const searchedMovies = moviesList.slice().sort((m:any,n:any) => m[key] > n[key] ? 1 : -1);
        setMovies(searchedMovies);
    };

    const getMovieList = () => {
        const list = movies.map((movie:any,index:number) => {
            return (
                <div className="movie-row" key={index}>
                    <div className="row" key={`${index}`} onClick={() => movieClickHandler(movie.episode_id)}>
                        <div className="col-4 col-lg-3 episode">
                            EPISODE {movie.episode_id}
                        </div>

                        <div className="col-8 col-lg-6 movie-name">
                            {movie.title}
                        </div>
                        <div className="col-lg-3 release-date">
                            {movie.release_date}
                        </div>
                    </div>
                    {window.outerWidth < 992 && <>
                        {selectedMovieId !== 0 && selectedMovieId === movie.episode_id ? ( <MovieDetails id={selectedMovieId}/>) : null}
                    </>}
                </div>
            )}
        )
        return list
    }
    return (
        <>
            {movies_count > 0 && (
                <div className="col-lg-12">
                    <SearchSort handleSearch={handleSearch} handleSort={handleSort}/>
                </div>
            )}
            {isLoading ? (
                <div className="col-lg-12">
                    <div className="loader-icon-wrapper"><img src={Svg} className="loader-icon"/></div>
                </div>
            ) : 
                <div className="col-lg-6">
                    <div className="list-wrapper">
                        
                        {movies_count > 0 ? getMovieList()  : 'No Movies Found'}
                    </div>
                </div>
            }
            {window.outerWidth > 991 && <>
                {selectedMovieId !== 0 ? ( <MovieDetails id={selectedMovieId}/>) : selectedMovieId === 0 && !isLoading ? (
                <div className="col-lg-6">
                    <h2 className="default-movie-detail-text">Please select movie</h2>
                </div>
            ) : null}
            </>}
            
        </>
    )
}
export default MovieList;