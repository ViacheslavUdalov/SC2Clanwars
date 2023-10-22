import {ITeam} from "./teamModel";
import {IUser} from "./IUser";

export interface ITournament  {
  // все данные должны быть с маленькой буквы, иначе они будут undefined;
  id: string,
  name: string,
  prizePool: string,
  teams: Array<ITeam>,
  avatar: string,
  players: Array<IUser>,
  creatorId: string
}
export interface FormCreateTournament {
  name: string,
  prizePool?: string,
  avatar?: string,
}
