export const ProjectRegistry = () => {
    
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
    };

    const removeProject = (project) => {
        const index = projects.indexOf(project);
        if (index > -1) projects.splice(index, 1);
    };

    const getProjects = () => {
        return projects;
    };

    return { addProject, removeProject, getProjects };
};