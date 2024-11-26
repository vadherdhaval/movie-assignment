import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rating from "../../Components/Ratings";

const MovieRatings = (props: any) => {
    const [imdbRating, setImdbRating] = useState<any>(0);
    const [rottenRating, setRottenRating] = useState<any>(0);
    const [matacriticRating, setMatacriticRating] = useState<any>(0);
    const [averageRating, setAverageRating] = useState<any>(0);
    const { movie_details } = useSelector((state: any) => ({
        movie_details: state.MOVIES.movie_detail,
    }));
    useEffect(() => {
        if(Object.keys(movie_details).length > 0){
            getAverageRating();
        }
    }, [movie_details])
    const getAverageRating = () => {
        const imdbRating = Number(movie_details.Ratings.filter((e: any) => e.Source === "Internet Movie Database")[0]["Value"].split('/')[0]);
        const metacriticRating = Number(movie_details.Ratings.filter((e: any) => e.Source === "Metacritic")[0]["Value"].split('/')[0]);
        const rottenRating = Number(movie_details.Ratings.filter((e: any) => e.Source === "Rotten Tomatoes")[0]["Value"].replace('%', ''));
        const averageRating = Math.round((imdbRating * 10 + metacriticRating + rottenRating) / 3);
        setImdbRating(imdbRating*10)
        setRottenRating(rottenRating)
        setMatacriticRating(metacriticRating)
        setAverageRating(averageRating / 10);
    }
    return (
        <>
            <div className="ratings-wrapper d-flex align-items-center">Average Rating: <Rating overallRating={averageRating} /></div>
            <div className="individual-rating d-flex">
                <span className="badge rounded-pill text-bg-primary">Internet Movie Database: {imdbRating}%</span>
                <span className="badge rounded-pill text-bg-primary">Rotten Tomatoes: {rottenRating}%</span>
                <span className="badge rounded-pill text-bg-primary">Metacritic: {matacriticRating}%</span>
            </div>
        </>
    )
}
export default MovieRatings;