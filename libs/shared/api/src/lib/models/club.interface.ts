export interface IClub {
    id: number; // Unieke identifier
    name: string; // Naam van de club
    location: string; // Stad waar de club is gevestigd
    logoUrl: string;
}

export type ICreateClub = Pick<IClub, 'name' | 'location' | 'logoUrl'>;
