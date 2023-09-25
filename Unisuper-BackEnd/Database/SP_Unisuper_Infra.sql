USE DB_Herramienta_Unisuper_20230706
GO

--INSERT USERINFRA
/*CREATE PROCEDURE SP_INSERT_TB_P_Persona(@telefono int, @nombre nvarchar(75), @correo nvarchar(100),@id_rol int)
	AS
	BEGIN
		INSERT INTO TB_P_Persona(Telefono, Nombre, Correo, ID_Rol)
		VALUES(@telefono, @nombre, @correo, @id_rol);
	END;*/
GO

--INSERT TB_P_Usuario
/*CREATE PROCEDURE SP_INSERT_TB_P_Usuario(@id_usuario nvarchar(30),@contraseña nvarchar(30))
	AS
	BEGIN
		INSERT INTO TB_P_Usuario(ID_Usuario, Contraseña)
		VALUES(@id_usuario, @contraseña)
	END;*/
GO

--INSERT TB_P_Login
/*CREATE PROCEDURE SP_INSERT_TB_P_Login(@id_usuario nvarchar(50), @id_estatus_login int)
	AS
	BEGIN
		INSERT INTO TB_P_Login(ID_Usuario, ID_Estatus_Login)
		VALUES(@id_usuario, @id_estatus_login)
	END;*/

GO

--TRAER ROL
/*CREATE PROCEDURE SP_TRAER_TB_P_Rol 
	AS
	BEGIN
		SELECT * FROM TB_P_Rol
	END;*/
	
GO


--CREAR UNA TIENDA
/*CREATE PROCEDURE SP_INSERT_TB_T_Tienda(@id_tienda nvarchar(10), @tienda nvarchar(100), @id_tipo_tienda int)
	as
	begin
		INSERT INTO TB_T_Tienda(ID_Tienda, Tienda, ID_Tipo_Tienda)
		VALUES (@id_tienda, @tienda, @id_tipo_tienda);
	end;*/


SELECT * FROM TB_T_Tienda; 


GO

/*CREATE PROCEDURE SP_TRAER_TB_T_Tienda_Tipo
	AS
	BEGIN
		SELECT * FROM TB_T_Tienda_Tipo;
	END;*/
	
EXEC SP_TRAER_TB_T_Tienda_Tipo;

GO

--AGREGAR UN SUP
/*CREATE PROCEDURE SP_INSERT_TB_PT_Tienda_Persona(@id_tienda nvarchar(50),@id_usuario_1 int, @id_usuario_2 int, @id_usuario_3 int, @id_usuario_4 int)
	AS
	BEGIN
		INSERT INTO TB_PT_Tienda_Persona(ID_Tienda, ID_Usuario_1, ID_Usuario_2, ID_Usuario_3, ID_Usuario_4)
		VALUES(@id_tienda, @id_usuario_1, @id_usuario_2, @id_usuario_3, @id_usuario_4)
	END;*/

GO

/*CREATE PROCEDURE SP_TRAER_TB_P_Persona
	AS
	BEGIN
		SELECT * FROM TB_P_Persona
	END;*/


GO

--AGREGAR UN TECNCO 
/*CREATE PROCEDURE SP_INSERT_TB_PSE_Supervisor_Tecnico_Tienda(@id_tienda nvarchar(10), @clase int, @id_persona int )
	AS
	BEGIN
		INSERT INTO TB_PSE_Supervisor_Tecnico_Tienda(ID_Tienda, Clase, ID_Persona)
		VALUES(@id_tienda, @clase, @id_persona)
	END;*/
GO

/*CREATE PROCEDURE SP_TARER_TB_C_Clase
	AS
	BEGIN
		SELECT * FROM TB_C_Clase
	END;*/
GO

--Insert Compras
/*CREATE PROCEDURE SP_TB_PSC_Supervisor_Compas_Tienda(@id_tienda nvarchar(10), @id_tipo_clase int, @id_persona int)
	AS
	BEGIN
		INSERT INTO TB_PSC_Supervisor_Compas_Tienda(ID_Tienda, ID_Tipo_Clase, ID_Persona)
		VALUES(@id_tienda, @id_tipo_clase, @id_persona)
	END;*/

GO

/*CREATE PROCEDURE SP_TRAER_TB_C_Tipo_Clase
	AS
	BEGIN
		SELECT * FROM TB_C_Tipo_Clase
	END;*/

GO

/*CREATE PROCEDURE SP_TRAER_TB_P_Persona_Compra
    AS
	BEGIN
		SELECT * FROM TB_P_Persona WHERE ID_Persona = 83 OR ID_Persona= 40

	END;*/

GO

--ASIGNACION SUP
/*CREATE PROCEDURE SP_UPDATE_TB_PSE_Supervisor_Tecnico_Tienda(@id_persona int, @clase int, @id_tienda nvarchar(10))
	AS
	BEGIN
		UPDATE TB_PSE_Supervisor_Tecnico_Tienda SET ID_Persona = @id_persona
			WHERE Clase = @clase AND ID_Tienda = @id_tienda 
	END;*/

GO

EXEC SP_UPDATE_TB_PSE_Supervisor_Tecnico_Tienda 40, 8, 'zzzz'

GO

--CREACION DE VISTAS
/*CREATE VIEW VW_Supervisores_Tienda
	AS
	SELECT        a.ID_Tienda, c.Tienda, a.ID_Usuario_1, b.Nombre
	FROM            dbo.TB_PT_Tienda_Persona AS a INNER JOIN
                         dbo.TB_P_Persona AS b ON a.ID_Usuario_1 = b.ID_Persona INNER JOIN
                         dbo.TB_T_Tienda AS c ON a.ID_Tienda = c.ID_Tienda

SELECT * FROM VW_Supervisores_Tienda;
GO

CREATE VIEW VW_Tecnicos_Tienda
	AS
	SELECT        a.ID_Tienda, c.Tienda, a.ID_Persona, b.Nombre
	FROM            dbo.TB_PSE_Supervisor_Tecnico_Tienda AS a INNER JOIN
                         dbo.TB_P_Persona AS b ON a.ID_Persona = b.ID_Persona INNER JOIN
                         dbo.TB_T_Tienda AS c ON a.ID_Tienda = c.ID_Tienda

SELECT * FROM VW_Tecnicos_Tienda;*/
GO

/*CREATE VIEW VW_TB_PSE_Supervisor_Tecnico_Tienda
	AS
	SELECT        a.ID_Tienda, c.Tienda, a.ID_Persona, b.Nombre,cl.ID_Clase, cl.Clase
	FROM            dbo.TB_PSE_Supervisor_Tecnico_Tienda AS a INNER JOIN
                         dbo.TB_P_Persona AS b ON a.ID_Persona = b.ID_Persona INNER JOIN
                         dbo.TB_T_Tienda AS c ON a.ID_Tienda = c.ID_Tienda INNER JOIN
						 dbo.TB_C_Clase AS cl ON a.Clase = cl.ID_Clase*/
GO

