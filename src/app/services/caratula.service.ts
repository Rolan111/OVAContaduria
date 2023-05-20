import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaraturaModel } from '../models/caratula.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
	providedIn: 'root',
})
export class CaratulaService {

	private url: string;

	constructor(private http: HttpClient) { 
		this.url = "localhost:8080/apiCaratula/";
	}

	saveData(data: CaraturaModel): Observable<CaraturaModel>{
		return this.http.post<CaraturaModel>(this.url + "setData", data);
	}

	getData(): Observable<string> {
		return this.http.get<string>(this.url + "getData");
	}

}