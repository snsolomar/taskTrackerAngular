export interface Task {
    // id is optional
    id?: number;
    text: string;
    day: string;
    reminder: boolean;
}