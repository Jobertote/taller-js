const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post('/', async(req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if(nombre && apellidos && telefono && correo && direccion){
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, correo, direccion)";
        query += ` VALUES('${nombre}', '${apellidos}', ${telefono}, '${correo}', '${direccion}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Valores insertados correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error"})
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

empleado.delete('/:id([0-9]{1,3})', async(req, res, next) => {
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;

    const rows = await db.query(query);
    if(rows.affectedRows){
        return res.status(201).json({ code: 200, message: "Borrado correctamente"});
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado"});
});

empleado.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if(nombre && apellidos && telefono && correo && direccion){
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',telefono=${telefono},correo='${correo}',direccion= '${direccion}' WHERE id = ${req.params.id};`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Valores actualizados correctamente"});
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error"})
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});

});

empleado.get('/', async(req, res, next) => {
    const emplea = await db.query("SELECT * FROM empleados");
    return res.status(201).json({code: 201, message: emplea});
});

empleado.get('/:id([0-9]{1,3})', async(req, res, next) => {
    const id = req.params.id;
    if(id >= 1 && id <= 150){
        const emplea = await db.query("SELECT * FROM empleados WHERE id="+id+";");
        return res.status(201).json({code: 201, message: emplea}); 
    }
    return res.status(404).json({code: 404, message: "URL no encontrada"});
    
});

empleado.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    const emplea = await db.query("SELECT * FROM empleados WHERE nombre='"+name+"';");
    if(emplea.length > 0 ){
        return res.status(201).json({code: 201, message: emplea});    
    } 
    return res.status(404).json({code: 404, message: "URL no encontrada"});
});

module.exports = empleado;