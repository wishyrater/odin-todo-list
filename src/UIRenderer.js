export const UIRenderer = (() => {

    const clearContainer = (container) => {
        if (!container) {
            console.error("Container not found");
            return;
        }
        container.innerHTML = '';
    };

    const createProjectElement = (project) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.textContent = project.name;
        return projectItem;
    };

    const renderProjects = (projects) => {
        const projectsContainer = document.querySelector(".projects");
        clearContainer(projectsContainer);
        projects.forEach((project) => {
            // create container for this project item
            const projectItem = createProjectElement(project);
            projectsContainer.appendChild(projectItem);
        });
    };

    const createTaskElement = (task) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        
        const taskName = document.createElement("div");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;

        const taskDueDate = document.createElement("div");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = task.dueDate;

        const taskStatus = document.createElement("div");
        taskStatus.classList.add("task-status");
        taskStatus.textContent = task.status;

        taskItem.append(taskName, taskDueDate, taskStatus);
        return taskItem;
    };

    const renderTasks = (project) => {
        const tasksContainer = document.querySelector(".tasks-container");
        clearContainer(tasksContainer);
        project.tasks.forEach((task) => {
            const taskItem = createTaskElement(task);
            tasksContainer.appendChild(taskItem);
        });
    };

    return { renderProjects, renderTasks };
})();