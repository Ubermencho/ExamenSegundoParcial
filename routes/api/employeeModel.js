var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('employees');

  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(handler);
  }

  lib.getEmployeesById = (id, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    var query = {"_id":new ObjectID(id)};
    var pro = {"email":1, "phone":1, "name":1, "age":1, "_id":0}
    empColl.findOne(
      query,
      {"projection": pro},
      (err,doc)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, doc);
      }
    );
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    var query = {"company":company};
    var pro = {"name":1, "email":1, "company":1, "_id":0}
    empColl.find(
      query,
      {"projection": pro},
    ).toArray(handler);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    var query = {"tags":tag};
    var pro = {"name":1, "email":1, "tags":1,"_id":0}
    empColl.find(
      query,
      {"projection": pro}

    ).toArray(handler);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    var query = {"_id": new ObjectID(id)};
    empColl.update(
      query,
      {$push:{"tags": tag}},
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    var query = {"_id": new ObjectID(id)};
    empColl.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    var query = {$inc: {"age": ageDelta}};
    empColl.update(
      {},
      query,
      {"multi": true},
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }

  return lib;
}

module.exports = employeeModel;
