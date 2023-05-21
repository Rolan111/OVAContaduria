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

	public caratulaForm: FormGroup;
	public idUsuario: number = 1;

	private dataModel: DataModel;

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.load();
	}

	load() {
		this.caratulaForm = new FormGroup({ data: new FormArray([]) });

		this.dataService.findByIdUsuario(this.idUsuario).toPromise().then(result => {
			let data = <FormArray>this.caratulaForm.controls['data'];
			this.dataModel = new DataModel();

			if(result){
				//guardar datos en variable
				this.dataModel = result;
				let jsonParse: CaraturaModel[] = JSON.parse(result.jsonPatrimonio);

				for (let index = 0; index < jsonParse.length; index++) {
					data.push(
						new FormGroup({
							name: new FormControl('Campo: ' + (index + 1)),
							c1: new FormControl(jsonParse[index].c1),
							c2: new FormControl(jsonParse[index].c2),
							c3: new FormControl(jsonParse[index].c3),
							c4: new FormControl(jsonParse[index].c4),
							c5: new FormControl(jsonParse[index].c5),
							comment: new FormControl(jsonParse[index].comment)
						})
					);
				}
			}else{
				for (let index = 0; index < 10; index++) {
					data.push(
						new FormGroup({
							name: new FormControl('Campo: ' + (index + 1)),
							c1: new FormControl(""),
							c2: new FormControl(""),
							c3: new FormControl(""),
							c4: new FormControl(""),
							c5: new FormControl(""),
							comment: new FormControl("")
						})
					);
				}
			}
		}).catch(exception =>{
			console.log("Error: "+ exception);
			alert("Error: "+ exception);
		});
	}

	save() {
		//copiar entidad por si sale mal no dañarla.
		let dataModelUpdate: DataModel = new DataModel();

		//si es el mismo id usuario elimina los datos para crear nuevo
		if(this.dataModel.idUsuario == this.idUsuario){

			dataModelUpdate.id = this.dataModel.id;
			dataModelUpdate.idUsuario =  this.dataModel.idUsuario;
		}else{
			dataModelUpdate.idUsuario = this.idUsuario;
		}

		//actualizar info data temporal
		dataModelUpdate.jsonPatrimonio = JSON.stringify(this.caratulaForm.value.data);

		this.dataService.save(dataModelUpdate).toPromise().then(result => {

			//actualizar entidad
			this.dataModel = result;

		}).catch(exception =>{
			console.log("Error: "+ exception);
			alert("Error: "+ exception);
		});
	}



	showData() {
		console.log(this.caratulaForm.value.data);
	}

	sumData() {
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

	getData(item: any) {
		console.log(item);
	}
}


