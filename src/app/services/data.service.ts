import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DataModel } from '../models/data.model';
import { Constans } from '../common/constans';

@Injectable({
	providedIn: 'root',
})
export class DataService {

	private url: string;

	constructor(private http: HttpClient) {
		this.url = Constans.URL + "data/";
	}

	findAll(): Observable<DataModel[]> {
		return this.http.get<DataModel[]>(this.url + "findAll");
	}

	findByIdUsuario(idUsuario: number): Observable<DataModel> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("idUsuario", idUsuario + "");

		return this.http.get<DataModel>(this.url + "findByIdUsuario", { params: queryParams });
	}

	save(data: DataModel): Observable<DataModel> {
		return this.http.post<DataModel>(this.url + "save", data);
	}

}