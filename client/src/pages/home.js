import {useEffect, useState} from "react";
import axios from "axios";

import { useGetUserID } from "../hooks/useGetUserID";

//Used to display the workout routines created by user
export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    //const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = useGetUserID();
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        /*const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };*/

        fetchRecipe();
        //fetchSavedRecipe();
    } ,[]);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.get("http://localhost:3001/recipes", {recipeID, userID});
            setRecipes(response.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return <div>
        <h1> Workouts</h1>
        <ul>
            {recipes.map((recipe) =>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}></img>
                    <p> Training Time: {recipe.cookingTime} (mins)</p>
                </li>
            ))}
        </ul>
    </div>
}