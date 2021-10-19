
import Swal, { SweetAlertIcon } from 'sweetalert2'



export class Mensaje
{
    public static mensaje( titulo: string, text: string, icon: SweetAlertIcon, boton: string)
    {
        Swal.fire({
            title: titulo,
            text: text,
            icon: icon,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: boton
          })
    }
}
