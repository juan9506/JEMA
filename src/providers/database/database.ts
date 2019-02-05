import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Task } from '../../models/task';
import { Movement } from '../../models/movement';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    
  }
  
  public getBD(){
    return this.sqlite.create({
      name: 'JEMA',
      location: 'default'
    });
  }

  public createDB(){
    return this.getBD().then((db: SQLiteObject) => {
      this.createTables(db);
    }).catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject){
    return db.sqlBatch(
      ['CREATE TABLE IF NOT EXISTS tasks (nombre varchar(50) PRIMARY KEY NOT NULL, completado boolean)',
      'CREATE TABLE IF NOT EXISTS movements (producto VARCHAR(50) NOT NULL, precio NUMBER NOT NULL)',
      'CREATE TABLE IF NOT EXISTS wallet (efectivo NUMBER NOT NULL, tarjeta NUMBER NOT NULL)']
    ).then(() => {
      console.log("Tabla creada correctamente");
    }).catch(e => console.error(e));
  }

  getAllTasks(){
    return this.getBD().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM tasks';
      return db.executeSql(sql, [])
      .then(response => {
        let tasks = [];
        for (let index = 0; index < response.rows.length; index++) {
          tasks.push( response.rows.item(index) );
        }
        return Promise.resolve( tasks );
      })
    }).catch(error => Promise.reject(error));
  }

  getAllMovements(){
    return this.getBD().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM movements';
      return db.executeSql(sql, [])
      .then(response => {
        let movements = [];
        for (let index = 0; index < response.rows.length; index++) {
          movements.push( response.rows.item(index) );
        }
        return Promise.resolve( movements );
      })
    }).catch(error => Promise.reject(error));
  }

  insertTask(task: Task){
    this.getBD().then((db: SQLiteObject) => {
      let sql = 'INSERT INTO tasks (nombre, completado) VALUES (?,?)';
      db.executeSql(sql, [task.nombre, task.completado])
      .then(() => {
        console.log("Agregado")
      })
    }).catch(error => Promise.reject(error));
  }

  insertMovement(movement: Movement){
    this.getBD().then((db: SQLiteObject) => {
      let sql = 'INSERT INTO movements (producto, precio) VALUES (?,?)';
      db.executeSql(sql, [movement.producto, movement.precio])
      .then(() => {
        console.log("Agregado")
      })
    }).catch(error => Promise.reject(error));
  }

  deleteTask(nombre: string){
    this.getBD().then((db: SQLiteObject) => {
      let sql = 'DELETE FROM tasks WHERE nombre = ?';
      db.executeSql(sql, [nombre])
      .then(() => {
        console.log("Agregado")
      })
    }).catch(error => Promise.reject(error));
  }
}
