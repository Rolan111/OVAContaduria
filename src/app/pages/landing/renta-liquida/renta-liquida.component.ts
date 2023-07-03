import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DataModel} from '../../../models/data.model';
import {DataService} from '../../../services/data.service';
import {CaraturaModel} from '../../../models/caratula.model';
import {FormDataService} from '../../../services/form-data.service';

@Component({
	selector: 'app-renta-liquida',
	templateUrl: './renta-liquida.component.html',
	styles: [
	]
})
export class RentaLiquidaComponent implements OnInit {

  public caratulaForm: FormGroup;
  public idUsuario: number = 1;

  private dataModel: DataModel;

  constructor(private dataService: DataService,
              private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.caratulaForm = new FormGroup({ data: new FormArray([]) });

    this.dataService.findByIdUsuario(this.idUsuario).toPromise().then(result => { //consulta al servicio
      let data = <FormArray>this.caratulaForm.controls['data'];
      this.dataModel = new DataModel(); //variable

      if(result){
        //Si existe entonces: cargar datos en variable
        this.dataModel = result;
        let jsonParse: CaraturaModel[] = JSON.parse(result.jsonPatrimonio); //Aqui se convierte la cadena de texto almacenada en DB a un objeto JSON

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

      dataModelUpdate.id_data = this.dataModel.id_data;
      dataModelUpdate.idUsuario =  this.dataModel.idUsuario;
    }else{
      dataModelUpdate.idUsuario = this.idUsuario;
    }

    //actualizar info data temporal
    // dataModelUpdate.jsonPatrimonio = JSON.stringify(this.caratulaForm.value.data);
    dataModelUpdate.jsonRentaLiquida = JSON.stringify(this.caratulaForm.value.data);

    this.dataService.save(dataModelUpdate).toPromise().then(result => {

      //actualizar entidad
      this.dataModel = result;

    }).catch(exception =>{
      console.log("Error: "+ exception);
      alert("Error: "+ exception);
    });
  }

  guardadoEnServicio2(){
    this.formDataService.setFormData2(this.caratulaForm);
  }

  showData() {
    console.log(this.caratulaForm.value.data);
  }

  sumData() {
    let data = <FormArray>this.caratulaForm.controls['data'];

    //Suma completo de columnas
    var totalSumC1: number = 0;
    var totalSumC2: number = 0;

    //Suma completa de filas
    var totalSumF1: number = 0;
    var totalSumF2: number = 0;

    let contador=0;

    data.controls.forEach(element => {

      //Suma de las columnas
      let tempRowC1: number = Number.parseInt(element.value['c1']);
      let tempRowC2: number = Number.parseInt(element.value['c2']);

      if (!Number.isNaN(tempRowC1)) {
        totalSumC1 += tempRowC1;
      }
      if (!Number.isNaN(tempRowC2)) {
        totalSumC2 += tempRowC2;
      }

      // Suma de las filas
      console.log('Los numeros de filas 0 son: ',element.value['c1']);


    });

    console.log('*** Resultados suma Columnas ***');
    console.log("Suma Columna 1: " + totalSumC1);
    console.log("Suma Columna 2: " + totalSumC2);

    console.log('*** Resultados suma Filas ***');
    // Suma de Fila 1, es decir la posicion 0
    totalSumF1 = this.caratulaForm.value.data[0].c1 + this.caratulaForm.value.data[0].c2 + this.caratulaForm.value.data[0].c3 + this.caratulaForm.value.data[0].c4;
    totalSumF2 = this.caratulaForm.value.data[1].c1 + this.caratulaForm.value.data[1].c2 + this.caratulaForm.value.data[1].c3 + this.caratulaForm.value.data[1].c4;
    console.log('La suma de la fila 1 es: ', totalSumF1);
    console.log('La suma de la fila 2 es: ', totalSumF2);

  }

  getData(item: any) {
    console.log(item);
  }

}
