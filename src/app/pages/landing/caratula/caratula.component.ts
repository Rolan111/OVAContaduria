import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-caratula',
	templateUrl: './caratula.component.html',
	styleUrls: []
})
export class CaratulaComponent implements OnInit {

	caratulaForm: FormGroup;

	constructor() { }

	ngOnInit(): void {


		this.caratulaForm = new FormGroup({
			data: new FormArray([
				new FormGroup({
					key: new FormControl(''),
					value: new FormControl('')
				})
			])
		});


		let data = <FormArray>this.caratulaForm.controls['data'];
		data.push(
			new FormGroup({
				key: new FormControl(''),
				value: new FormControl('')
			})
		);
		data.push(
			new FormGroup({
				key: new FormControl(''),
				value: new FormControl('')
			})
		);
	}

	clic(){
		console.log(this.caratulaForm.value);
	}
}


