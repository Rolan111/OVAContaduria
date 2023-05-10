import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


@NgModule({
	imports: [],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class SharedModule { }