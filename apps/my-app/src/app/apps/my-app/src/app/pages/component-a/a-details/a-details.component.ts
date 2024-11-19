import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'avans-nx-workshop-a-details',
  templateUrl: './a-details.component.html',
  styleUrls: ['./a-details.component.css']
})
export class ADetailsComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Haal de ID-parameter uit de URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.user = this.userService.getUserById(id);
    }
  }
}