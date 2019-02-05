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

    dbProvider.getAllTasks().then(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  getAllTasks(){
    this.dbProvider.getAllTasks().then(tasks => {
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
    this.dbProvider.insertTask(task);
    this.nombre = '';

    this.dbProvider.getAllTasks().then(tasks => {
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
      this.dbProvider.deleteTask(element);
    });

    this.dbProvider.getAllTasks().then(tasks => {
      this.tasks = tasks;
    }).catch( error => {
      console.error( error );
    });
  }
}
