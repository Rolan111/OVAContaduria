import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CaraturaModel } from 'src/app/models/caratula.model';
import { DataModel } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import {FormDataService} from '../../../services/form-data.service';

@Component({
	selector: 'app-caratula',
	templateUrl: './caratula.component.html',
	styleUrls: []
})
export class CaratulaComponent implements OnInit {

  @Output() enviandoEstadoFormularioGuardado = new EventEmitter<boolean>(); //en este caso Actua como PADRE
  @Input() recibiendoCargaDBCaratula:any


  public caratulaForm: FormGroup;
  public idUsuario: number = 1;

  private dataModel: DataModel;
  contador=0;

  constructor(private dataService: DataService,
              private formDataService: FormDataService) {
    this.caratulaForm = new FormGroup({ data: new FormArray([]) });
  }

  ngOnInit(): void {
    // this.load2();
  }

  ngOnChanges(changes: SimpleChanges) {

    // Aquí puedes detectar los cambios en la variable de entrada

    if (changes.recibiendoCargaDBCaratula) {
      const newValue = changes.recibiendoCargaDBCaratula.currentValue;
      console.log('Se detectó un cambio en la variable de entrada:', newValue);
      console.log('El contador va en: ',this.contador);
      // this.load2()
      if (this.contador==1){
        this.load2()
        this.contador=0
      }
    }
    this.contador = this.contador+1
  }


  /*
  load() {
    this.caratulaForm = new FormGroup({ data: new FormArray([]) });

    this.dataService.findByIdUsuario(this.idUsuario).toPromise().then(result => { //consulta al servicio
      // console.log('La data recibida es: ',result);
      let data = <FormArray>this.caratulaForm.controls['data'];
      this.dataModel = new DataModel(); //variable

      if(result){
        //Si existe entonces: cargar datos en variable
        this.dataModel = result;
        let jsonParse: CaraturaModel[] = JSON.parse(result.jsonPatrimonio); //Aqui se convierte la cadena de texto almacenada en DB a un objeto JSON

        console.log('El parse es: ',jsonParse);

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
  */

  load2() {

    let data = <FormArray>this.caratulaForm.controls['data'];
    data.clear()

    let jsonParse: CaraturaModel[] = this.recibiendoCargaDBCaratula; //Aqui se convierte la cadena de texto almacenada en DB a un objeto JSON

    console.log('Los datos de json parse son: ',jsonParse);
    console.log('La longitud del Json es: ',jsonParse.length);

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
    dataModelUpdate.jsonPatrimonio = JSON.stringify(this.caratulaForm.value.data);

    this.dataService.save(dataModelUpdate).toPromise().then(result => {

      //actualizar entidad
      this.dataModel = result;

    }).catch(exception =>{
      console.log("Error: "+ exception);
      alert("Error: "+ exception);
    });
  }

  /** OJO: Una vez se guarda por primera vez, entonces se dispara el servicio que detecta NUEVOS CAMBIOS dentro del formulario */
  guardadoEnServicio(){
    this.formDataService.setFormData1(this.caratulaForm);
    this.enviandoEstadoFormularioGuardado.emit(true) //se envía al padre el estado de formulario
    // this.enviandoFormularioGuardado.emit() //Se envía al padre el formulario completo

    this.caratulaForm.valueChanges.subscribe((value) => { //INICIO servicio
      // Aquí puedes realizar acciones cuando haya cambios en el formulario
      console.log('Se detectó un cambio en el formulario', value.data);
      this.enviandoEstadoFormularioGuardado.emit(false)
    });
  }


  //OTRAS Funciones

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


