import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { projectFirestore } from "../firebase/config";
import './RecipeList.css';
import Trashcan from "../assets/trashcan.svg";

export default function RecipeList({recipes}) {
  const { mode } = useTheme()
  if(recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
    } 
    const handleClick = (id) => {
      projectFirestore.collection('recipes').doc(id).delete();
    }
  return (
    <div className = "recipe-list">
        {recipes.map((recipe) => (
            <div key = {recipe.id} className= {`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make</p>
                <div>{recipe.method.substring(0, 100)}...
                    <Link to = {`/recipes/${recipe.id}`}> Cook this</Link>
                    <img
                      className = "delete"
                      src = {Trashcan}
                      alt = "delete this recipe"
                      onClick={() => handleClick(recipe.id)}
                    />
                </div>

            </div>
        ))}
      
    </div>
  )
}
