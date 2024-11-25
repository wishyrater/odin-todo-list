import Task from "./Task";
import Project from "./Project";
import ProjectRegistry from "./ProjectRegistry";
import UIRenderer from "./UIRenderer";
const EventHandler = (() => {

    // show project logic
    const handleProjectClick = (e) => {
        const index = e.target.getAttribute("data-index");
        const thisProject = ProjectRegistry.getProjects()[index];
        const titleHeader = document.querySelector("#title-header");
        titleHeader.textContent = thisProject.name;
        UIRenderer.renderTasks(thisProject);
        setAddTaskevents();
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
        if (dialog.returnValue !== "cancel") {
            const returnValues = JSON.parse(dialog.returnValue);
            if (dialogId === "add-project-dialog") {
                if (returnValues['project-name-input'] !== '' && returnValues['project-name-input'] !== undefined) {
                    ProjectRegistry.addProject(new Project(returnValues['project-name-input']));
                    UIRenderer.renderProjects();
                    setProjectEvents();
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
                    UIRenderer.renderTasks(thisProject);
                    setAddTaskevents();
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
            } else if (e.target.classList.contains("cancel-new-project-button")) {
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
            } else if (e.target.classList.contains('cancel-new-task-button')) {
                closeDialog(e, dialog, 'cancel');
            }
        });

        dialog.addEventListener("close", () => {
            handleDialogClose(dialog);
        });
    };

    return { setProjectEvents, setAddProjectEvents, setAddTaskevents };

})();

export default EventHandler;