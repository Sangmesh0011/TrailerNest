import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";
import { CgClose } from "react-icons/cg";

const apiKey = process.env.REACT_APP_API_KEY;
function Banner() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      console.log(request.data.results);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();

    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setTrailerUrl("");
  };


  const handleClick = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${apiKey}`
      );
      if (response.data.results.length > 0) {
        console.log("Banner url",response.data.results[0].key)
        setShowPlayer(true);
        setTrailerUrl(response.data.results[0].key);
      } else {
        throw new Error("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching the trailer:", error);
      setTrailerUrl("");
    }
  };
  console.log(movie);
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundSize: "fit",
          backgroundImage: `linear-gradient(to right, rgba(0,0, 0, 1) 20%, transparent), url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundPosition: "top",
        }}
      >
        <div className="banner_contents">
          <h2>{movie.title || movie.name || movie.original_name}</h2>
          <br />
          <div className="banner_buttons">
            <button onClick={() => handleClick(movie)}>Play</button>
          </div>

          <h2 className="desc">{movie.overview}</h2>
        </div>
      </div>
      {showPlayer && <div className="player"><h1 onClick={handleClosePlayer}><CgClose /></h1><YouTube videoId={trailerUrl} opts={opts} /></div>}
    </>
  );
}

export default Banner;
