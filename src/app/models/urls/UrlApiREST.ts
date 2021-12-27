
export enum UrlApiREST {
    GUARDAR_CLIENTE = 'clientes/guardarCliente',
    EDITAR_CLIENTE = 'clientes',
    ELIMINAR_CLIENTE = 'clientes/eliminarCliente',
    OBTENER_CLIENTE_ID = 'clientes/buscarId',
    OBTENER_CLIENTES = 'clientes/obtenerClientes',
    
    OBTENER_DATOS_CLIENTES = 'clienteUsuario/obtenerMisDatos',



    ACCEDER_SISTEMA = "usuarios/iniciarSesion",

    OBTENER_USUARIOS = 'usuarios/obtenerUsuario',

    REGISTRAR_USUARIO_PERMISOS = "usuarios/registrarUsuario",
    ELIMINAR_USUARIO = "usuarios",

    OBTENER_VISTAS = "vistas/obtenerVistas",


    // Producto
    OBTENER_PRODUCTOS = 'productos',
    // Producto

    // Peidos


    OBTENER_PEDIDO = 'pedidos/obtenerPedidos',

    // Pedidos

    // Pedidos vENTA
    OBTENER_PEDIDO_VENTA = 'pedidosVenta',
    // Pedidos vENTA

    // Pedidos vENTA
    OBTENER_CLIENTE_USUARIO = 'clienteUsuario/obtenerClienteUsuario',
    // Pedidos vENTA


    //  vENTA
    VENTA_DETALLE_GUARDAR = 'ventas/realizarVenta',
    //  vENTA


    //  Pedido
    PEDIDO_DETALLE_GUARDAR = 'pedidosVenta/realizarPedido',
    //  Pedido

}