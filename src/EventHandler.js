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

    return { setProjectEvents, }

})();

export default EventHandler;