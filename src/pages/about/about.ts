import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Movement } from '../../models/movement';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private alertController: AlertController, private dbProvider: DatabaseProvider) {

  }

  getAllMovements(){
    this.dbProvider.getAllMovements().then(movements => {
      console.log(movements);
    })
    .catch( error => {
      console.error( error );
    });
  }

  agregarMovimiento(producto: string, precio: number){
    const movement: Movement = {
      producto : producto,
      precio : precio
    }
    this.dbProvider.insertMovement(movement);
    this.getAllMovements();
    // this.nombre = '';

    // this.dbProvider.getAllTasks().then(tasks => {
    //   this.tasks = tasks;
    // }).catch( error => {
    //   console.error( error );
    // });
  }

  abrirAlertAgregar(card: string){
    let alertAgregar = this.alertController.create({
      title: "Agregar Movimiento",
      inputs: [
        {
          type: "text",
          name: "producto",
          placeholder: "Producto"
        },
        {
          type: "number",
          name: "precio",
          min: 0,
          placeholder: "Precio"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add",
          handler: (datos) => {
            if(datos.precio != "" && datos.producto.trim() != ""){
              const movement: Movement = {
                producto : datos.producto,
                precio : datos.precio
              }
              this.dbProvider.insertMovement(movement);
              this.getAllMovements();
              return true;
            }
            return false;
          }
        }
      ]
    })
    alertAgregar.present();
  }
}
