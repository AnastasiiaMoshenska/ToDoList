import Category from "../model/Category";
import Task from "../model/Task";

export class RestClient{
    static baseUrl = "http://localhost:8080"

    static async getCategories(): Promise<Category[]>{
        const url = `${RestClient.baseUrl}/categories`;
        const response = await fetch(url);
        return await response.json();
    }

    static async getTasks(): Promise<Task[]>{
        const url = `${RestClient.baseUrl}/tasks`;
        const response = await fetch(url);
        return await response.json();
    }

    static async addTask(task: Task){
        const url = `${RestClient.baseUrl}/tasks`;
        return await fetch(url, {
            method: "Post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        });
    }

    static async deleteTask(id: number){
        const url = `${RestClient.baseUrl}/tasks/${id}`;
        return await fetch(url, {
            method: "Delete"
        })
    }

    static async updateTask(task: Task){
        const url = `${RestClient.baseUrl}/tasks/${task.id}`;
        return await fetch(url,
            {
                method: "Put",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify(task)
            })
    }

}