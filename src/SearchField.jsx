import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchField = () => {
  const [search, setSearch] = useState("lebron");
  const [results, setResults] = useState([]);
  const userSearch = search.split(" ").join("+");
  const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=t5xMiavNzfSlVB7lXV5ZNmxoa09vmPQG`;
  const fetchSearch = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.data;
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  // console.log("Search", search);
  console.log("RESULTS", results);

  return (
    <>
      <input onChange={(e) => {setSearch(e.target.value)}} placeholder="search for gifs" type="text"></input><button>Search</button>
      <ul>
        {results.map((gif) => {
          return <li key={gif.id}><img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} /></li>;
        })}
      </ul>
    </>
  );
};

export default SearchField;
