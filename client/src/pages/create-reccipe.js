import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import { useGetUserID } from "../hooks/useGetUserID";

//Used to create workout routines
export const CreateRecipe = () => {
    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    };

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Workout created");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return <div className="create-recipe">
        <h2>Create Workout</h2>
        <form>
            <label htmlFor="name">Training Part</label>
            <input type="text" id="name" name="name" onChange={handleChange}></input>
            <label htmlFor="ingredients">Exercises</label>
            {recipe.ingredients.map((ingredient, idx) =>(
                <input key={idx} type="text" id ="ingredients" name="ingredients" value={ingredient} 
                onChange={(event) => handleIngredientChange(event, idx)}></input>
            ))}
            <button onClick={addIngredient} type="button">Add Exercise</button>
            <label htmlFor="instructions">Day</label>
            <input id="instructions" name="instructions" onChange={handleChange}></input>
            <label htmlFor="imageUrl">Training Part Image</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}></input>
            <label htmlFor="cookingTime">Time Taken(mins)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}></input>
            <hr></hr>
            <button type="submit" onClick={onSubmit}>Add Workout</button>
        </form>
    </div>
}