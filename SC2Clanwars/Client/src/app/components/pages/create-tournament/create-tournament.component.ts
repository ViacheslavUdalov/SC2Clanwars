import {Component, OnInit} from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";
import {UploadimagesService} from "../../../services/uploadimages.service";
@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.less']
})
export class CreateTournamentComponent implements OnInit {
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
selectedFile: File;
  constructor(private tournamentService: TournamentsService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadImages: UploadimagesService) {
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
    if (event && event.target && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.uploadFile(this.selectedFile);
      // console.log(this.selectedFile);
    }
  }

  uploadFile(file: File) {
    if (file) {
      this.uploadImages.uploadTournamentFile(file).subscribe(uploadedFile => {
        this.loadTournamentAvatar();
        // console.log(uploadedFile);
      })
    }
  }
  loadTournamentAvatar() {
    this.uploadImages.getTournamentAvatar(this.selectedFile.name).subscribe(loadedFile => {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result содержит base64-кодированное изображение;
        // console.log(loadedFile);
        this.tournament.avatar = reader.result as string;
      };
      reader.readAsDataURL(loadedFile);
    });
  }
  onSubmit() {
    if (this.isCreating) {
      console.log(this.tournament)
        this.tournamentService.createTournament(this.tournament)
          .subscribe((createdTournament: ITournament) => {
              this.tournament = createdTournament;
            console.log(this.tournament)
              this.router.navigate([`/tournaments/${createdTournament.id}`])
            }
          )
      } else {
        // const {id, ...tournamentToCreate} = this.tournament;
        this.tournamentService.updateTournament(this.tournament.id, this.tournament)
          .subscribe((updatedTournament: ITournament) => {
            this.tournament = updatedTournament;
            this.router.navigate([`/tournaments/${updatedTournament.id}`])
          })
      }
    }}

