import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private alertController: AlertController) {

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
