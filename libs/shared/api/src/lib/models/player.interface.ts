export interface IPlayer {
    id: number; // Unieke identifier
    name: string; // Naam van de speler
    birth_date: Date; // Geboortedatum
    position: string; // Positie op het veld
    club_id: number; // FK naar Club
  }