const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require("./enrutador");

module.exports = (req, res) => {
    //1. obtener url
    const urlActual = req.url;
    const urlParse = url.parse(urlActual,true);  
    //2. obtener ruta
    const ruta = urlParse.pathname;
    //3. ruta limpia
    const rutaLimpia = ruta.replace('/','');
    //3.1 obtener metodo http
    const metodo = req.method.toLowerCase();  

    //3.1.1 dar permisos de CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Request-Methods','OPTIONES,GET,PUT,DELETE, POST');
    res.setHeader('Access-Control-Allow-Methods','OPTIONES,GET,PUT,DELETE, POST');
    //3.1.2 dar respuesta cuando el metodo sea options
    if(metodo === 'options'){
        res.writeHead(200);
        res.end();
        return;
    }

    //3.2 obtener variables del query
    const { query = {} } = urlParse;
    //3.3 obtener headers
    const { headers = {} } = req;
    //3.4 obtener payload
    const decoder = new StringDecoder('utf8');
    let buffer = '';
    //3.4.1 acumular la data cuando el request reciba un payload
    req.on('data', (data)=>{
      buffer += decoder.write(data);
    });
    //3.4.2 terminar de acumular la data cuando el decoder finalice
    req.on('end', ()=>{
      buffer += decoder.end();
  
      if (headers["content-type"]==="application/json")
      {
        buffer=JSON.parse(buffer);
      };
  
      //3.4.3 revisar si tenen subrutas
      //let indice = null;
      if (rutaLimpia.indexOf("/") > -1){
        var [rutaprincipal,indice] = rutaLimpia.split("/");
      }
      else{
        var rutaprincipal = rutaLimpia;
      }
  
      //3.5 ordenar la data
      const data = {
        indice,ruta:rutaprincipal,query,metodo,headers,payload:buffer
      };
  
      console.log({data});
  
      //3.6 elegir manejador dependiendo de la ruta
      let handler;
      if (rutaprincipal && enrutador[rutaprincipal] && enrutador[rutaprincipal][metodo]){
        handler = enrutador[rutaprincipal][metodo];
      }
      else{
        handler = enrutador.noEncontrado
      };
      //4. ejecutar handler para enviar respuesta
      if (typeof handler==='function'){
        handler(data,(status = 200,mensaje )=>{
          const respuesta = JSON.stringify(mensaje);
          res.setHeader('Content-Type','application/json')
          res.writeHead(status);
          //aqui se manda la respuesta
          res.end(respuesta);
        });
      }
      else{
        res.end('ruta no es /ruta2')
      }    
  
    });
    //console.log({urlActual, urlParse});
  };
  
  