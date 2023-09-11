import {ITeams} from "./Teams-model";

export interface ITournament {
  name: string,
  prizePool: string,
  teams: Array<ITeams>,
  avatar: string
}
