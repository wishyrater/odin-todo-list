import { ProjectRegistry } from "./ProjectRegistry";
import { UIRenderer } from "./UIRenderer";

export const EventManager = (() => {

    const setProjectEventListeners = () => {
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

    

    return { setProjectEventListeners };

})();