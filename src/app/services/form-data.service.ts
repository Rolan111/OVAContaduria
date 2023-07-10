import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  private formData1: any;
  private formData2: any;
  private formData3: any;

  //setters
  setFormData1(data: any) {
    this.formData1 = data;
  }

  setFormData2(data: any) {
    this.formData2 = data;
  }

  setFormData3(data: any) {
    this.formData3 = data;
  }


  //getters
  getFormData1() {
    return this.formData1;
  }

  getFormData2() {
    return this.formData2;
  }

  getFormData3() {
    return this.formData3;
  }


}
