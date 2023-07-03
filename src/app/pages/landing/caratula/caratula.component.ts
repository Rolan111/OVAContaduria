import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CaraturaModel } from 'src/app/models/caratula.model';
import { DataModel } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-caratula',
	templateUrl: './caratula.component.html',
	styleUrls: []
})
export class CaratulaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


