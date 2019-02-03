import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ConsultorService {
  public url: String;

  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getConsultors() {
    return this._http.get(this.url + 'cons').pipe(map(res => res));
  }


   getRotatorio(consultores) {
    const params = JSON.stringify(consultores);
    // const year_in = JSON.stringify(año_desde);
    // const month_in = JSON.stringify(mes_desde);
    // const year_to = JSON.stringify(año_hasta);
    // const month_to = JSON.stringify(mes_hasta);


    let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

    return this._http.post(this.url + 'rotatorio', params, { headers: headers })
            .pipe(map(res => res));
  }

  getCustoFixo(consultores, ano, mes, ano2, mes2) {
    const params = [JSON.stringify(consultores), JSON.stringify(ano), JSON.stringify(mes),JSON.stringify(ano2),JSON.stringify(mes2)];

    let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

    return this._http.post(this.url + 'custo_fixo/', params, { headers: headers })
            .pipe(map(res => res));
  }

  getComissao(consultores) {
    const params = JSON.stringify(consultores);
    let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

    return this._http.post(this.url + 'comissao/', params, { headers: headers })
            .pipe(map(res => res));
  }

  getLucro(consultores) {
    const params = JSON.stringify(consultores);
    let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

    return this._http.post(this.url + 'lucro/', params, { headers: headers })
            .pipe(map(res => res));
  }
}

