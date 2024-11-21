import { Injectable } from "@angular/core";
import { User, UserRole } from "./user.model";


@Injectable({
    providedIn: 'root',
})
export class UserService{
    readonly users: User[] = [
        {
            id: 0,
            firstName: 'user',
            lastName: 'een',
            emailAdress: 'usereen@host.com',
            role: UserRole.admin
        },
        {
            id: 1,
            firstName: 'user',
            lastName: 'twee',
            emailAdress: 'usertwee@host.com',
            role: UserRole.guest
        },
        {
            id: 2,
            firstName: 'user',
            lastName: 'drie',
            emailAdress: 'userdrie@host.com',
            role: UserRole.editor
        }
    ];

    constructor(){
        console.log('service constructor aangeroepen');
    }

    getUsers(): User[]{
        console.log('getUsers aanroepen');
        return this.users
    }

    getUserById(id: number): User {
        console.log('getUserById aanroepen');
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}
