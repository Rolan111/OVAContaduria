import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { PruebaComponent } from './prueba/prueba.component';

@NgModule({
	declarations: [
		AppComponent,
		PruebaComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		PagesModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
