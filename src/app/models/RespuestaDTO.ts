


export interface IRespuestaDTO<T> {
	code: string;
	codeValue: number;
	mensaje: string;
	t: T;

}


export class RespuestaMensaje {


}

export interface IMensajeRespuesta {

	mostrarMensaje<T>( codigo: IRespuestaDTO<T> ): string;
}

export class MensajeFactory  {

	public static obtenereMensaje(codigo: number ): IMensajeRespuesta {

		if( codigo === null)
		{
			return null as any
		}else
		if (codigo === 200 ) {
			return new MensajeSuccess();
		}else
		if (codigo === 404 ) {
			return new MensajeError();
		}else
		if (codigo === 500 ) {
			return new MensajeConflicto();
		}
		return null as any
	
		
	}
}



export class MensajeSuccess<T> implements IMensajeRespuesta  {
	constructor( ){}

	mostrarMensaje<T>(codigo: IRespuestaDTO<T>): string {
		return codigo.mensaje;
	}

}

export class MensajeError<T> implements IMensajeRespuesta  {

	mostrarMensaje<T>(codigo: IRespuestaDTO<T>): string {
		return codigo.mensaje;
	}

}
export class MensajeConflicto<T> implements IMensajeRespuesta  {
	constructor(  ){}
	mostrarMensaje<T>(codigo: IRespuestaDTO<T>): string {
		return codigo.mensaje;
	}

}