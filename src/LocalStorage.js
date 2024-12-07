import ProjectRegistry from "./ProjectRegistry";
import Project from "./Project";
import Task from "./Task";
const LocalStorage = (() => {

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
            localStorage.setItem(project.name, JSON.stringify(project.tasks));
        });
    };
    
    const clearStorage = () => {
        if (storageAvailable("localStorage")) {
            localStorage.clear();
        };
    };

    const isValidJSON = (text) => {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    };

    const fetchProjects = () => {
        if (storageAvailable("localStorage")) {
            for (let i = 0; i < localStorage.length; i++) {
                if (isValidJSON(localStorage.getItem(localStorage.key(i)))) {
                    const project = new Project();
                    project.name = localStorage.key(i);
                    const tasks = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    tasks.forEach((task) => {
                        const newTask = new Task(task._name, task._dueDate, task._priority, task._status);
                        project.addTask(newTask);
                    });
                    ProjectRegistry.addProject(project);
                };
            };
        };
    };
    return { populateStorage, fetchProjects, clearStorage };

})();
export default LocalStorage;