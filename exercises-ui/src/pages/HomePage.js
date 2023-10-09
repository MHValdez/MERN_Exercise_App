import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    } 
    

    // UPDATE an exercise
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE an exercise  
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete document with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
            <article>
                <h2>Current Workout Schedule</h2>
                <p>To create a new exercise, follow the link above. 
                    For existing exercises, refer to the table below. 
                    All exercises are assumed to be rep/weight based.</p>
                <ExerciseList 
                    exercises={exercises} 
                    onEdit={onEditExercise} 
                    onDelete={onDeleteExercise} 
                />
            </article>
        </>
    );
}

export default HomePage;