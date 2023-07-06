import React, { useState } from 'react'

const TaskForm = ({ onAdd }) => {
	const [taskName, setTaskName] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault();
		onAdd(taskName);
		setTaskName('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<button>+</button>
			<input
				type="text"
				placeholder='Your Next Task!'
				onChange={(e) => setTaskName(e.target.value)}
			/>
		</form>
	)
}

export default TaskForm