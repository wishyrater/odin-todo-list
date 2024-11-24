import Project from "./Project";
import ProjectRegistry from "./ProjectRegistry";
import UIRenderer from "./UIRenderer";
const EventHandler = (() => {

    const handleProjectClick = (e) => {
        const index = e.target.getAttribute("data-index");
        const thisProject = ProjectRegistry.getProjects()[index];
        const titleHeader = document.querySelector("#title-header");
        titleHeader.textContent = thisProject.name;
        UIRenderer.renderTasks(thisProject);
    }

    const setProjectEvents = () => {
        const projects = document.querySelectorAll(".project-item");
        projects.forEach((project) => {
            project.addEventListener("click", (e) => { handleProjectClick(e) });
        });
    };

    const openDialog = (dialog) => {
        dialog.showModal();
    };

    const closeDialog = (e, dialog, returnValue) => {
        e.preventDefault();
        dialog.close(returnValue);
    };

    const handleDialogClose = (dialog) => {
        const dialogId = dialog.getAttribute("id");
        if (dialogId === "add-project-dialog") {
            if (dialog.returnValue !== "cancel" && dialog.returnValue !== "") {
                ProjectRegistry.addProject(new Project(dialog.returnValue));
                UIRenderer.renderProjects();
                setProjectEvents();
            };
        };
    };

    const setAddProjectEvents = () => {
        const container = document.querySelector(".add-project-container");
        const dialog = document.getElementById("add-project-dialog");
        const input = document.getElementById("project-name-input");
        container.addEventListener("click", (e) => {
            if (!dialog.open) {
                openDialog(dialog);
            } else if (e.target.classList.contains("confirm-new-project-button")) {
                closeDialog(e, dialog, input.value);
            } else if (e.target.classList.contains("cancel-new-project-button")) {
                closeDialog(e, dialog, "cancel");
            }
        });

        dialog.addEventListener("close", () => {
            handleDialogClose(dialog);
        });
    } ;

    return { setProjectEvents, setAddProjectEvents }

})();

export default EventHandler;