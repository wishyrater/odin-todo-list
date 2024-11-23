import { ProjectRegistry } from "./ProjectRegistry";
import { UIRenderer } from "./UIRenderer";

export const EventManager = (() => {

    const setNewProjectEvents = () => {
        const addProjectContainer = document.querySelector(".add-project-container");
        const newProjectDialog = document.querySelector("#new-project-dialog");
        addProjectContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-project")) {
                newProjectDialog.showModal();
            // } else if (e.target.classList.contains("cancel-new-project")) {
            //     //e.preventDefault();
            //     newProjectDialog.close();
            } else if (e.target.classList.contains("confirm-new-project")) {
                const newProjectName = document.querySelector("#new-project-name");
                e.preventDefault();
                newProjectDialog.close(newProjectName.value);
            };
        });

        newProjectDialog.addEventListener("close", () => {
            if (newProjectDialog.returnValue !== "default" && newProjectDialog.returnValue !== "cancel") {
                const newProject = ProjectRegistry.createNewProject(newProjectDialog.returnValue);
                ProjectRegistry.addProject(newProject);
                UIRenderer.renderProjects(ProjectRegistry.getAllProjects());
            }
            newProjectDialog.value = '';
        });
    };

    const setProjectEvents = () => {
        const projects = document.querySelectorAll(".project-item");
        projects.forEach((project) => {
            project.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (index > -1) {
                    UIRenderer.renderTasks(ProjectRegistry.getProject(index));
                }
            })
        });
    };

    const setTaskEvents = () => {
        const taskContainer = document.querySelector(".tasks-container");
        taskContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("task-name")) {
                
            } else if (e.target.classList.contains("task-due-date")) {

            } else if (e.target.classList.contains("task-status")) {

            } else if (e.target.classList.contains("task-done")) {

            }
        });
    };

    return { setNewProjectEvents, setProjectEvents, setTaskEvents };
})();