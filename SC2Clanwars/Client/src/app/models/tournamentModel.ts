import {ITeam} from "./teamModel";

export interface ITournament {
  id: string,
  name: string,
  prizePool?: string,
  teams?: Array<ITeam>,
  avatar?: string
}
