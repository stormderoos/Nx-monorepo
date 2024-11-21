import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
    selector: 'avans-nx-workshop-a-list',
    templateUrl: './a-list.component.html',
    styleUrls: ['./a-list.component.css'],
})

export class AListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }
}