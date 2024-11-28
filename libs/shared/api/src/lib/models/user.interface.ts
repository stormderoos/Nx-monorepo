import { Id } from './id.type';

/**
 * Rol van de gebruiker (bijvoorbeeld fan of clubbeheerder)
 */
export enum UserRole {
  Fan = 'Fan',
  ClubManager = 'Clubbeheerder',
}

export enum UserGender{
  Male = 'Men',
  Female = 'female',
  Unknown = ''
}

/**
 * Informatie over een gebruiker
 */
export interface IUser {
  id: Id; // Unieke identifier
  username: string; // Gebruikersnaam
  email: string; // E-mailadres
  password: string; // Versleuteld wachtwoord
  role: UserRole; // Rol van de gebruiker
  gender: UserGender;
  profileImgUrl: string;
}

/**
 * Minimale informatie over een gebruiker
 */
export interface IUserIdentity {
  username: string; // Gebruikersnaam
  email: string; // E-mailadres
  role: UserRole; // Rol
}

/**
 * Data Transfer Object voor het aanmaken van een gebruiker
 */
export type ICreateUser = Pick<IUser, 'username' | 'email' | 'password' | 'role'>;

/**
 * Data Transfer Object voor het bijwerken van een gebruiker
 */
export type IUpdateUser = Partial<Omit<IUser, 'id' >>;

/**
 * Data Transfer Object voor het ophalen van alle gegevens van een gebruiker
 */
export type IUserInfo = IUser;