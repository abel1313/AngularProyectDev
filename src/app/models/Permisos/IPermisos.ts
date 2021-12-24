import { IPermisos, IUsuarioRespuesta } from "..";





export class Permisos {

    public static mapPermisos(permiso: Array<IPermisos>): Array<number> {
        let per: Array<number> = permiso.map((m) => {
            let permiso: number = (m.vista !== undefined && m.vista !== null) ? m.vista.id as any : 0;
            return permiso;
        });
        return per;
    }

    public static localStorageSession(permiso: Storage ): Array<number> {

        let permisosMostrar: Array<number> = []
        if( permiso !== null )
        {
            let session: Array<IUsuarioRespuesta> = JSON.parse(permiso as any);
            permisosMostrar  = Permisos.mapPermisos(session[0].permisos as any);
            permisosMostrar;
        } else
        {
            permisosMostrar = [];
        }

        return permisosMostrar;
    }
    public static userNav(permiso: Storage ): string {

        let permisosMostrar: string = '';
        if( permiso !== null)
        {
            let session: Array<IUsuarioRespuesta> = JSON.parse(permiso as any);
            permisosMostrar = session[0].nombreUsuario;
        }
      
        return permisosMostrar;
    }

    public static tipoUsuario( tipo: Array<number> ): string {


        if( tipo.length > 0)
        {
 
            if( tipo.includes(1) && tipo.includes(2) && 
            tipo.includes(3) && tipo.includes(4) && 
            tipo.includes(5) && tipo.includes(6) )
            {
                return 'admin';
            }
            if( tipo.includes(4) )
            {
                return 'usuario';
            }
        }

        return '';
    }

    private permisoUsuario()
    {

    }



}