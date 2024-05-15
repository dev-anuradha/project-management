import { useRef, useState } from "react";
import Tasks from "./Tasks";

function getFormattedDate(dateStr){
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date(dateStr).toLocaleDateString('en-US', options);
    return formattedDate;
}

export default function ProjectDetails({project, deleteProject, addTask, removeTask}){
    // const project = projects.filter(proj => proj.id === projectId)?.[0];
    if(!project || Object.keys(project).length === 0)return;

    const formattedDueDate = getFormattedDate(project.dueDate);
    function handleAddTask(task){
        if(task == '') return;
        addTask(project.id, task);
    }

    function handleRemoveTask(taskId){
        removeTask(project.id, taskId);
    }

    function handleDelete(){
        deleteProject(project.id);
    }

    return (
        <>
            <div className="w-[35rem] mt-16">
                <header className="pb-4 mb-4 border-b-2 border-stone-300">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-stone-600 mb-2">
                            {project.title}
                        </h1>
                        <button onClick={handleDelete} className="text-stone-600 hover:text-stone-950">
                            Delete
                        </button>
                    </div>
                    <p className="mb-4 text-stone-400">
                        {formattedDueDate}
                    </p>
                    <p className="text-stone-600 whitespace-pre-wrap">
                        {project.description}
                    </p>
                </header>
                <Tasks handleAddTask={handleAddTask} handleRemoveTask={handleRemoveTask} tasks={project.tasks}/>
            </div>
        </>
    )
}