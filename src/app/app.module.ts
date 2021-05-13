import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {SVGQueryToolComponent} from "./svg.component";
import { AppComponent } from "./app.component";


@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [SVGQueryToolComponent,AppComponent],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
