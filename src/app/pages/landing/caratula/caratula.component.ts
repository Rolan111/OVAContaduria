import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CaraturaModel} from 'src/app/models/caratula.model';
import {CaratulaService} from 'src/app/services/caratula.service';

@Component({
  selector: 'app-caratula',
  templateUrl: './caratula.component.html',
  styleUrls: []
})
export class CaratulaComponent implements OnInit {

  caratulaForm: FormGroup;

  constructor(private caratulaService: CaratulaService) {
  }

  ngOnInit(): void {
    this.caratulaForm = new FormGroup({data: new FormArray([])});

    let data = <FormArray> this.caratulaForm.controls['data'];
    for (let index = 0; index < 10; index++) {
      data.push(
        new FormGroup({
          name: new FormControl('Campo de descripcion ' + (index + 1)),
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
    console.log(this.caratulaForm.value.data);
  }

  sumData() {
    let data = <FormArray> this.caratulaForm.controls['data'];

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

    console.log('Columna 1: ' + totalSumC1);
    console.log('Columna 2: ' + totalSumC2);
  }

  getData(item: any) {
    console.log(item);
  }

  import() {
    this.caratulaService.getData().toPromise().then(result => {
      console.log(result);
    });

    let jsonImported: string = '[{"name":"Campo de descripcion 1","c1":1222,"c2":34,"c3":123123,"c4":121,"c5":233,"comment":"asdasdasd"},{"name":"Campo de descripcion 2","c1":4,"c2":1,"c3":43,"c4":4,"c5":1,"comment":"aczxczx"},{"name":"Campo de descripcion 3","c1":36589,"c2":4,"c3":1,"c4":45,"c5":123123123123123120,"comment":"cz"},{"name":"Campo de descripcion 4","c1":989,"c2":344,"c3":45,"c4":14,"c5":454,"comment":"czxczx"},{"name":"Campo de descripcion 5","c1":53,"c2":23,"c3":45,"c4":45,"c5":1,"comment":"xcvxvxc"},{"name":"Campo de descripcion 6","c1":13,"c2":13,"c3":35,"c4":45,"c5":1354,"comment":"asdasdasdasd"},{"name":"Campo de descripcion 7","c1":80,"c2":89,"c3":0,"c4":5,"c5":2,"comment":"xvbc"},{"name":"Campo de descripcion 8","c1":8,"c2":888,"c3":8,"c4":1,"c5":5,"comment":"ncbnvbnvbn"},{"name":"Campo de descripcion 9","c1":453,"c2":80,"c3":25,"c4":464,"c5":45,"comment":"asdasd"},{"name":"Campo de descripcion 10","c1":80,"c2":2,"c3":989,"c4":4,"c5":1123123,"comment":"asdasd"}]';
    let jsonParse: CaraturaModel[] = JSON.parse(jsonImported);

    console.log(jsonParse);

    this.caratulaForm = new FormGroup({data: new FormArray([])});

    let data = <FormArray> this.caratulaForm.controls['data'];
    for (let index = 0; index < 10; index++) {
      data.push(
        new FormGroup({
          name: new FormControl('Campo de descripcion ' + (index + 1)),
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

  export() {
    console.log(JSON.stringify(this.caratulaForm.value.data));
  }
}


