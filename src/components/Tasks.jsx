import NewTask from "./NewTask";
import TaskList from "./TaskList";

export default function Tasks({handleAddTask, handleRemoveTask, tasks}){
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Tasks
            </h2>
            <NewTask handleAddTask={handleAddTask}/>
            {tasks.length === 0 && <p className="text-stone-800 my-4">
                This project does not have any tasks yet.
            </p>}
            {tasks.length > 0 && <TaskList tasks={tasks} removeTask={handleRemoveTask} />}
        </section>
    )
}