

import { IBase } from "./IBase";
import { IDireccion } from "./IDireccion";

export interface IPersona extends IBase
{
	nombrePersona: string;
	apeidoPaternoPersona: string;
	apeidoMaternoPersona: string;
	generoPersona: string;
	fechaNacimiento: string;
	direccion: IDireccion;
 
}
