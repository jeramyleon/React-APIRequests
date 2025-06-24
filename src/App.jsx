import React, { use } from "react";
import { createRoot } from "react-dom/client";
// import axios from "axios"; // Maybe we'll need axios? 🤔
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios"; 
import SearchField from "./SearchField";

const GIPHY_API_KEY = "t5xMiavNzfSlVB7lXV5ZNmxoa09vmPQG";
const url = `http://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}`;

const App = () => {
  const [trending, setTrending] = useState([]);
  const fetchTrending = async () => {
    try {
      const response = await axios.get(url);
      const responseData = response.data.data;
      setTrending(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  console.log("TRENDING", trending);

  return (
    <div className="app">
      <h1 className="title">Let's Make Some API Requests!</h1>
      <ul>
        {trending.map((gif) => {
          return <li key={gif.id}><img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} /></li>;
        })}
      </ul>

      <SearchField/>
    </div>
  );
};

// The following lines initialize your React application and inject
// it into the index.html
const root = createRoot(document.getElementById("root"));
root.render(<App />);
