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

	const updateTask = (taskIndex , updatedStatus) => {
		setTasks(previous => {
			const newTasks = [...previous]
			newTasks[taskIndex].done = updatedStatus
			return newTasks
		})
	}

	const removeTask = (removeIndex) => {
		setTasks(previous => {
			return previous.filter((taskObject , index) => index !== removeIndex)
		})
	}

	const renameTask = (index , newName) => {
		setTasks(previous => {
			const newTasks = [...previous]
			newTasks[index].name = newName
			return newTasks
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

	const getMessage = () => {
		const percentage = ((completedTasks / totalTasks) * 100);

		if(percentage === 0){
			return 'Get Started!'
		} else if (percentage === 100){
			return 'Hard Work Pays Off!'
		} else {
			return 'Keey Pushing!'
		}
	}

	const completedTasks = tasks.filter(task => task.done).length
	const totalTasks = tasks.length;

	return (
		<div className="main">
			<h1>{completedTasks}/{totalTasks} Completed Tasks!</h1>
			<h2>{getMessage()}</h2>

			<TaskForm onAdd={addTask} />

			{
				tasks.map((task, index) => (
					<Task {...task} onDelete={() => removeTask(index)} onToggle={done => updateTask(index , done)} onRename={newName => renameTask(index , newName)} />
				))
			}

		</div>
	);
}

export default App;
