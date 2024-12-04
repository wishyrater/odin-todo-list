import ProjectRegistry from "./ProjectRegistry";
import Project from "./Project";
import Task from "./Task";
const DataHandler = (() => {
    const storageAvailable = (type) => {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                storage &&
                storage.length !== 0
            );
        };
    };

    const populateStorage = () => {
        const projects = ProjectRegistry.getProjects();
        projects.forEach((project) => {
            localStorage.setItem(JSON.stringify(project.name), JSON.stringify(project.tasks));
        });
    };

    const fetchProjects = () => {
        if (storageAvailable("localStorage")) {
            for (let i = 0; i < localStorage.length; i++) {
                const project = new Project();
                project.name = JSON.parse(localStorage.key(i));
                const tasks = JSON.parse(localStorage.getItem(localStorage.key(i)));
                tasks.forEach((task) => {
                    const newTask = new Task(task._name, task._dueDate, task._priority, task._status);
                    project.addTask(newTask);
                });
                ProjectRegistry.addProject(project);
            };
            console.log(ProjectRegistry.getProjects());
        }
    }
    return { populateStorage, fetchProjects };

})();
export default DataHandler;