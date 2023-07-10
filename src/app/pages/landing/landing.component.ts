import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';
import {DataModel} from '../../models/data.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {CaraturaModel} from '../../models/caratula.model';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  private dataModel: DataModel;
  public idUsuario: number = 3;
  public patrimonioForm: FormGroup;

  // @Input() reciviendoDetectorFormularioGuardado: any = 'sin datos recibidos';

  recibiendoEstadosFormularios:boolean=false //Sirve para todos los formularios
  recibiendoFormularioCaratula!:any

  formData1: any;
  formData2: any;
  formData3: any;

  estilosCaratula = {};
  estilosPatrimonio = {};
  estilosRentaLiquida = {};

  enviadoCargaCaratula!:any
  enviadoCargaPatrimonio!:any
  enviadoCargaRentaLiquida!:any

	constructor(private formDataService: FormDataService,
              private dataService: DataService) { }

	ngOnInit(): void {
    this.load()
	}

  cambioEstilosCaratula(){
    if (this.recibiendoEstadosFormularios==true){
      console.log('cambio detectadoooo');
      this.estilosCaratula = {
        'background-color': '#7AA874',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }else{
      this.estilosCaratula = {
        'background-color': 'red',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }
  }

  cambioEstilosPatrimonio(){
    if (this.recibiendoEstadosFormularios==true){
      console.log('cambio detectadoooo');
      this.estilosPatrimonio = {
        'background-color': '#7AA874',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }else{
      this.estilosPatrimonio = {
        'background-color': 'red',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }
  }

  cambioEstilosRentaLiquida(){
    if (this.recibiendoEstadosFormularios==true){
      console.log('cambio detectadoooo');
      this.estilosRentaLiquida = {
        'background-color': '#7AA874',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }else{
      this.estilosRentaLiquida = {
        'background-color': 'red',
        'padding': '8px',
        'color': '#f0f0d8'
      };
    }
  }

  load() {
    this.patrimonioForm = new FormGroup({ data: new FormArray([]) });

    this.dataService.findByIdUsuario(this.idUsuario).toPromise().then(result => { //consulta al servicio
      console.log('La data recibida es: ',result);
      let data = <FormArray>this.patrimonioForm.controls['data'];
      this.dataModel = new DataModel(); //variable

      if(result){
        //Si existe entonces: cargar datos en variable
        this.dataModel = result;
        let jsonParseCaratula: CaraturaModel[] = JSON.parse(result.jsonCaratula); //Aqui se convierte la cadena de texto almacenada en DB a un objeto JSON
        let jsonParsePatrimonio: CaraturaModel[] = JSON.parse(result.jsonPatrimonio);
        let jsonParseRentaLiquida: CaraturaModel[] = JSON.parse(result.jsonRentaLiquida);

        console.log('Los datos de json patrimonios son: ',jsonParsePatrimonio);

        this.enviadoCargaCaratula = jsonParseCaratula
        this.enviadoCargaPatrimonio = jsonParsePatrimonio
        this.enviadoCargaRentaLiquida = jsonParseRentaLiquida

        // for (let index = 0; index < jsonParse.length; index++) {
        //   data.push(
        //     new FormGroup({
        //       name: new FormControl('Campo: ' + (index + 1)),
        //       c1: new FormControl(jsonParse[index].c1),
        //       c2: new FormControl(jsonParse[index].c2),
        //       c3: new FormControl(jsonParse[index].c3),
        //       c4: new FormControl(jsonParse[index].c4),
        //       c5: new FormControl(jsonParse[index].c5),
        //       comment: new FormControl(jsonParse[index].comment)
        //     })
        //   );
        // }

      }else{

        // for (let index = 0; index < 10; index++) {
        //   data.push(
        //     new FormGroup({
        //       name: new FormControl('Campo: ' + (index + 1)),
        //       c1: new FormControl(""),
        //       c2: new FormControl(""),
        //       c3: new FormControl(""),
        //       c4: new FormControl(""),
        //       c5: new FormControl(""),
        //       comment: new FormControl("")
        //     })
        //   );
        // }

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
    dataModelUpdate.jsonPatrimonio = JSON.stringify(this.patrimonioForm.value.data); //FALTA INIICAR este formulario o más bien capturar los datos de formulario del componente hijo
    // dataModelUpdate.jsonPatrimonio = JSON.stringify(this.patrimonioForm.value.data); //aqui colocar el otro json


    this.dataService.save(dataModelUpdate).toPromise().then(result => {

      //actualizar entidad
      this.dataModel = result;

    }).catch(exception =>{
      console.log("Error: "+ exception);
      alert("Error: "+ exception);
    });

  }

  recopilacionDeTodosFormulariosYEnvio(){
    // Obtener los datos del primer formulario desde el servicio
    this.formData1 = this.formDataService.getFormData1();

    // Obtener los datos del segundo formulario desde el servicio
    this.formData2 = this.formDataService.getFormData2();

    this.formData3 = this.formDataService.getFormData3();

    console.log('Los datos del formulario 1 son: ', this.formData1.value.data);
    console.log('Los datos del formulario 2 son: ', this.formData2.value.data);
    console.log('Los datos del formulario 3 son: ', this.formData3.value.data);

    //Empieza proceso de guardado
    //copiar entidad por si sale mal no dañarla.
    let dataModelUpdate: DataModel = new DataModel();

    //si es el mismo id usuario elimina los datos para crear nuevo
    if(this.dataModel.idUsuario == this.idUsuario){

      dataModelUpdate.id_data = this.dataModel.id_data;
      dataModelUpdate.idUsuario =  this.dataModel.idUsuario;
    }else{
      dataModelUpdate.idUsuario = this.idUsuario;
    }


    // dataModelUpdate.idUsuario = 3

    //actualizar info data temporal -- Agregar al modelo la info de TODOS los formularios
    dataModelUpdate.jsonCaratula = JSON.stringify(this.formData1.value.data);
    dataModelUpdate.jsonPatrimonio = JSON.stringify(this.formData2.value.data);
    dataModelUpdate.jsonRentaLiquida = JSON.stringify(this.formData3.value.data);


    this.dataService.save(dataModelUpdate).toPromise().then(result => {

      //actualizar entidad
      this.dataModel = result;

    }).catch(exception =>{
      console.log("Error: "+ exception);
      alert("Error: "+ exception);
    });


  }


}
