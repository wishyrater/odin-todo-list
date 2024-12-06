import './style.css';
import Task from './Task';
import Project from './Project';
import ProjectRegistry from './ProjectRegistry';
import UIRenderer from './UIRenderer';
import EventHandler from './EventHandler';
import LocalStorage from './LocalStorage.js';

document.addEventListener("DOMContentLoaded", () => {
    // const taskOne = new Task("Task one", "2021-01-02", "High", "In progress");
    // const taskTwo = new Task("Task two", "2023-01-04", "Medium", "On hold");

    // const myProject = new Project("My project");
    // const myOtherProject = new Project("My other project");
    // myProject.addTask(taskOne);
    // myProject.addTask(taskTwo);

    // ProjectRegistry.addProject(myProject);
    // ProjectRegistry.addProject(myOtherProject);

    LocalStorage.populateStorage();
    LocalStorage.fetchProjects();

    UIRenderer.renderProjects();
    EventHandler.setProjectEvents();
    EventHandler.setAddProjectEvents();
    EventHandler.setUpcomingEvents();
});