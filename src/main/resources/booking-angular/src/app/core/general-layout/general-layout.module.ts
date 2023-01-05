import {NgModule} from "@angular/core";
import {GeneralBarComponent} from "../general-bar/general-bar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    GeneralBarComponent,
    ToolbarComponent
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    ToolbarComponent,
    GeneralBarComponent
  ],
  providers: []
})
export class GeneralLayoutModule {
}
