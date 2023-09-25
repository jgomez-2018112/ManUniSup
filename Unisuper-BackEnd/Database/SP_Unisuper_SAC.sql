USE [UNISUPER_GT]
GO

--Insert TBL_Unisuper_P_Persona
CREATE PROCEDURE SP_INSERT_TBL_Unisuper_P_Persona(@nombre nvarchar(30),@apellido nvarchar(30), @rol int, @estado int)
	AS
	BEGIN
		INSERT INTO TBL_Unisuper_P_Persona(Nombre, Apellido, rol, estado)
		VALUES(@nombre, @apellido, @rol, @estado)
	END;
GO

--INSERT TBL_Unisuper_P_Usuario
CREATE PROCEDURE SP_INSERT_TBL_Unisuper_P_Usuario(@id int, @usuario nvarchar(30), @password nvarchar(30))
	AS
	BEGIN
		INSERT INTO TBL_Unisuper_P_Usuario(Id, Usuario, Password)
		VALUES((select MAX(id) from TBL_Unisuper_P_Persona), @usuario, @password)
	END;

GO

--Traer Roles
CREATE PROCEDURE SP_TRAER_TBL_Unisuper_P_Rol
	AS
	BEGIN
		SELECT * FROM TBL_Unisuper_P_Rol
	END;
GO


--INSERT TBL_Unisuper_Tienda
CREATE PROCEDURE SP_INSERT_TBL_Unisuper_Tienda(@tienda nvarchar(100), @telefono nvarchar(200), @direccion nvarchar(200))
	AS
	BEGIN
		INSERT INTO TBL_Unisuper_Tienda(Tienda, Telefono, Direccion)
		VALUES(@tienda, @telefono, @direccion)
	END;
GO

--INSERT TBL_Unisuper_TiendasUnisuper
CREATE PROCEDURE SP_INSERT_TBL_Unisuper_TiendasUnisuper(@tienda nvarchar(300))
	AS
	BEGIN
		INSERT INTO TBL_Unisuper_TiendasUnisuper(Tienda)
		VALUES(@tienda)
	END;