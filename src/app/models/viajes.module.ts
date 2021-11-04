export class ViajesModel {
  id: string;
  viaje: string;
  distancia: number;
  clima: string;
  visitado: boolean;

  constructor() {
    this.visitado = true;
  }
}
