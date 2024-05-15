import { useState } from 'react';
import SideBar from "./components/SideBar";
import NewProjectForm from "./components/NewProjectForm";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [view, setView] = useState("no project");
  const [projects, setProjects] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState(-1);

  function saveProject(project){
    setProjects(prevProjects => {
      prevProjects = prevProjects.map(proj => 
        {
          const updatedProject = {...proj};
          const updatedProjectTasks = updatedProject.tasks.map(task => {
            return {...task};
          });
          updatedProject.tasks = updatedProjectTasks;
          return updatedProject;
        }
      )
      project.id = Math.random();
      prevProjects.push(project);
      return prevProjects;
    })
  }

  function deleteProject(projectId){
    setProjects(prevProjects => {
      // const updatedProjects = prevProjects.map(proj => 
      //   {
      //     const updatedProject = {...proj};
      //     const updatedProjectTasks = updatedProject.tasks.map(task => {
      //       return {...task};
      //     });
      //     updatedProject.tasks = updatedProjectTasks;
      //     return updatedProject;
      //   }
      // )
      return prevProjects.filter(proj => proj.id !== projectId)
    })
    showDefaultPage();
  }

  function openForm(){
    setView("form");
  }

  function showDefaultPage(){
    setView("no project");
  }

  function viewProject(projectId){
    setView("project");
    setSelectedProjectID(projectId);
    // setSelectedProject(projects.filter(proj => proj.id === projectId)?.[0]);
  }

  function addTask(projectId, task){
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(proj => 
        {
          const updatedProject = {...proj};
          const updatedProjectTasks = updatedProject.tasks.map(task => {
            return {...task};
          });
          if(proj.id === projectId) updatedProjectTasks.push({id: Math.random(), description: task})
          updatedProject.tasks = updatedProjectTasks;
          return updatedProject;
        }
      )
      return updatedProjects;
    })
  }

  function removeTask(projectId,taskId){
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(proj => 
        {
          const updatedProject = {...proj};
          const updatedProjectTasks = updatedProject.tasks.map(task => {
            return {...task};
          });
          if(proj.id === projectId){
            updatedProject.tasks = updatedProjectTasks.filter(task => task.id !== taskId);
          }
          else
            updatedProject.tasks = updatedProjectTasks;
          return updatedProject;
        }
      )
      return updatedProjects;
    })
  }

  const selectedProject = projects.find(project => project.id === selectedProjectID);

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar openForm={openForm} projects={projects} getProject={viewProject} selectedProjectID={selectedProjectID} />
        {view === 'no project' && <NoProjectSelected openForm={openForm}/>}
        {view === 'form' && <NewProjectForm saveProject={saveProject} onCancel={showDefaultPage} />}
        {view === 'project' && <ProjectDetails project={selectedProject} deleteProject={deleteProject} addTask={addTask} removeTask={removeTask}/>}
      </main>
    </>
  );
}

export default App;
