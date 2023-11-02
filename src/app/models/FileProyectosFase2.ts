export interface InformacionProyectoGradoFase2 {
    id: number;
    idProyectoGrado: number;
    fileName: string;
    data: any; // En TypeScript, puedes usar 'Uint8Array' para datos binarios o 'any' si no estás seguro del tipo.
    fechaCreacion: Date;
    estado: string;
}
