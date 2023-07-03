import { Component, OnInit } from '@angular/core';
import {FormDataService} from '../../services/form-data.service';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  formData1: any;
  formData2: any;

	constructor(private formDataService: FormDataService) { }

	ngOnInit(): void {
	}

  recopilacionDeTodosFormularios(){
    // Obtener los datos del primer formulario desde el servicio
    this.formData1 = this.formDataService.getFormData1();

    // Obtener los datos del segundo formulario desde el servicio
    this.formData2 = this.formDataService.getFormData2();

    console.log('Los datos del formulario 1 son: ', this.formData1.value.data);
    console.log('Los datos del formulario 2 son: ', this.formData2.value.data);

  }

}
