import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import uuid from 'react-uuid';
import { useEffect } from "react";
import { useTheme } from '../../hooks/useTheme';
//styles
import './Recipe.css';


export default function Recipe () {
    //to dynamically render content of each recipe based on url
    const { id } = useParams();
    const url = "http://localhost:3000/recipes/" + id;
    //custom useEffect hook to fetch data
    const {data: recipe, isPending, error } = useFetch(url);
    const { mode } = useTheme();
    const navigate = useNavigate();
    //hook to redirect the user if they accidentallyt access the recipe id that doesn't exist
    useEffect(()=> {
        if(error) {
            //redirect the user the custom url
            <p>The URL doesn't exist.Y ou will be redirected to the home page</p>
            setTimeout(() => {
                navigate("/");
            }, 2000)
        }
    }, [error, navigate])

  return (
    <div className = {`recipe ${mode}`}>
        {isPending && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        {recipe && (
           
            <div className='single-recipe'>
                <h2 className='page-title'>{recipe.title}</h2>
                <p> Takes {recipe.cookingTime} to cook</p>
                <ul>
                    {recipe.ingredients.map(ingredient => <li key ={uuid()}>{ingredient}</li>)}
                </ul>
                <p className='method'>{recipe.method}</p>
            </div>
        ) }

    </div>
  )
}
