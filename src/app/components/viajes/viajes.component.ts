import { Component, OnInit } from '@angular/core';
import { ViajesModel } from 'src/app/models/viajes.module';
import { ViajesService } from 'src/app/services/viajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css'],
})
export class ViajesComponent implements OnInit {
  Lugares: ViajesModel[] = [];
  cargando = false;

  constructor(public viajesService: ViajesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.viajesService.getViajes().subscribe((data) => {
      console.log(data);
      this.Lugares = data;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });
  }

  borrar(viaje: any, i: number) {
    Swal.fire({
      text: `¿Está seguro que desea borrar a ${viaje.viaje}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((data) => {
      if (data.value) {
        this.viajesService.borrarViaje(viaje.id).subscribe((data) => {
          console.log(data);
          //manera de buenas practicas de hacer el borrado
          this.Lugares.splice(i, 1);
          // MANERA FACIL malas practicas DE BORRARLO
          // this.viajesService.getViajes().subscribe((data) => {
          //   console.log(data);
          //   this.Lugares = data;
          // });
        });
      }
    });
  }
}
