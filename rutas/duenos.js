module.exports = function duenosH(duenos) {
    return {
      get: (data, callback) => {
        console.log('indice get ' + data.indice);
        if(typeof data.indice !== 'undefined') {
          if (duenos[data.indice]){
            return callback(200,duenos[data.indice]);
          }
          return callback(404,{mensaje: `elemento con indice ${data.indice} no encontrado`});
        };
        return callback(200,duenos);
      },
      post: (data, callback) => {
        console.log('indice post ', data.indice);
        duenos.push(data.payload);
        return callback(201,data.payload);
      },
      put: (data, callback) => {
        console.log('indice put ', data.indice);
        if(typeof data.indice !== "undefined") {
          if (duenos[data.indice]) {
            duenos[data.indice] = data.payload;
            return callback(200,duenos[data.indice]);
          }
          return callback(404,{mensaje: `elemento con indice ${data.indice} no encontrado`,});
        }
        return callback(400,{mensaje:'Indice no enviado'});
      },
      delete: (data, callback) => {
        console.log('indice delete ', data.indice);
        if(typeof data.indice !== "undefined") {
          if (duenos[data.indice]) {
            duenos = duenos.filter(
              (_mascota, indice) => indice != data.indice
            );
            return callback(204,{mensaje: `elemento con indice ${data.indice} eliminado`,});
          }
          return callback(404,{mensaje: `elemento con indice ${data.indice} no encontrado`,});
        }
        return callback(400,{mensaje:'Indice no enviado'});
      },
    };
  };