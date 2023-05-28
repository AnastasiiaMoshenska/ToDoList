import Category from "./Category";

export default interface Task{
    id: number,
    name: string,
    description: string,
    deadline: Date,
    category: Category

}