import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViajeComponent } from './components/viaje/viaje.component';
import { ViajesComponent } from './components/viajes/viajes.component';

const routes: Routes = [
  { path: 'viajes', component: ViajesComponent },
  { path: 'viaje/:id', component: ViajeComponent },
  { path: '**', redirectTo: 'viajes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
