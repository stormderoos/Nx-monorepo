export interface IPlayer {
    _id: string; // Unieke identifier
    firstName: string; // Naam van de speler
    lastName: string;
    position: PlayerPosition; // Voeg hier de posities toe
    clubId?: string; // FK naar Club
    birthdate: Date; // Geboortedatum
  }

  export type IFindPlayer = Pick<IPlayer, 'firstName' | 'lastName' | 'birthdate'> & {
    position: string; // Hier wordt 'position' expliciet als string behandeld
  };
  export enum PlayerPosition{
    GK = 'GK',
    LB = 'LB',
    CB = 'CB',
    RB = 'RB',
    CDM = 'CDM',
    CM = 'CM',
    CAM = 'CAM',
    LW = 'LW',
    ST = 'ST',
    RW = 'RW',
    Unknown = ''
  }