export default function TaskList({tasks, removeTask}){
    return (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map(task => {
                return <li className="flex justify-between my-4" key={task.id}>
                    <span>{task.description}</span>
                    <button onClick={() => removeTask(task.id)} className="text-stone-700 hover:text-red-500">
                        Clear
                    </button>
                </li>
            })}
        </ul>
    )
}