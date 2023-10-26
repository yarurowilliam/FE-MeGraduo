import { Comentario } from "./comentario";

export class ProyectoGrado {
    id?: number;
    idModalidad: number;
    titulo: string;
    idIntegrante1: number;
    emailIntegrante1: string;
    estadoIntegrante1: string;
    idIntegrante2?: number;
    emailIntegrante2?: string;
    estadoIntegrante2?: string;
    idIntegrante3?: number;
    emailIntegrante3?: string;
    estadoIntegrante3?: string;
    fechaCreacion: Date;
    lineaInvestigacion: string;
    subLineaInvestigacion: string;
    areaTematica: string;
    grupoInvestigacion: string;
    planteamientoProblema: string;
    justificacion: string;
    objetivoGeneral: string;
    objetivosEspecificos: string;
    bibliografia: string;
    idDirector?: number;
    emailDirector?: string;
    estadoDirector: string;
    idJurado?: number;
    idJurado2?: number;
    idAsesor?: number;
    esAceptadaPropuesta?: boolean;
    tipoFase: string;
    estadoProyecto: string;
    calificacion?: number;
    fechaPresentacionAnteProyecto?: Date;
    fechaPresentacionProyecto?: Date;
    fechaSustentacion?: Date;
    comentarios?: Comentario[];
}



