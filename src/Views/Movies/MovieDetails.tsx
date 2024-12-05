import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosterApi } from "../../Store/Movies/MoviesSlice";
import MovieRatings from "./MovieRatings";
import Svg from '../../Components/loader.svg';

const MovieDetails = (props:any) => {
    const dispatch = useDispatch();
    const {id} = props;
    const [selectedMovie,setSelectedMovie] = useState<any>(null);

    const {movies,movie_details,isPosterDataLoading} = useSelector((state:any) => ({
        movies: state.MOVIES.movies,
        movie_details: state.MOVIES.movie_detail,
        isPosterDataLoading: state.MOVIES.isPosterDataLoading,
    }));
    useEffect(() => {
        const filteredMovie = movies.filter((m:any) => m.episode_id === id)[0];
        const year = new Date(filteredMovie.release_date).getFullYear();
        dispatch(fetchPosterApi({name:filteredMovie.title,year}) as any);
    },[id]);
    useEffect(() => {
        if(Object.keys(movie_details).length > 0){
            const filteredMovie = movies.filter((m:any) => m.episode_id === id)[0];
            setSelectedMovie(filteredMovie)
        }else{
            setSelectedMovie(null)
        }
    },[movie_details]);

    const convertToRoman = (num:number) => {
        let roman:any = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1
        };
        var str = '';
      
        for (var i of Object.keys(roman)) {
          var q = Math.floor(num / roman[i]);
          num -= q * roman[i];
          str += i.repeat(q);
        }
        return str;
    }
    return isPosterDataLoading ? (
            <div className="col-lg-6">
                <div className="h-100 d-flex align-items-center justify-content-center"><img src={Svg} className="loader-icon" alt="loader-icon"/></div>
            </div>
        ) :  selectedMovie !== null ? (
        <div className="col-lg-6">
            <div className="detail-wrapper">
                <h1>Episode {convertToRoman(selectedMovie.episode_id)} - {selectedMovie.title}</h1>
                <div className="row">
                    <div className="col-lg-4">
                        <img src={movie_details.Poster} className="w-100"/>
                    </div>
                    <div className="col-lg-8">
                    {selectedMovie.opening_crawl}
                    </div>
                </div>
                <div className="">Directed by: {selectedMovie.director}</div>
                <MovieRatings/>
            </div>
        </div>
    ) : null
}

export default memo(MovieDetails);