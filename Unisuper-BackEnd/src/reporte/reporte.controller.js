'use strict'

const { connectDB_Herramienta_Unisuper } = require('../../configs/Conexion');
const sql = require('mssql');

//Test
exports.test = (req, res) => {
    return res.send({ message: 'Test function report is running' })
}

//Get de Supervisores tienda
exports.getSupTienda = async (req, res) => {
    try {
        const pool = await connectDB_Herramienta_Unisuper()

        let supervisores = await pool.request().query('SELECT * FROM VW_Supervisores_Tienda')
        pool.close()

        return res.send({ message: supervisores.recordset })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al traer supervisores de tienda', error: err })
    }
}

//Get de Tecnicos tienda
exports.getTecTienda = async (req, res) => {
    try {
        const pool = await connectDB_Herramienta_Unisuper()

        let tecnicos = await pool.request().query('SELECT * FROM VW_Tecnicos_Tienda')
        pool.close()

        return res.send({ message: tecnicos.recordset })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al traer tecnicos de tienda', error: err })
    }
}

//se traen los datos de la tabla
exports.getAsignSupInfra = async(req,res)=>{
    try{
        //Se establece la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper()

        //Se realiza el query
        const asSup = await  pool.request().query('SELECT * FROM VW_TB_PSE_Supervisor_Tecnico_Tienda');

        //se cierra la conexion
        pool.close()
        return res.send({message: asSup.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer la tabla TB_PSE_Supervisor_Tecnico_Tienda'});
    }
}

//Actualizacion de Supervisor
exports.updateSup = async(req,res)=>{
    try{
        //Se hace la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //Se traen los datos del Body
        const {id_persona, clase, id_tienda} = req.body;

        //Se valida que vengan los datos
        if(!id_persona || !clase || !id_tienda) return res.status(400).send({message: 'Error faltan datos'});

        //Se ejecuta el query de Update
        await pool.request().input("ID_Persona", id_persona).
        input("Clase", clase).
        input("ID_Tienda", id_tienda).
        query('EXEC SP_UPDATE_TB_PSE_Supervisor_Tecnico_Tienda @id_persona, @clase, @id_tienda');

        //Se cierra la conexion 
        pool.close()
        return res.status(200).send({message: 'SUPERVISOR ACTUALIZADO', id_persona, clase, id_tienda})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Actualizar el Supervisor', error: err.message});
    }
}



