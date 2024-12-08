import Task from "./Task";
import Project from "./Project";
import ProjectRegistry from "./ProjectRegistry";
import UIRenderer from "./UIRenderer";
import Sorter from "./Sorter";
import LocalStorage from "./LocalStorage";
const EventHandler = (() => {

    // show project logic
    const handleProjectClick = (e) => {
        const index = e.target.getAttribute("data-index");
        const thisProject = ProjectRegistry.getProjects()[index];
        const titleHeader = document.querySelector("#title-header");
        titleHeader.textContent = thisProject.name;
        UIRenderer.renderTasks(thisProject.tasks, true, index);
        LocalStorage.setActiveProject(thisProject);
        setEditTaskEvents();
        setAddTaskevents();
        setDeleteProjectClick();
    }

    const setProjectEvents = () => {
        const projects = document.querySelectorAll(".project-item");
        projects.forEach((project) => {
            project.addEventListener("click", (e) => { handleProjectClick(e) });
        });
    };
    // show project logic END

    // add project logic
    const openDialog = (dialog) => {
        dialog.showModal();
    };

    const closeDialog = (e, dialog, input) => {
        e.preventDefault();
        if (input === 'confirm') {
            const dialogInputs = dialog.querySelectorAll("input, select, textarea");
            const returnValues = {};
            dialogInputs.forEach((input) => {
                returnValues[input.name] = input.value;
                input.value = '';
            });
            dialog.close(JSON.stringify(returnValues));
        } else if (input === 'cancel') {
            dialog.close('cancel');
        }
    };

    const handleDialogClose = (dialog) => {
        const dialogId = dialog.getAttribute("id");
        if (dialog.returnValue !== "cancel" && dialog.returnValue !== undefined && dialog.returnValue !== "") {
            const returnValues = JSON.parse(dialog.returnValue);
            if (dialogId === "add-project-dialog") {
                if (returnValues['project-name-input'] !== '' && returnValues['project-name-input'] !== undefined) {
                    ProjectRegistry.addProject(new Project(returnValues['project-name-input']));
                    UIRenderer.renderProjects();
                    setProjectEvents();
                    LocalStorage.populateStorage();
                    setDeleteProjectClick();
                }
            } else if (dialogId === 'add-task-dialog') {
                if (returnValues['task-name-input'] !== '' && returnValues['task-name-input'] !== undefined) {
                    const newTask = new Task(
                        returnValues['task-name-input'],
                        returnValues['task-due-date-input'] ? returnValues['task-due-date-input'] : 'No due date',
                        returnValues['task-priority-input'] ? returnValues['task-priority-input'] : 'Low',
                        returnValues['task-status-input'] ? returnValues['task-status-input'] : 'In progress'
                    );
                    const thisProject = ProjectRegistry.getProjects().find((currentValue) => {
                        if (currentValue.name === document.getElementById("title-header").textContent) {
                            return true;
                        } else {
                            return false;
                        };
                    });
                    thisProject.addTask(newTask);
                    UIRenderer.renderTasks(thisProject.tasks);
                    localStorage.setItem("activeProject", JSON.stringify(thisProject.tasks));
                    setAddTaskevents();
                    setEditTaskEvents();
                    LocalStorage.populateStorage();
                    setDeleteProjectClick();
                };
            } else if (dialogId === 'edit-task-dialog') {
                if (returnValues['edit-task-name-input'] !== '' && returnValues['edit-task-name-input'] !== undefined) {
                    const thisProject = ProjectRegistry.getProjects().find((currentValue) => {
                        if (currentValue.name === document.getElementById("title-header").textContent) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    const task = thisProject.tasks.at(dialog.getAttribute("data-index"));
                    task.name = returnValues['edit-task-name-input'] ? returnValues['edit-task-name-input'] : task.name;
                    task.dueDate = returnValues['edit-task-due-date-input'] ? returnValues['edit-task-due-date-input'] : task.dueDate;
                    task.priority = returnValues['edit-task-priority-input'] ? returnValues['edit-task-priority-input'] : task.priority;
                    task.status = returnValues['edit-task-status-input'] ? returnValues['edit-task-status-input'] : task.status;
                    UIRenderer.renderTasks(thisProject.tasks);
                    setProjectEvents();
                    setEditTaskEvents();
                    setAddTaskevents();
                    LocalStorage.populateStorage();
                    setDeleteProjectClick();
                };
            }; 
        };
    };

    const setAddProjectEvents = () => {
        const container = document.querySelector(".add-project-container");
        const dialog = document.getElementById("add-project-dialog");
        container.addEventListener("click", (e) => {
            if (!dialog.open) {
                openDialog(dialog);
            } else if (e.target.classList.contains("confirm-new-project-button")) {
                closeDialog(e, dialog, 'confirm');
            } else if (e.target.classList.contains("cancel-new-project-button" || e.key === "Escape")) {
                closeDialog(e, dialog, 'cancel');
            }
        });

        dialog.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeDialog(e, dialog, 'cancel');
            }
        });

        dialog.addEventListener("close", () => {
            handleDialogClose(dialog);
        });
    };
    // add project logic END

    // add task logic
    const setAddTaskevents = () => {
        const container = document.querySelector(".add-task-container");
        const dialog = document.getElementById("add-task-dialog");
        container.addEventListener("click", (e) => {
            if (!dialog.open) {
                dialog.showModal();
            }
        });

        dialog.addEventListener("click", (e) => {
            if (e.target.classList.contains("confirm-new-task-button")) {
                closeDialog(e, dialog, 'confirm');
            } else if (e.target.classList.contains('cancel-new-task-button') || e.key === "Escape") {
                closeDialog(e, dialog, 'cancel');
            }
        });

        dialog.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeDialog(e, dialog, 'cancel');
            }
        });

        dialog.addEventListener("close", () => {
            handleDialogClose(dialog);
        });
    };
    // add task logic END

    // change task details
    const openEditTaskDialog = (taskIndex) => {
        const titleHeader = document.getElementById("title-header").textContent;
        if (titleHeader !== "Upcoming") {
            const task = ProjectRegistry.getProjects().find((currentValue) => {
                if (currentValue.name === titleHeader) {
                    return true;
                } else {
                    return false;
                }
            }).tasks.at(taskIndex);
            const editTaskDialog = document.getElementById("edit-task-dialog");
            document.getElementById("edit-task-name-input").value = task.name;
            if (task.dueDate !== 'No due date') document.getElementById("edit-task-due-date-input").value = task.dueDate;
            document.getElementById("edit-task-priority-input").value = task.priority;
            document.getElementById("edit-task-status-input").value = task.status;
            editTaskDialog.setAttribute("data-index", taskIndex);
            editTaskDialog.showModal();
        }
    };

    const setEditTaskEvents = () => {
        const tasksContainer = document.querySelector(".tasks-container");
        const editTaskDialog = document.getElementById("edit-task-dialog");
        tasksContainer.addEventListener("click", (e) => {
            const taskItem = e.target.closest('.task-item');
            if (taskItem && !e.target.classList.contains("task-done-box")) {
                openEditTaskDialog(taskItem.getAttribute("data-index"));
            } else if (taskItem && e.target.classList.contains("task-done-box")) {
                const thisProject = ProjectRegistry.getProjects().find((currentValue) => {
                    if (currentValue.name === taskItem.getAttribute("parent-project"))
                        {
                            return true
                        } else {
                            return false;
                        };
                });
                console.log(thisProject);
                if (thisProject.tasks[taskItem.getAttribute("data-index")]) {
                    setTimeout(() => taskItem.remove(), 500);
                    taskItem.style.opacity = '0';
                    thisProject.removeTask(taskItem.getAttribute("data-index"));        
                }
                LocalStorage.clearStorage();
                LocalStorage.populateStorage();
            }
        });

        editTaskDialog.addEventListener("click", (e) => {
            if (e.target.classList.contains("save-edit-task-button")) {
                closeDialog(e, editTaskDialog, 'confirm');
            } else if (e.target.classList.contains("cancel-edit-task-button")) {
                closeDialog(e, editTaskDialog, 'cancel');
            }
        });

        editTaskDialog.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeDialog(e, editTaskDialog, 'cancel');
            }
        });

        editTaskDialog.addEventListener("close", () => {
            handleDialogClose(editTaskDialog);
        });
    };

    // handle upcoming click
    const setUpcomingEvents = () => {
        const upcoming = document.querySelector(".upcoming-container");
        upcoming.addEventListener("click", () => {
            let tasks = [];
            const projects = ProjectRegistry.getProjects();
            projects.forEach((project) => {
                tasks = tasks.concat(project.tasks);
            });
            const sortedTasks = Sorter.sortByDate(tasks);
            UIRenderer.renderTasks(sortedTasks, false, undefined, false);
            const titleHeader = document.querySelector("#title-header");
            titleHeader.textContent = "Upcoming";
            localStorage.removeItem("activeProject");
            setProjectEvents();
        });
    };

    // handle delete project click
    const setDeleteProjectClick = () => {
        const deleteProjectContainer = document.querySelector(".delete-project-container");
        if (deleteProjectContainer) {
            deleteProjectContainer.addEventListener("click", (e) => {
                const projectIndex = document.querySelector(".delete-project-container").getAttribute("project-index");
                const thisProject = ProjectRegistry.getProjects().at(projectIndex);
                for (let i = 0; i < thisProject.tasks.length; i++) {
                    thisProject.removeTask(i);
                }
                ProjectRegistry.removeProject(projectIndex);
                LocalStorage.clearStorage();
                LocalStorage.populateStorage();
                UIRenderer.renderTasks([], false);
                UIRenderer.renderProjects();
                setProjectEvents();
            });
        }
    }

    return { setProjectEvents, setAddProjectEvents, setAddTaskevents, setEditTaskEvents, setUpcomingEvents, setDeleteProjectClick };

})();

export default EventHandler;