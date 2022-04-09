const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");
//global.recursos = recursos;

module.exports = {
    ruta: (data, callback) => {
      callback(200,{mensaje:'Esta es /ruta'});
    },
    //mascotas: 
    mascotas: mascotas(recursos.mascotas),
    veterinarias: veterinarias(recursos.veterinarias),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos.consultas),
    usuarios: (data, callback) => {
      callback(200,[{nombre:'usaurio1'},{nombre:'usaurio2'}]);
    },
    noEncontrado: (data, callback) => {
      callback(404,{mensaje:'Ruta no encontrada'});
    }
  };
  