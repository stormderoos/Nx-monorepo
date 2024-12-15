// import { Component, OnInit } from '@angular/core';
// import { FanClubService } from '../fanclub.service';

// interface FanClub {
//   id: number;
//   userId: number;
//   userName: string;
//   clubId: number;
//   clubName: string;
//   joinedAt: string;
// }

// @Component({
//   selector: 'avans-nx-workshop-fanclub-list',
//   templateUrl: './fanclub-list.component.html',
//   styleUrls: ['./fanclub-list.component.css']
// })
// export class FanclubListComponent implements OnInit {
//   fanClubs: FanClub[] = [];
  
//   constructor(private fanClubService: FanClubService) {}

//   ngOnInit(): void {
//     this.getFanClubs();
//   }

//   getFanClubs(): void {
//     this.fanClubService.getFanClubs().subscribe((data: FanClub[]) => {
//       this.fanClubs = data;
//     });
//   }
// }
