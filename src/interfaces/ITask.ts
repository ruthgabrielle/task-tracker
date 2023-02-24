import IProject from "./IProject";

export default interface ITask{
    id: number;
    timeSeconds: number;
    description: string;
    project: IProject;
}