export interface IMatch {
    _id: number; // Unieke identifier van de wedstrijd
    date: Date; // Datum en tijd van de wedstrijd (ISO string of timestamp)
    location: string; // Locatie van de wedstrijd
    home_club_id: string; // ID van de thuisclub
    away_club_id: string; // ID van de uitclub
    score_home: number | null; // Doelpunten van de thuisclub
    score_away: number | null; // Doelpunten van de uitclub
  }

export type IFindMatch = Pick<IMatch, 'date' | 'location' | 'home_club_id'| 'away_club_id'> 

export type IGetScore = Pick<IMatch, 'date' | 'location' | 'home_club_id'| 'away_club_id' | 'score_home' | 'score_away'>
