import { AppMenuComponent } from './app-menu.component';
import { AppMenuItemComponent } from './menu-item/app-menu-item.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppMenuComponent, AppMenuItemComponent],
    exports: [AppMenuComponent],
    imports: [CommonModule, RouterModule],
})
export class AppMenuComponentModule {}
