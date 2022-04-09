module.exports = function consultasH(consultas) {
    return {
      get: (data, callback) => {
        console.log('indice get ' + data.indice);
        if(typeof data.indice !== 'undefined') {
          if (consultas[data.indice]){
            return callback(200,consultas[data.indice]);
          }
          return callback(404,{mensaje: `elemento con indice ${data.indice} no encontrado`});
        };
        return callback(200,consultas);
      },
      post: (data, callback) => {
        console.log('indice post ', data.indice);
        let nuevaConsulta = data.payload;
        nuevaConsulta.fechaCreacion = new Date();
        nuevaConsulta.fechaEdicion = null;
        //consultas.push(data.payload);
        consultas = [...consultas,nuevaConsulta]
        return callback(201,nuevaConsulta);
      },
      put: (data, callback) => {
        console.log('indice put ', data.indice);
        if(typeof data.indice !== "undefined") {
          if (consultas[data.indice]) {
            //let nuevaConsulta = data.payload;
            //nuevaConsulta.fechaEdicion= new Date();
            const { fechaCreacion } = consultas[data.indice];            
            consultas[data.indice] = {...data.payload, fechaCreacion, fechaEdicion: new Date()};
            return callback(200,consultas[data.indice]);
          }
          return callback(404,{mensaje: `elemento con indice ${data.indice} no encontrado`,});
        }
        return callback(400,{mensaje:'Indice no enviado'});
      },
      delete: (data, callback) => {
        console.log('indice delete ', data.indice);
        if(typeof data.indice !== "undefined") {
          if (consultas[data.indice]) {
            consultas = consultas.filter(
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