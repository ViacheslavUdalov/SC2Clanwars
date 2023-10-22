import {Component, OnInit} from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IUser} from "../../../models/IUser";
@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.less']
})
export class CreateTournamentComponent implements OnInit {
  userId: string;
  tournamentForm: FormGroup;
  tournament: ITournament = {
    id: '',
    name: '',
    prizePool: '',
    avatar: '',
    teams: [],
    players: [],
    creatorId: ''
  };
  isCreating: boolean = true;

  constructor(private tournamentService: TournamentsService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private allUserDataService: AllUsersDataService) {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') as string;
    }
    if (sessionStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') as string;
    }
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      prizePool: [''],
      avatar: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tournamentId = params.get("id");
      if (tournamentId) {
        this.tournament.id = tournamentId;
        this.isCreating = false;
      }
    })
    this.tournamentService.getOneTournament(this.tournament.id)
      .subscribe((loadedTournament: ITournament) => {
        this.tournament = loadedTournament;
      })

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
  }

  onSubmit() {
    if (this.isCreating) {
      if (this.tournamentForm.valid) {
        const tournamentData = this.tournamentForm.value;
        this.tournamentService.createTournament(tournamentData)
          .subscribe((createdTournament: ITournament) => {
              this.tournament = createdTournament;
              this.router.navigate([`/tournaments/${createdTournament.id}`])
            }
          )}
      } else {
        // const {id, ...tournamentToCreate} = this.tournament;
        this.tournamentService.updateTournament(this.tournament.id, this.tournament)
          .subscribe((updatedTournament: ITournament) => {
            this.tournament = updatedTournament;
            this.router.navigate([`/tournaments/${updatedTournament.id}`])
          })
      }
    }}

