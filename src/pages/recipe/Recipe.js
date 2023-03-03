import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { useEffect, useState } from "react";
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from "../../firebase/config";
//styles
import './Recipe.css';


export default function Recipe () {
    //to dynamically render content of each recipe based on url
    const { id } = useParams();
    const { mode } = useTheme();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=> {
        setIsPending(true);
        
        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
            if(doc.exists) {
               setIsPending(false)
               setData(doc.data())
            } else {
                setIsPending(false)
                setError('Could not find that recipe')
            }
        })
        return () => unsub();

    }, [id])
  

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
        {data && (
           
            <div className='single-recipe'>
                <h2 className='page-title'>{data.title}</h2>
                <p> Takes {data.cookingTime} to cook</p>
                <ul>
                {data.ingredients.map((ingredient) => <li key ={uuid()}>{ingredient}</li>)}
                </ul>
                <p className='method'>{data.method}</p>
            </div>
        ) }

    </div>
  )
}
