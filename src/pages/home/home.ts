import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Task } from '../../models/task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: any[] = [];
  nombre: string = "";
  completados: string[] = [];

  constructor(public navCtrl: NavController, private dbProvider: DatabaseProvider) {
    dbProvider.createDB().then(() => {
      console.log("Correcto")
    }).catch(e => console.error(e))

    dbProvider.getAll().then(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  getAllTasks(){
    this.dbProvider.getAll().then(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  agregarRegistro(){
    const task: Task = {
      nombre : this.nombre,
      completado : false
    }
    this.dbProvider.insert(task);
    this.nombre = '';

    this.dbProvider.getAll().then(tasks => {
      this.tasks = tasks;
    }).catch( error => {
      console.error( error );
    });
  }

  completado(event, nombre: string){
    if(event.checked){
      this.completados.push(nombre);
    }else if(!event.checked){
      for(var i = 0; i < this.completados.length; i++){
        if(this.completados[i] == nombre){
          this.completados.splice(i,1);
        }
      }
    }
    console.log(this.completados)
  }

  eliminarRegistros(){
    this.completados.forEach(element => {
      this.dbProvider.delete(element);
    });

    this.dbProvider.getAll().then(tasks => {
      this.tasks = tasks;
    }).catch( error => {
      console.error( error );
    });
  }
}
