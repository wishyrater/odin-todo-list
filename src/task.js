export default class Task {
    constructor(name, description, dueDate, status) {
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._status = status;
        this._done = false;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        newName = newName.trim();
        if (newName === '') {
            throw 'The name cannot be empty';
        }
        this._name = newName;
    };

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get status() {
        return this._status;
    }

    get done() {
        return this._done;
    }
}