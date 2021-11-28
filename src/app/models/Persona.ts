


export interface IPersona {
    id:                   number;
    nombrePersona:        string;
    apeidoPaternoPersona: string;
    apeidoMaternoPersona: string;
    generoPersona:        string;
    direccion:            IDireccion[];
}

export interface IDireccion {
    id:                    number;
    estadoDireccion:       string;
    calleDireccion:        string;
    coloniaDireccion:      string;
    codigoPostalDireccion: string;
}

