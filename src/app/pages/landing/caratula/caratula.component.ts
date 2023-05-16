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
			data: new FormArray([])
		});

		let data = <FormArray>this.caratulaForm.controls['data'];
		for (let index = 1; index <= 184; index++) {
			data.push(
				new FormGroup({
					name: new FormControl({
						value: 'Campo de descripcion '+index
					}),
					c1: new FormControl(''),
					c2: new FormControl(''),
					c3: new FormControl(''),
					c4: new FormControl(''),
					c5: new FormControl(''),
					comment: new FormControl('')
				})
			);
		}
	}

	showData() {
		console.log(this.caratulaForm.value);
	}

	sumData() {
		console.log(this.caratulaForm.value);

		let data = <FormArray>this.caratulaForm.controls['data'];

		var totalSumC1: number = 0;
		var totalSumC2: number = 0;

		data.controls.forEach(element => {
			let tempRowC1: number = Number.parseInt(element.value['c1']);
			let tempRowC2: number = Number.parseInt(element.value['c2']);

			if (!Number.isNaN(tempRowC1)) {
				totalSumC1 += tempRowC1;
			}
			if (!Number.isNaN(tempRowC2)) {
				totalSumC2 += tempRowC2;
			}

		});

		console.log("Columna 1: " + totalSumC1);
		console.log("Columna 2: " + totalSumC2);
	}

	getData(item:any){
		console.log(item);
	}
}


