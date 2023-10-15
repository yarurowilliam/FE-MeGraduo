import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private isOpen = false;

  constructor() {}

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  isModalOpen(): boolean {
    return this.isOpen;
  }
}
