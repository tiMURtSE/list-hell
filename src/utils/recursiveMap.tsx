import { ITask } from "../types";

export const recursiveMap = (task: ITask) => {
	if (task.subTasks.length) {
		return (
			<li key={task.id}>
				{task.isCompleted ? <del>{task.value}</del> : task.value}

				<ul>{task.subTasks.map((subTask) => recursiveMap(subTask))}</ul>
			</li>
		);
	} else {
		return <li key={task.id}>{task.isCompleted ? <del>{task.value}</del> : task.value}</li>;
	}
};
