import './App.css';
import TaskForm from './Components/Tasks/TaskForm'
import Task from './Components/Tasks/Task'
import { useState, useEffect } from 'react';

function App() {
	const [tasks, setTasks] = useState([]);

	const addTask = (name) => {
		setTasks(previous => {
			return [...previous, {
				name: name,
				done: false
			}];
		})
	}

	useEffect(() => {
		if(tasks.length !== 0){
			localStorage.setItem("tasks", JSON.stringify(tasks))
		}
	}, [tasks])

	useEffect(() => {
		const localStorageTasks = JSON.parse(localStorage.getItem("tasks"))
		setTasks(localStorageTasks);
	}, [])


	return (
		<div className="main">
			<TaskForm onAdd={addTask} />

			{
				tasks.map((task, index) => (
					<Task {...task} />
				))
			}

		</div>
	);
}

export default App;
