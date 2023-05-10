import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const AllMaterialModules = [
	MatTabsModule,
	MatInputModule,
	MatButtonModule,
];

@NgModule({
	imports: [
		AllMaterialModules
	],
	exports: [
		AllMaterialModules
	]
})
export class MaterialModule { }