import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViajesModel } from '../models/viajes.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private url: string =
    'https://crud-9c7f1-default-rtdb.europe-west1.firebasedatabase.app';
  constructor(private http: HttpClient) {}

  crearViaje(viaje: ViajesModel) {
    return this.http.post(`${this.url}/viajes.json`, viaje).pipe(
      map((resp: any) => {
        viaje.id = resp.name;
        return viaje;
      })
    );
  }

  editarViaje(viaje: ViajesModel) {
    const idBorrado = {
      ...viaje,
    };
    delete idBorrado.id;

    return this.http.put(`${this.url}/viajes/${viaje.id}.json`, viaje);
  }

  getViajes() {
    return this.http
      .get(`${this.url}/viajes.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(viajesObj: object) {
    const viajes: ViajesModel[] = [];
    console.log(viajesObj);
    if (viajesObj === null) {
      return [];
    }
    Object.keys(viajesObj).forEach((key) => {
      console.log(key);
      const viaje: ViajesModel = viajesObj[key];
      viaje.id = key;
      viajes.push(viaje);
    });
    return viajes;
  }

  getViaje(id: string) {
    return this.http.get(`${this.url}/viajes/${id}.json`);
  }

  borrarViaje(id: ViajesModel) {
    return this.http.delete(`${this.url}/viajes/${id}.json`);
  }
}
