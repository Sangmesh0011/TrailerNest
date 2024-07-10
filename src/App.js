import "./App.css";
import Banner from "./Banner";
import Row from "./Row";
import UtilScreen from "./UtilScreen";
import requests from "./requests";
import { useState } from "react";

function App() {
  const [search,setSearch]=useState("");
  return (
    <div className="App">
      <div className="nav">
      <img
        src="/logo.png"
        alt="TRAILER NEST"
        className="logo"
      />
      <div className="search-div">
        <input className="search-input" type="text" placeholder="Search for you favourite movie trailer" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      </div>
      </div>
      {search===""?null:<UtilScreen search={search}/>}
      <Banner />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
    </div>
  );
}

export default App;
