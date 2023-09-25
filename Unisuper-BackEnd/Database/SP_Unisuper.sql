USE DB_Herramienta_Unisuper_20230706
GO



CREATE PROCEDURE SP_INSERT_TB_T_Tienda(@id_tienda nvarchar(10), @tienda nvarchar(100), @id_tipo_tienda int)
	as
	begin
		INSERT INTO TB_T_Tienda(ID_Tienda, Tienda, ID_Tipo_Tienda)
		VALUES (@id_tienda, @tienda, @id_tipo_tienda);
	end;



exec SP_INSERT_TB_T_Tienda 'PPPP', 'DISTRITO MIRAFLORES', 4

SELECT * FROM TB_T_Tienda; 
