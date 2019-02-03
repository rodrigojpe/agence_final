import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { ConsultorService } from 'src/app/services/consultor.service';
import { Consultor } from '../../models/consultores';
import { Chart } from 'chart.js';
import { type } from 'os';


declare const $: any;
declare const Swal: any;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: []
})
export class PageComponent implements OnInit  {

public grafico: Chart;
public graficoPie: Chart;

public  title: string;
public url: string;
public consultor: Consultor [];
public selected: string;
public empSelected: string;
public outSelected: string;
public emple: string[];
public opt: string[];
public name: string;

public RecetaLiquida2: any [];

public v_receta: number;
public costoFijo: string[];
public v_costo: number;
public comissao: string[];
public v_comisao: number;
public lucro: string [];
public v_lucro: number;
public succes: string;
public showGraph: boolean;
public showTable: boolean;


public ano_desde;
public mes_desde;
public ano_hasta;
public mes_hasta;

public  table: string ;
public  rows = 0;
public  cols = 0;

  constructor(
    private _consultorService: ConsultorService
  ) {
    this.table = '';
    this.rows = 0;
    this.cols = 5;
    this.title = 'Cuidadores';
    this.url = GLOBAL.url;
    this.emple = [];
    this.consultor = [];
    this.empSelected = '';
    this.outSelected = '';
    this.RecetaLiquida2 = [];
    this.costoFijo = [];
    this.comissao = [];
    this.lucro = [];
    this.succes = '';
    this.v_comisao = 0;
    this.v_costo = 0;
    this.v_lucro = 0;
    this.v_receta = 0;
    this.ano_desde = '2007';
    this.mes_desde = '01';
    this.ano_hasta = '2007';
    this.mes_hasta = '02';

  }

ngOnInit() {
  this.getConsultor();
}

getConsultor() {
  this._consultorService.getConsultors().subscribe(
    (response: any) => {
        if (!response) {
        } else {
            this.consultor = response;
            // console.log(response);
            // return;
        }
    },
    error => {
      console.log(<any>error );
    }
  );
}
addConsultores() {
  this.succes = 'Ok';
  if (this.empSelected[0]) {
      this.emple.push(this.empSelected);
       console.log(this.emple);
    // this.empSelected =  this.empSelected.toString().replace(/['"]+/g, '');
    for ( let i = 0; i < this.consultor.length; i++) {
      if ( this.consultor[i].name === this.empSelected.toString().replace(/['"]+/g, '')) {
        this.consultor.splice(i, 1);
          // console.log('eliminado');
        //  console.log(this.consultor);
          return;
      }
     }
  } else {
      Swal.fire({
        type: 'warning',
        title: 'Atención',
        text: 'Primero debe seleccionar un consultor'
      });
    return false;
  }
}

deleteConsultores() {
  if (this.outSelected) {
    console.log(this.outSelected[0]);

    this.consultor.push({name: this.outSelected[0]});
    console.log(this.consultor);

        this.succes = null;
    if (this.outSelected) {
      const index = this.emple.findIndex(user => user === this.outSelected);
      this.emple.splice(index, 1);
      console.log(this.emple);
    } else {
      Swal.fire({
      type: 'warning',
      title: 'Atención',
      text: 'Primero debe seleccionar un consultor'
    });
    return false;
  }
  // console.log(this.outSelected);
  }
}
onSubmit() {

  this.showTable = true;
  this.showGraph = false;

  // console.log(select_contenedor);
  if (this.emple.length === 0) {
      Swal.fire({
        type: 'warning',
        title: 'Atención',
        text: 'Primero debe añadir almenos un consultor'
      });
      return false;
}
this.empSelected = '';
      // rotatorio
      this.RecetaLiquida2 = [];

for ( const item  of this.emple)  {
  this._consultorService.getRotatorio({ a: item, b: this.ano_desde, c: this.mes_desde, d: this.ano_hasta, e: this.mes_hasta}).subscribe(
    (response: any) => {
      if (!response) {
        console.log('errror');
      } else {
            // Obteniendo la receta liquida
            let totalRecetaLiquida = 0;
            let totalSalario = 0;
            let totalComision = 0;
            let totalLucro = 0;
            response.data.map(row => {
              totalRecetaLiquida += row.total;
              totalSalario += row.salario;
              totalComision += row.comissao;
              totalLucro += row.lucro;
            });

            response.data.totalRecetaLiquida = totalRecetaLiquida;
            response.data.totalSalario = totalSalario;
            response.data.totalComision = totalComision;
            response.data.totalLucro = totalLucro;
            response.data.consultor = item[0];

            this.RecetaLiquida2.push(response);
          }
        },
    error => {
      console.log(<any>error);
      if (error != null) {
        let body = JSON.parse(error._body);
      }
    }
  );
  }

//  console.log(this.RecetaLiquida2);
}

CargarGrafico() {

  this.showTable = false;
  this.showGraph = true;
  this.removeChartData(this.grafico);


  let data = [];
  if (this.RecetaLiquida2.length > 0) {
    data = this.RecetaLiquida2.map( x => {
      if (x.data.length > 0) {
      return  {TotalGanancias: x.data.totalRecetaLiquida, Consultor: x.data[0].consultor };
      } else {
        return  {TotalGanancias: 0, Consultor: x.data.consultor };
      }
    });
  }

  let sum = 0;
  const consultores = [];
  const ganancias = [];
  const average = [];

  data.map((x: any) => {
    consultores.push(x.Consultor);
    ganancias.push(x.TotalGanancias);
    sum += x.TotalGanancias;
  });

  data.map((x: any) => {
    average.push(sum / ganancias.length);
  });

  this.grafico = new Chart("graph" , {
    type: 'bar',
    data: {
      datasets: [{
            label: 'Ganancias',
            data: ganancias,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
          ]
          }, {
            label: 'Promedio',
            data: average,
            backgroudColor: [
              'rgba(0, 0, 0,1)'
            ],

            // Changes this dataset to become a line
            type: 'line',
            fill: false
          }],
      labels: consultores
    },
    options: {
      chartArea: {
          backgroundColor: 'rgb(0, 0, 0, 0.9)'
      }
  }
  });

  this.graficoPie = new Chart('pie', {
    type: 'pie',
    data: {
      datasets: [{
            label: 'Ganancias',
            data: ganancias,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
          ]
          }],
      labels: consultores
    }
  });
}

removeChartData(grafico: Chart) {
  if (grafico !== undefined) {
    grafico.destroy();
  }
  if (this.graficoPie !== undefined ) {
    this.graficoPie.destroy();
  }
}

}
