import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";

const apiKey = "API_KEY_HERE";
function Banner() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      console.log(request.data.results);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
        );
      return request;
    }
    fetchData();
  }, []);
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${apiKey}`
      );
      if (response.data.results.length > 0) {
        setTrailerUrl(response.data.results[0].key);
      } else {
        throw new Error("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching the trailer:", error);
      setTrailerUrl("");
    }
  };
  console.log(movie)
  return (
    <>
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(to right, rgba(0,0, 0, 1) 20%, transparent), url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundPosition: "top",
          
        }}
        >
      <div className="banner_contents">
        <h2>{movie.title || movie.name || movie.original_name}</h2>
          <br/>
        <div className="banner_buttons">
          <button onClick={() => handleClick(movie)}>Play</button>
        </div>

        <h2 className="desc">{movie.overview}</h2>
      </div>
    </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </>
  );
}

export default Banner;
