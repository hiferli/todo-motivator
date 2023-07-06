import './App.css';
import TaskForm from './Components/Tasks/TaskForm'
import Task from './Components/Tasks/Task'
import { useState } from 'react';

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
