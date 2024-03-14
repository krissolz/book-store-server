import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public currentDate: string;
  public contact: string;

  constructor() {
    this.currentDate = Date.now().toString();
    this.contact = 'info@bookstore.com';
  }

  ngOnInit() {
  }

}
