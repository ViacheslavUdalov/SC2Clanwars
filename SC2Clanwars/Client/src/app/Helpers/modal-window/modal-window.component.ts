import {Component} from '@angular/core';
import {ModalWindowService} from "../../services/modal-window.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.less']
})
export class ModalWindowComponent {
  modalPosition: { top: string, left: string };
  showModal : boolean

  constructor(private modalService: ModalWindowService) {
    this.modalService.showModal$.subscribe((show) => {
      this.modalPosition = this.modalService.getModalPosition();
        this.showModal = show;
      console.log( this.showModal )
      }
    )
  }
}
