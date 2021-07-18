import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LinkDashDevService } from '../link-dash-dev.service';

@Component({
  selector: 'app-dash-dev',
  templateUrl: './dash-dev.component.html',
  styleUrls: ['./dash-dev.component.css']
})
export class DashDevComponent implements OnInit {
  status: string = 'STOPPED';
  name: string = 'Undef';

  app: AppComponent = null;

  constructor(public linkDashService: LinkDashDevService) {}

  ngOnInit() {}
}
