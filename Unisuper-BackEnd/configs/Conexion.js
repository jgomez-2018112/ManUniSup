'use strict'
const Connection = require('tedious').Connection;
const sql = require('mssql');



// Conexion a la base de Datos 

const configINFRA = {
    user: "aplicaciones",
    password: "$Desarrollo",
    server: "108.161.128.107",
    database: "DB_Herramienta_Unisuper",
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
};

const configSAC = {
    user: "aplicaciones",
    password: "$Desarrollo",
    server: "108.161.128.107",
    database: "UNISUPER_GT",
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
};

//Establecer la conexion en base de datos DB_Herramienta_Unisuper
exports.connectDB_Herramienta_Unisuper = async(req,res)=>{ 
    try{
        const pool = await sql.connect(configINFRA);
        console.log('Conexion con la base de datos DB_Herramienta_Unisuper exitosa');
        return pool
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al conectarse a la base de datos '})
    }
}


//Establecer la conexion en la base de Datos UNISUPER_GT
exports.connectDBSAC = async(req,res)=>{
    try{
        const pool = await sql.connect(configSAC)
        console.log('Conexion con la base de datos UNISUPER_GT  exitosa');
        return pool
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al conectarse con la base de datos'});
    }
}







/*async function insertarPersonas(Telefono, Nombre, Correo, ID_Rol){
    try{


        //Se establece la conexion
        await sql.connect(config);

        //Se prepra el Consulta el imsert
        const query=`INSERT INTO  TB_P_Persona (Telefono, Nombre, Correo, ID_Rol) VALUES (@Telefono, @Nombre, @Correo, @ID_Rol)`;

        //CrearSolicitud
        const request = new sql.Request();

        //Agregar  parametros de consulta
        request.input('Telefono', sql.NVarChar, Telefono);
        request.input('Nombre', sql.NVarChar, Nombre);
        request.input('Correo', sql.NVarChar, Correo);
        request.input('ID_Rol', sql.Int, ID_Rol);

        //Ejecutar el Insert
        const result = await request.query(query);
        console.log('Persona registrada en la base de datos');
    }catch(error){
        console.error('Error al insertar persona');
    }finally{
        sql.close();
    }
}*/
//insertarPersonas('0', 'PRUEBAS', 'PRUEBA@grupopit.com', '2');

