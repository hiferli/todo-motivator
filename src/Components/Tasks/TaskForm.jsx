import React, { useState } from 'react'

const TaskForm = () => {
	const [taskName, setTaskName] = useState('')
	return (
		<div>
			<form>
				<button>+</button>
				<input
					type="text"
					placeholder='Your Next Task!'
					onChange={(e) => setTaskName(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default TaskForm