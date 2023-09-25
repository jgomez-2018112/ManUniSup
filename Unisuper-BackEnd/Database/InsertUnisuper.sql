use DB_Herramienta_Unisuper
go

insert into TB_P_Persona
values (0, 'Jair Gomez', 'sacunisuper@gmail.com', 1)



insert into TB_P_Persona_Usuario
values ('jagomez', (select MAX(ID_persona) from TB_P_Persona))

insert into TB_P_Usuario
values ('jagomez', 'Unisuper*')

insert into TB_P_Login
values ('jagomez', 1)


use UNISUPER_GT
go


insert into TBL_Unisuper_P_Persona
values ('Jair','Gomez',2,1)

SELECT * FROM TBL_Unisuper_P_Persona;

insert into TBL_Unisuper_P_Usuario
values ((select MAX(id) from TBL_Unisuper_P_Persona),'jagomez', 'Unisuper*')
