import React, { useEffect, useState }  from 'react'
import { CgClose } from "react-icons/cg";
import YouTube from "react-youtube";
import "./Row.css";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const base_url = "https://image.tmdb.org/t/p/w500/";

const UtilScreen = ({search}) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    async function getData() {
      const request = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`);
      setMovies(request.data.results);
      return request;
    }
    getData();
  }, [search]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  };
  const handleClosePlayer = () => {
    setShowPlayer(false);
    setTrailerUrl("");
  };
  const handleClick = async (movie) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
      );
      if (response.data.results.length > 0) {
        setTrailerUrl(response.data.results[0].key);
        setShowPlayer(true);
      } else {
        throw new Error("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching the trailer:", error);
      setTrailerUrl("");
    }
  };

  return (
    <div className="row">
      <div className="title_poster">
        <h2>Search Results</h2>
      </div>
      <div className="row_of_movies">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {showPlayer && <div className="player"><h1 onClick={handleClosePlayer}><CgClose /></h1><YouTube videoId={trailerUrl} opts={opts} /></div>}
    </div>
  );
}

export default UtilScreen
