import { NgModule } from '@angular/core';
import { ActivosFijosComponent } from './activos-fijos/activos-fijos.component';
import { CaratulaComponent } from './caratula/caratula.component';
import { DetalleRenglonesComponent } from './detalle-renglones/detalle-renglones.component';
import { Formulario110Component } from './formulario110/formulario110.component';
import { ImpuestosDiferidosComponent } from './impuestos-diferidos/impuestos-diferidos.component';
import { IngresoYFacturacionComponent } from './ingreso-y-facturacion/ingreso-y-facturacion.component';
import { PatrimonioComponent } from './patrimonio/patrimonio.component';
import { RentaLiquidaComponent } from './renta-liquida/renta-liquida.component';
import { ResumenComponent } from './resumen/resumen.component';
import { SharedModule } from 'src/app/common/shared.module';

const AllModules = [
	ActivosFijosComponent,
	CaratulaComponent,
	DetalleRenglonesComponent,
	Formulario110Component,
	ImpuestosDiferidosComponent,
	IngresoYFacturacionComponent,
	PatrimonioComponent,
	RentaLiquidaComponent,
	ResumenComponent,
];

@NgModule({
	declarations: [
		AllModules
	],
	imports: [
		SharedModule
	],
	exports: [
		AllModules
	]
})
export class LandingModule { }
