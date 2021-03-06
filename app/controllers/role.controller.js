const db = require('../models/index');

function getAll(req, res){

    db.Role.findAll({
        attributes:['id','name','code'],
        order:[['name', 'DESC']]
    }).then(registers =>{
        
        res.status(200).send(registers)

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })

    
}

function getOne(req, res){

    const key = req.params.key
    const value = req.params.value

    db.Role.findAll({
        where: {[key]: value}

    }).then(register =>{
        
        res.status(200).send(register)

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })
};

function create(req, res){

    const newRegister = {
        name: req.body.name,
        code: req.body.code
    }

    db.Role.create(newRegister)
    .then(register => {
        res.status(200).send({
            msg : 'OK creado correctamente',
            register: register
        })  
    })
    .catch(err =>{
        res.status(500).send({
            msg: 'Error en la carga',
            error: err
        })
    });
    
};

function edit(req, res){

    let editRegister = {
        name: req.body.name,
        code: req.body.code
    }

    if (req.body.deleted) {
       editRegister = {
           deleted: true
       } 
    }

    const idReg = req.params.id

    db.Role.update(editRegister,{
        where: {id: idReg}
    })
    .then(register => {
        res.status(200).send({
            msg : 'OK actualizado correctamente',
            register: register
        })  
    })
    .catch(err =>{
        res.status(500).send({
            msg: 'Error en la actualizacion',
            error: err
        })
    });


};

function remove(req, res){
    req.body.deleted = true

    edit(req, res);
};

module.exports = {
    getAll,
    getOne,
    create,
    edit,
    remove
}