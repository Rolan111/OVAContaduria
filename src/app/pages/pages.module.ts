import { NgModule } from '@angular/core';
import { LandingModule } from './landing/landing.module';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../common/shared.module';

@NgModule({
	declarations: [
		LandingComponent,
		LoginComponent
	],
	imports: [
		SharedModule,
		LandingModule
	],
	exports: []
})
export class PagesModule { }
