export default class Task {
    constructor(name, dueDate, status) {
        this._name = name;
        this._dueDate = dueDate;
        this._status = status;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName !== '') this._name = newName;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(newDueDate) {
        if (newDueDate !== '') this._dueDate = newDueDate;
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        if (newStatus !== '') this._status = newStatus;
    }
};