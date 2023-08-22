import { ITask } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";
import classNames from "classnames";

type Props = {
	tasks: ITask[];
};

function Tasks({ tasks }: Props) {
	return (
		!!tasks.length && (
			<ol>
				{tasks.map((task) => (
					<Task
						task={task}
						key={task.id}
					/>
				))}
			</ol>
		)
	);
}

export default Tasks;
