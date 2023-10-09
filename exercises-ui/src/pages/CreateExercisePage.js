// Import dependencies
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    // Initialize current date for date selector default value
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const tomorrow = currentDate.toISOString().substring(0,10);

    const [name, setName]       = useState('Lift');
    const [reps, setReps]       = useState('8');
    const [weight, setWeight]   = useState('10');
    const [unit, setUnit]       = useState('lbs');
    const [date, setDate]       = useState(tomorrow);
    
    const history = useHistory();

    // Communicate with controller
    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully createed the exercise!");
        } else {
            alert(`Failed to create exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    // Generate and return form
    return (
        <>
        <article>
            <h2>Create an new exercise for your workout schedule</h2>
            <p>Fill out the details below. All fields are required. 
                As such, exercises are assumed to be rep/weight based. 
                Reps and weight must be at least 1. To return Home 
                without creating an exercise, follow the link above.
            </p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>What exercise are you creating?</legend>
                    <label htmlFor="name">Exercise Name</label>
                    <input
                        type="text"
                        placeholder="Name of the exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        required />
                    
                    <label htmlFor="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Reps to complete"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" 
                        min="1" 
                        required />

                    <label htmlFor="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight to use"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" 
                        min="1" 
                        required />
                    
                    <select
                        type="text"
                        onChange={e => setUnit(e.target.value)} 
                        id="unit" 
                        required="required" >
                        <option selected="selected" value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                    </select>
                    
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        placeholder="Date"
                        defaultValue={tomorrow} 
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        required />

                    <label htmlFor="submit">
                    <button
                        type="submit"
                        onClick={createExercise}
                        id="submit"
                    >Create</button> this exercise</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;