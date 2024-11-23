import ProjectRegistry from "./ProjectRegistry";
const UIRenderer = (() => {

    const clearContainer = (container) => {
        if (!container) {
            console.error("Container not found");
            return;
        }
        container.innerHTML = '';
    };

    const createProjectItem = (project) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.setAttribute("data-index", ProjectRegistry.getProjects().indexOf(project));
        projectItem.textContent = project.name;
        return projectItem;
    };

    const renderProjects = () => {
        const projectsContainer = document.querySelector(".projects");
        clearContainer(projectsContainer);
        ProjectRegistry.getProjects().forEach((project) => {
            const projectItem = createProjectItem(project);
            projectsContainer.appendChild(projectItem);
        });
    };

    const createTaskItem = (task) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskName = document.createElement("div");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;

        const taskDueDate = document.createElement("div");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = task.dueDate;

        const taskPriority = document.createElement("div");
        taskPriority.classList.add("task-priority");
        taskPriority.textContent = task.priority;

        const taskStatus = document.createElement("div");
        taskStatus.classList.add("task-status");
        taskStatus.textContent = task.status;

        const taskDone = document.createElement("div");
        taskDone.classList.add("task-done");
        const taskDoneBox = document.createElement("input");
        taskDoneBox.type = 'checkbox';
        taskDoneBox.classList.add('task-done-box');
        taskDone.appendChild(taskDoneBox);

        taskItem.append(taskName, taskDueDate, taskPriority, taskStatus, taskDone);

        return taskItem;
    };

    const renderTasks = (project) => {
        const tasksContainer = document.querySelector(".tasks-container");
        clearContainer(tasksContainer);
        project.tasks.forEach((task) => {
            const taskItem = createTaskItem(task);
            taskItem.setAttribute("data-index", project.tasks.indexOf(task));
            tasksContainer.appendChild(taskItem);
        });
    };

    return { renderProjects, renderTasks };
})();

export default UIRenderer;