import { Pipe, PipeTransform } from '@angular/core';
import {ITournament} from "../models/tournamentModel";

@Pipe({
  name: 'filterTournaments'
})
export class FilterTournamentsPipe implements PipeTransform {

  transform(tournaments: ITournament[], search: string): ITournament[] {
    if (search.length === 0) return tournaments
    return tournaments.filter(tournament => tournament.name.toLowerCase().includes(search.toLowerCase()));
  }

}
