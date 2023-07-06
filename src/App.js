import './App.css';
import TaskForm from './Components/Tasks/TaskForm'
import Task from './Components/Tasks/Task'

function App() {
	return (
		<div className="main">
			<TaskForm />
			<Task />
			<Task />
			<Task />
			<Task />
		</div>
	);
}

export default App;
