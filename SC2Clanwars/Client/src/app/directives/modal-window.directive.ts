import {Directive, HostListener} from '@angular/core';
import {ModalWindowService} from "../services/modal-window.service";
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[appShowModalWindow]'
})
export class ModalWindowDirective {

  constructor(private modalService: ModalWindowService,
              private authService : AuthService) { }
@HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.modalService.show(event)
      }
    })



}
  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.modalService.hideModal();
  }
}
