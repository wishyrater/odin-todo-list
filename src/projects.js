class Projects {
    constructor(){
        this._projects = [];
    }

    addProject(project) {
        this._projects.push(project);
    }

    get projects() {
        return this._projects;
    }
};

class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    get name() {
        return this._name;
    }

    addTask(task) {
        this._tasks.push(task);
    }
};