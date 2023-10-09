// Import dependencies
import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {

    // Initialize existing date for date selector default value
    let oldDate = exercise.date.substring(0,10);
    
    const [name, setName]       = useState(exercise.name);
    const [reps, setReps]       = useState(exercise.reps);
    const [weight, setWeight]   = useState(exercise.weight);
    const [unit, setUnit]       = useState(exercise.unit);
    const [date, setDate]       = useState(oldDate);
    
    const history = useHistory();

    // Communicate with controller
    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    // Generate and return form
    return (
        <>
        <article>
            <h2>Edit this exercise</h2>
            <p>Fill out the details below. All fields are required. 
                As such, exercises are assumed to be rep/weight based. 
                Reps and weight must be at least 1. To return Home 
                without making changes or to create a new exercise 
                instead, follow the links above.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Exercise to edit:</legend>
                    <label htmlFor="name">Exercise Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        required />
                    
                    <label htmlFor="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        onChange={e => setReps(e.target.value)} 
                        id="reps" 
                        required />

                    <label htmlFor="weight">Weight</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" 
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
                        defaultValue={oldDate}
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        required />

                    <label htmlFor="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button> changes to this exercise</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;