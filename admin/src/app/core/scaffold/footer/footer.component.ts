import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private date: Date = new Date();
  public currentYear: number;

  constructor() {
    this.currentYear = this.date.getFullYear();
  }
}
