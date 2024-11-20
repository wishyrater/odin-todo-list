export default class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        newName = newName.trim();
        if (newName === '') {
            throw 'Name cannot be empty';
        }
        this._name = newName;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(task) {
        this._tasks.push(task);
    }
};