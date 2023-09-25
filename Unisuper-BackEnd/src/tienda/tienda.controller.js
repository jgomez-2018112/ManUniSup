'use strict'

const { connectDB_Herramienta_Unisuper, connectDBSAC} = require('../../configs/Conexion');
const sql = require('mssql');

//prueba
exports.test = async(req,res)=>{
    return res.send({message: 'test function is running'});
}



// ---------------------------------------------------------------------------*INFRAESTRUCTURA*--------------------------------------------------------------------
//INSSERT TB_T_Tienda INFRA
exports.insertTiendaINFRA = async(req,res)=>{
    try{
        //se realiza la conexion a la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //Se traen los datos del body
        let  {id_tienda, tienda, id_tipo_tienda} = req.body;

        //Se valida que se traigan todos los datos
        if(!id_tienda || !tienda || !id_tipo_tienda) return res.status(400).send({message: 'Error falta llenar datos'});

        //Se realiza el query de INSERT en TB_T_Tienda
        await pool.request().input("ID_Tienda", id_tienda).
        input("Tienda", tienda).
        input("ID_Tipo_Tienda", id_tipo_tienda).
        query(`EXEC SP_INSERT_TB_T_Tienda @id_tienda , @tienda , @id_tipo_tienda`);


        //Se cierra la conexion
        pool.close();
        return res.status(200).send({message: 'Registro Creado', id_tienda, tienda, id_tipo_tienda});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Insertar una Tienda', error: err.message});
    }
}

//TRAER tipo de Tienda
exports.getTipoTienda = async(req,res)=>{
    try{
        //se realiza la conexion con la base de Datos
        const pool = await connectDB_Herramienta_Unisuper();

        //Se ejecuta el Procedimiento
        let tipo = await pool.request().query('EXEC SP_TRAER_TB_T_Tienda_Tipo;');

        //Se cierra la conexion
        pool.close();
        return res.send({message: tipo.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer los tipos de tienda', error: err.message});
    }
}

//INSERT Supervisor
exports.insertSup = async(req,res)=>{
    try{
        //se realiza la conexion con la base de datos 
        const pool = await connectDB_Herramienta_Unisuper();


        //se traen los datos del body
        const {id_tienda, id_usuario_1} = req.body;

        //se valida que llenen todos los datos
        if(!id_tienda || !id_usuario_1) return res.status(400).send({message: 'Error faltan llenar datos'});

        //se ejecuta el query de insert
        await pool.request().input("ID_Tienda", id_tienda).
        input("ID_Usuario_1", id_usuario_1).
        query('EXEC SP_INSERT_TB_PT_Tienda_Persona @id_tienda , @id_usuario_1, 5 , 9, 10')

        //se cierra la conexion
        pool.close();
        return res.send({message: 'Supervisor Registrado', id_tienda, id_usuario_1});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al insertar el sup'})
    }
}


//INSERT TB_PSE_Supervisor_Tecnico_Tienda
exports.addTecnicoTiendaNFRA = async(req, res)=>{
    try{
        //Se realiza la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //Se traen los datos del Body
        const {id_tienda, clase, id_persona} = req.body

        //Se valida que vegan los datos 
        if(!id_tienda || !clase || !id_persona) return res.status(400).send({message: 'Error faltan llenar datos'})


        //Se ejecuta el query del insert
        await pool.request().input("ID_Tienda", id_tienda).
        input("Clase", clase).
        input("ID_Persona", id_persona).
        query('EXEC SP_INSERT_TB_PSE_Supervisor_Tecnico_Tienda @id_tienda, @clase, @id_persona');

        //Se Cierra la conexion
        pool.close();
        return res.send({message: 'Se agrego el Tecnico correctamente', id_tienda, clase, id_persona});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Agregar al tecnico'})
    }
}

//Se traen las clases de supervisores
exports.getClaseINFRA = async(req,res)=>{
    try{
        //Se realiza la conexion
        const pool = await connectDB_Herramienta_Unisuper();

        //Se ejecuta el query del get
        const clase = await pool.request().query('EXEC SP_TARER_TB_C_Clase')

        //Se cierra la conexion
        pool.close();
        return res.send({message: clase.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer la clase'});
    }
}


//INSERT TB_PSC_Supervisor_Compas_Tienda
exports.addTB_PSC_Supervisor_Compas_Tienda = async(req,res)=>{
    try{
        //se realiza la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //se traen los datos del  body
        const {id_tienda, id_tipo_clase, id_persona} = req.body;

        //Se valida que llenen todos los datos
        if(!id_tienda || !id_tipo_clase || !id_persona) return res.status(400).send({message: 'Error faltan llenar datos'});


        //Se ejecuta el query del insert
        await pool.request().input("ID_Tienda", id_tienda).
        input("ID_Tipo_Clase", id_tipo_clase).
        input("ID_Persona", id_persona).
        query('EXEC SP_TB_PSC_Supervisor_Compas_Tienda @id_tienda, @id_tipo_clase, @id_persona');

        //Se cierra la conexion
        pool.close()
        return res.send({message: 'Compra Agregada', id_tienda, id_tipo_clase, id_persona});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al insertar la compra'})
    }
}


//Se realiza el get Tipo Clase
exports.getTipoClase = async(req,res)=>{
    try{
        //se realiza la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //se ejecuta el query get
        const tiposClase  = await pool.request().query('EXEC SP_TRAER_TB_C_Tipo_Clase')

        //Se cierra la conexion
        pool.close()
        return res.send({message: tiposClase.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer los tipos clase'});
    }
}

//Se realiza el get de Persona Compras
exports.getPersonaCompras = async(req,res)=>{
    try{
        //Se realiza la conexion con la base de datos
        const pool = await connectDB_Herramienta_Unisuper();

        //Se ejecuta el query de get
        const personaCompra = await pool.request().query('EXEC SP_TRAER_TB_P_Persona_Compra')

        //Se cierra la conexion
        pool.close()
        return res.send({message: personaCompra.recordset});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer Persona Compras'})
    }
}



//--------------------------------------------------------*SAC*--------------------------------------------------------------------------------------------------

//InsertSAC
exports.addTiendaSAC = async(req,res)=>{
    try{
        //Se establece la conexion con la base de datos
        const pool = await connectDBSAC();

        //Se traen los datos del body
        const {tienda, telefono, direccion} = req.body;

        //Se valida que escriban la tienda
        if(!tienda) return res.status(400).send({message: 'Error  falta escribir la tienda'});

        //Se ejecuta el query de agregar SP_INSERT_TBL_Unisuper_Tienda
        await pool.request().input("Tienda", tienda).
        input("Telefono", telefono).
        input("Direccion", direccion).
        query('EXEC SP_INSERT_TBL_Unisuper_Tienda @tienda, @telefono, @direccion');

        //Se ejecuta el query de 
        await pool.request().input("Tienda", tienda).
        query('EXEC SP_INSERT_TBL_Unisuper_TiendasUnisuper @tienda')

        pool.close()
        return res.status(200).send({message: 'Tienda agregada exitosamente', tienda, telefono, direccion})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregar la Tienda'});
    }
}






