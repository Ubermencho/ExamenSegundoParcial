var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      X GET       /all
      X GET       /byid/:id
      X GET       /bycompany/:company
      X GET       /bytag/:tag
      X POST      /addtag/:id              tag
      X DELETE    /delete/:id
      X POST      /makeolder               age
   */

//http://localhost:3000/api/employees/all
  router.get('/all', (req, res) => {
    empModel.getEmployees( (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"Error":"Oops, algo salio mal!"})
      }
        return res.status(200).json(docs);
    });
    });// all

//http://localhost:3000/api/employees/byid/:id
  router.get('/byid/:id', (req, res)=>{
    var id =  req.params.id ;
    empModel.getEmployeesById(id, (err, doc)=>{
     if(err){
        console.log(err);
        return res.status(500).json({"Error":"Oops, algo salio mal!"});
      }
        return res.status(200).json(doc);
    });
    });

    //http://localhost:3000/api/employees/bycompany/:company
    router.get('/bycompany/:company', (req, res)=>{
      var company =  req.params.company ;
      empModel.getEmployeesByCompany(company, (err, doc)=>{
        if(err){
          console.log(err);
          return res.status(500).json({"Error":"Oops, algo salio mal!"});
        }
        return res.status(200).json(doc);
    });
    });

//http://localhost:3000/api/employees/bytag/:tag
router.get('/bytag/:tag', (req, res)=>{
  var tag =  req.params.tag ;
  empModel.getEmployeesByTag(tag, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"Error":"Oops, algo salio mal!"});
    }
    return res.status(200).json(doc);
});
});

//http://localhost:3000/api/employees/addtag/:id
router.post('/addtag/:id', (req, res)=>{
  var id = req.params.id.toString();
  var tag = req.body.tag.toString();
  empModel.addEmployeeATag(tag, id, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"Error":"Oops, algo salio mal!"});
    }
    return res.status(200).json(doc);
    });
});

//http://localhost:3000/api/employees/delete/:id
router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id.toString();
  empModel.removeEmployee(id, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"Error":"Oops, algo salio mal!"});
    }
    return res.status(200).json(doc);
    });
});

//http://localhost:3000/api/employees/makeolder
router.post('/makeolder', (req, res)=>{
  var inc = parseInt(req.body.incr);
  empModel.increaseAgeToAll(inc, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"Error":"Oops, algo salio mal!"});
    }
    return res.status(200).json(doc);
    });
});


  return router;
}

module.exports = initEmployee;
