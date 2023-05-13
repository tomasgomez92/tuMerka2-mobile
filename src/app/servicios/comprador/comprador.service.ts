import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtLogin } from "src/app/models/dataTypes/DtLogin";
import { DtUsuario } from "src/app/models/dataTypes/DtUsuario";

@Injectable({
    providedIn: 'root'
})
export class CompradorService {
    apiURL: string = `${environment.BACKEND_API_URL}`

    constructor(private http: HttpClient){}

    login(data: DtLogin){
        return this.http.post<DtUsuario>(`${this.apiURL}/auth/login`, data);
    }
}