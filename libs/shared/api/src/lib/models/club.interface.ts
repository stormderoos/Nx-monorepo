import { IPlayer } from "./player.interface";

export interface IClub {
    _id: string; // Unieke identifier
    name: string; // Naam van de club
    location: string; // Stad waar de club is gevestigd
    logoUrl: string;
    players: string[] | undefined;
}

export type IFindClub = Pick<IClub, 'name' | 'location' | 'logoUrl'| 'players'>;

export type ICreateClub = Pick<IClub, 'name' | 'location' | 'logoUrl'| 'players'>;


