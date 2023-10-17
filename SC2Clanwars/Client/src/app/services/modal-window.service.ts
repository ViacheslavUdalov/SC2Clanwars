import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  private showModalSource = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSource.asObservable();
private modalPosition = {top: '0', left: '0'}
  show(event: MouseEvent) {
    this.setModalPosition(event);
    this.showModalSource.next(true);
  }

  setModalPosition(
    event: MouseEvent
  ) {
    this.modalPosition.top = event.clientY + 'px';
    this.modalPosition.left = event.clientX + 'px';
  }
getModalPosition() {
  return this.modalPosition
}
  hideModal() {
    this.showModalSource.next(false);
  }
}
