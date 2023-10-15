import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  isSelectedOption: string = 'userVerification'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto

  /**
   *
   */
  constructor() {
    
    
  }
}
