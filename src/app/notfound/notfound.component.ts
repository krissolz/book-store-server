import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface Error {
  notfound: string[],
  server: string[]
}

const errors: Error = {
  notfound: ['The page you have requested was not found!', '404'],
  server: ['Internal server error, please try again later!', '500']
}

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  public error: string;
  public code: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.error = errors.notfound[0];
  }

  switchErrors(code: string): void {
    switch(code){
      case '1':
        this.error = errors.server[0];
        this.code = errors.server[1];
        break;
      default:
        this.error = errors.notfound[0];
        this.code = errors.notfound[1];
        break;
    }
  }

  ngOnInit() {
    let subscribtion = this.route.paramMap.pipe( map( (params: ParamMap) => params.get('error') ) );
    subscribtion.subscribe( res => this.switchErrors(res) );
  }

}
