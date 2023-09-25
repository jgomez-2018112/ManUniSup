'use strict'


const { connectDB_Herramienta_Unisuper, connectDBSAC } = require('../../configs/Conexion');
const sql = require('mssql');



//Prueba
exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
}

//Funcion Insert en UNISUPER Infraestructura
exports.insertUserInfra = async(req,res)=>{
    try{
        //ser realiza la concexion
        const pool = await connectDB_Herramienta_Unisuper();

        //Se llaman los datos del Body
        const {telefono, nombre, correo, id_rol, id_usuario, contraseña } = req.body;

        //Se valida que llenen todos los campos
       

        //Se valida la canatidad maxima de roles
        if(id_rol > 6){
            return res.status(400).send({message: 'Solo existen  6 id_roles'});
        }
       

        //Se realiza el Query Insert en la tabla TB_P_Persona
        await pool.request().input("Telefono", telefono).
        input("Nombre", nombre).
        input("Correo", correo).
        input("ID_Rol", id_rol).
        query('EXEC SP_INSERT_TB_P_Persona @telefono, @nombre, @correo, @id_rol');
         

        //se realzia el Query Insert de la tabla TB_P_Usuario
        await pool.request().input("ID_Usuario", id_usuario).
        input("Contraseña", contraseña).
        query('EXEC SP_INSERT_TB_P_Usuario @id_usuario, @contraseña');

        //Se realiza el Query Insert de la tabla TB_P_Persona_Usuario
        await pool.request().input("ID_Usuario", sql.VarChar, id_usuario).
        query('INSERT INTO TB_P_Persona_Usuario(ID_Usuario, ID_Persona) VALUES(@id_usuario, (select MAX(ID_persona) from TB_P_Persona))');


        //Se realizar al Query de la tabla TB_P_Login
        await pool.request().input("ID_Usuario", id_usuario).
        query('EXEC SP_INSERT_TB_P_Login @id_usuario , 1')

        pool.close();
        return res.send({message: 'Persona Agregada exitosamente', telefono, nombre, correo, id_rol, id_usuario, contraseña});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Insertar el usuario', error:err.message});
    }
}


//Funcion de traer Personas UNISUPER Infraestructura
exports.getPersonasINFRA = async(req,res)=>{
    try{
        //conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //ejecuacion del query
        const result = await pool.request().query("EXEC SP_TRAER_TB_P_Persona");
        pool.close();
        return res.send({message: result.recordset});
    }catch(err){
        console.error(err);
    }
}


exports.getRol = async(req,res)=>{
    try{
        //Se establece la conexion
        const pool = await connectDB_Herramienta_Unisuper();

        //Se ejecuta el query
        const result = await pool.request().query('EXEC SP_TRAER_TB_P_ROL');
        pool.close();
        return res.send({message: result.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer los roles'});
    }
}

//Funcion Insert en UNISUPER SAC
exports.insertUserSAC = async(req,res)=>{
    try{
        //se establece la conexion
        const pool = await connectDBSAC();

        //Se llaman los datos
        const { nombre, apellido, rol, usuario, password } = req.body;

        //Se valida que se llenen los campos
        if(!nombre || !apellido || !rol  || !usuario || !password){
            return res.status(400).send({message: 'Error faltan llenar datos'});
        };

        //Se validan caracteres especiales

        //Se realiza el insert TBL_Unisuper_P_Persona
        await pool.request().
        input("Nombre", nombre).
        input("Apellido", apellido).
        input("rol", rol).
        query('EXEC SP_INSERT_TBL_Unisuper_P_Persona @nombre, @apellido, @rol, 1');


        //Se realiza el insert TBL_Unisuper_P_Usuario
        await pool.request().
        input("Usuario",  usuario).
        input("Password", password).
        query('EXEC SP_INSERT_TBL_Unisuper_P_Usuario 0,@usuario, @password');

        pool.close();
        return res.send({message: 'Persona Agregada exitosamente', nombre, apellido, rol, usuario, password});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Insertar el usuario', error:err.message});
    }
}


//Funcion de traer Personas UNISUPER Infraestructura
exports.getPersonasSAC = async(req,res)=>{
    try{
        //conexion a la base de datos
        const pool = await connectDBSAC();

        //Ejecucion del query
        const result = await pool.request().query("SELECT * FROM TBL_Unisuper_P_Persona;");
        pool.close();
        return res.send({message: result.recordset})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer a las personas de UNISUPER SAC', error: err.message});
    }
}

exports.getRolSAC = async(req,res)=>{
    try{
        //se establece la conexion
        const pool = await connectDBSAC();

        //se ejecuta el query
        const result = await pool.request().query('EXEC SP_TRAER_TBL_Unisuper_P_Rol')
        pool.close()
        return res.send({message: result.recordset});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al traer los roles'})
    }
}








