import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "../main-page/main-page.component";
import {PlaceListComponent} from "../manage-places/place-list/place-list.component";
import {NewPlaceComponent} from "../manage-places/new-place/new-place.component";
import {SinglePlaceDisplayComponent} from "../manage-places/single-place-display/single-place-display.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'places', component: PlaceListComponent},
  {path: 'places/add', component: NewPlaceComponent},
  {path: 'places/:id', component: SinglePlaceDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
