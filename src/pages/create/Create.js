import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import { useFetch } from '../../hooks/useFetch';
//stylers
import "./Create.css";



export default function Create ()  {
const [title, setTitle] = useState('');
const [method, setMethod] = useState('');
const [cookingTime, setCookingTime] = useState('');
const [newIngredient, setNewIngredient] = useState('');
const [ingredients, setIngredients] = useState([]);
const ingredientInput = useRef(null);
const navigate = useNavigate();

const {postData, data, error} = useFetch('http://localhost:3000/recipes', "POST")
const handleSubmit = (e) => {
  //Use event object as a parameter to prevent default of the form submitting when the page is reloading
  e.preventDefault();
  postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
}
const handleAdd = (e) => {
  e.preventDefault();
  const ing = newIngredient.trim();
  if(ing && !ingredients.includes(ing)) {
    setIngredients(prevIngredients => [...prevIngredients, ing])
  } else {
    alert("Empty values or duplicates are not allowed");
  }
  setNewIngredient('');
  //set the cursor in the input
  ingredientInput.current.focus();
}

//redirect user after we get data response
useEffect(() => {
  if(data) {
    navigate("/");
  }
}, [data, navigate])

  return (
    <div className='create'>
    {error && <p>{error}</p>}
      <h2 className='page-title'> Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
      <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange = {e => setTitle(e.target.value)}
            value = {title}
            required
          ></input>
        </label>
        <label>
          <span>Ingredients list:</span>
          <div className = "ingredients">
            <input 
              type = "text"
              onChange= {(e) => setNewIngredient(e.target.value)}
              value = {newIngredient}
              ref = {ingredientInput}
              ></input>
            <button onClick = {handleAdd}className='btn'>add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i=> <em key = {uuid()}>{i}</em>)}</p>

        <label>
          <span>Cooking Instructions</span>
          <textarea
            onChange = {(e) => setMethod(e.target.value)}
            value = {method} 
            required
          />  
        </label>
        <label>
          <span>Cooking time (minutes): </span>
          <input
              type = "number"
              //string version of a number
              onChange = {(e) => setCookingTime(e.target.value)}
              value = {cookingTime}
              required
              >
          </input>
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

