import './App.css';
import TaskForm from './Components/Tasks/TaskForm'
import Task from './Components/Tasks/Task'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [tasks, setTasks] = useState([]);

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);


	const addTask = (name) => {
		getMessage();
		setTasks(previous => {
			return [...previous, {
				name: name,
				done: false
			}];
		})
	}

	const updateTask = (taskIndex, updatedStatus) => {
		setTasks(previous => {
			const newTasks = [...previous]
			newTasks[taskIndex].done = updatedStatus
			getMessage();
			return newTasks
		})
	}
	
	const removeTask = (removeIndex) => {
		getMessage();
		setTasks(previous => {
			return previous.filter((taskObject, index) => index !== removeIndex)
		})
	}
	
	const renameTask = (index, newName) => {
		setTasks(previous => {
			const newTasks = [...previous]
			newTasks[index].name = newName
			return newTasks
		})
	}

	useEffect(() => {
		getMessage();
	}, []);

	useEffect(() => {
		if (tasks.length !== 0) {
			localStorage.setItem("tasks", JSON.stringify(tasks))
		}
	}, [tasks])

	useEffect(() => {
		const localStorageTasks = JSON.parse(localStorage.getItem("tasks"))
		setTasks(localStorageTasks);
	}, [])



	const randomNumberGeneration = (choiceLength) => {
		return Math.floor(Math.random() * choiceLength);
	}


	const getMessage = async () => {
		try {
			const response = await axios.get(`https://type.fit/api/quotes`);
			// console.log(response.data.length)
			setData(response.data[randomNumberGeneration(response.data.length)].text);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	}

	const completedTasks = tasks.filter(task => task.done).length
	const totalTasks = tasks.length;

	return (
		<div className="main">
			<h1>{completedTasks}/{totalTasks} Completed Tasks!</h1>

			<div>
				{loading ? (
					<p className='quote'>Loading...</p>
				) : data ? (
					<div>
						<h3 className='quote'>{data}</h3>
					</div>
				) : (
					<p>.</p>
				)}
			</div>


			<TaskForm onAdd={addTask} />

			{
				tasks.map((task, index) => (
					<Task key={index} {...task} onDelete={() => removeTask(index)} onToggle={done => updateTask(index, done)} onRename={newName => renameTask(index, newName)} />
				))
			}

		</div>
	);
}

export default App;
