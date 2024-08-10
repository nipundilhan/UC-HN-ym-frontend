import { Tsk } from './Task'; // Adjust the path if necessary

export interface StudentTasks{
    _id : null | string,
    studentId : null | string,
    moduleCode : null | string,
    gameCode : null | string,
    tasks: Tsk[];  // Array of Task objects
 }