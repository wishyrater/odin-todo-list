import Project from "./Project";
const ProjectRegistry = (() => {

    const projects = [];

    const getProjects = () => {
        return projects;
    };

    const addProject = (project) => {
        if (project instanceof Project) projects.push(project);
    };

    const removeProject = (index) => {
        if (index > -1 && index < projects.length) projects.splice(index, 1);
    }

    return { getProjects, addProject, removeProject }
})();

export default ProjectRegistry;