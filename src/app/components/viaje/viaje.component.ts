import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchAll } from 'rxjs/operators';
import { ViajesModel } from 'src/app/models/viajes.module';
import { ViajesService } from 'src/app/services/viajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css'],
})
export class ViajeComponent implements OnInit {
  Lugar = new ViajesModel();
  visitado = true;
  constructor(
    private viajesService: ViajesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //obtener el id sin tener que suscribirme a los cambios del mismo
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id !== 'nuevo') {
      this.viajesService.getViaje(id).subscribe((data: ViajesModel) => {
        console.log(data);
        this.Lugar = data;
        this.Lugar.id = id;
      });
    }
  }

  alertaSwallSuccess() {
    Swal.fire({
      title: 'Perfecto!',
      text: 'Guardando la Información',
      icon: 'success',
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }

  alertaSwallError(err: any) {
    Swal.fire({
      title: 'Error!',
      text: err,
      icon: 'error',
      allowOutsideClick: true,
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      this.alertaSwallError('Formulario no válido');
      return;
    }

    if (!this.Lugar.id) {
      this.viajesService.crearViaje(this.Lugar).subscribe(
        (data) => {
          this.alertaSwallSuccess();
          setTimeout(() => {
            Swal.close();
          }, 1800);
        },
        (err) => {
          this.alertaSwallError(err.error.error);
          console.log(err.error.error);
        }
      );
    } else {
      this.viajesService.editarViaje(this.Lugar).subscribe(
        (data) => {
          console.log(data);
          this.alertaSwallSuccess();
          setTimeout(() => {
            Swal.close();
          }, 1800);
        },
        (err) => {
          console.log(err);
          this.alertaSwallError('Fallo de la Url al editar');
        }
      );
    }
  }
}
