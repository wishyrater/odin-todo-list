export const ProjectRegistry = (() => {
    
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
    };

    const removeProject = (project) => {
        const index = projects.indexOf(project);
        if (index > -1) projects.splice(index, 1);
    };

    const getProjectIndex = (project) => {
        return projects.indexOf(project);
    }

    const getProject = (index) => {
        return projects.at(index);
    }

    const getAllProjects = () => {
        return projects;
    };

    return { addProject, removeProject, getProjectIndex, getProject, getAllProjects };
})();