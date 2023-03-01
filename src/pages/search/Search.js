import React from 'react'
import { useLocation } from "react-router-dom";
import RecipeList from '../../componets/RecipeList';
import { useFetch } from '../../hooks/useFetch';
//styles
import "./Search.css";

export default function Search () {
  const queryString = useLocation().search;
  //new url search params object based on query string
  const queryParams = new URLSearchParams(queryString);
  //we get the value of query parameter e.g. pizza
  const query = queryParams.get('q')
  //send a request using useFetch hook so we can get what recipes include that search parameter
  //json server will look for recipes of query
  const url = "http://localhost:3000/recipes/?q=" + query;
  //send request for url
  const {error, isPending, data} =  useFetch(url);
  return (
    <div>
      <h2 className = "page-title">Recipes including "{query}"</h2>
      {error && <p className = "error">{error}</p>}
      {isPending && <p className = "loading">Loading...</p>}
      {data && <RecipeList recipes = {data}></RecipeList>} 
    </div>
  )
}
