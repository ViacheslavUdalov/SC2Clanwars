import {ITeam} from "./teamModel";

export interface ITournament {
  name: string,
  prizePool: string,
  teams: Array<ITeam>,
  avatar: string
}
