import { Component, OnInit } from "@angular/core";
import { User, UserService } from "../user.service";

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
    users: User[] = []; // Array om gebruikers op te slaan
    loading = true; // Laadstatus
    
    constructor(private userService: UserService) {}
  
    ngOnInit(): void {
        this.userService.getUsers().subscribe({
          next: (data) => {
            console.log('Users:', data);  // Toegevoegd voor debugging
            this.users = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching users:', err);
            this.loading = false;
          }
        });
      }
}