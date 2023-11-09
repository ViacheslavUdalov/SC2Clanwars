import {IUser} from "./IUser";

export interface ITeam {
  name: string,
  players: Array<string>,
  creatorId: string,
  id: string,
  avatar: string
}
