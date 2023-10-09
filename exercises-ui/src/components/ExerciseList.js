import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <caption>View, Edit, or Remove Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Units</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise 
                        exercise={exercise} 
                        key={i}
                        onEdit={onEdit} 
                        onDelete={onDelete}
                    />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
