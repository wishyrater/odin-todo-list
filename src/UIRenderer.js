import ProjectRegistry from "./ProjectRegistry";
import PlusSmall from './images/plus-small.svg';
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

    const createEditTaskDialog = () => {
        const dialogHTML = `
            <dialog id="edit-task-dialog">
                <form method="dialog" id="edit-task-form">
                    <div class="task-inputs">
                        <div class="task-input-item">
                            <label for="edit-task-name-input">Task name</label>
                            <input autofocus type="text" id="edit-task-name-input" name="edit-task-name-input">
                        </div>
                        <div class="task-input-item">
                            <label for="edit-task-due-date-input">Due date</label>
                            <input type="date" id="edit-task-due-date-input" name="edit-task-due-date-input" novalidate>
                        </div>
                        <div class="task-input-item">
                            <label for="edit-task-priority-input">Priority</label>
                            <select id="edit-task-priority-input" name="edit-task-priority-input">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="task-input-item">
                            <label for="edit-task-status-input">Status</label>
                            <select id="edit-task-status-input" name="edit-task-status-input">
                                <option value="On hold">On hold</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <div class="task-input-buttons">
                        <button class="cancel-edit-task-button">Cancel</button>
                        <button class="save-edit-task-button">Save</button>
                    </div>
                </form>
            </dialog>
        `;
        return dialogHTML.trim();
    }

    const createAddTaskContainer = () => {
        // prompt part
        const addTaskHTML = `
            <div class="add-task-container">
                <div class="add-task-icon-container">
                    <img id="add-task-icon" src="${PlusSmall}" alt="Add task icon"/>
                </div>
                <div class="add-task-text-container">Add task</div>
            </div>
            <dialog id="add-task-dialog">
                <form method="dialog" id="add-task-form">
                    <div class="task-inputs">
                        <div class="task-input-item">
                            <label for="task-name-input">Task name</label>
                            <input autofocus type="text" id="task-name-input" name="task-name-input">
                        </div>
                        <div class="task-input-item">
                            <label for="task-due-date-input">Due date</label>
                            <input type="date" id="task-due-date-input" name="task-due-date-input">
                        </div>
                        <div class="task-input-item">
                            <label for="task-priority-input">Priority</label>
                            <select id="task-priority-input" name="task-priority-input">
                                <option value="">Select</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="task-input-item">
                            <label for="task-status-input">Status</label>
                            <select id="task-status-input" name="task-status-input">
                                <option value="">Select</option>
                                <option value="On hold">On hold</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <div class="task-input-buttons">
                        <button class="cancel-new-task-button">Cancel</button>
                        <button class="confirm-new-task-button">Confirm</button>
                    </div>
                </form>
            </dialog>
            `.replace(/\s\s+/g, " ");
        return addTaskHTML.trim();
    };

    const renderTasks = (tasks) => {
        const tasksContainer = document.querySelector(".tasks-container");
        clearContainer(tasksContainer);
        let i = 0;
        tasks.forEach((task) => {
            const taskItem = createTaskItem(task);
            taskItem.setAttribute("data-index", i);
            i++;
            tasksContainer.appendChild(taskItem);
        });
        const editTaskHTML = createEditTaskDialog();
        tasksContainer.innerHTML += editTaskHTML;
        const addTask = createAddTaskContainer();
        tasksContainer.innerHTML += addTask;
    };

    return { renderProjects, renderTasks };
})();

export default UIRenderer;