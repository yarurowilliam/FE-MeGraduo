// models/upload-data.model.ts
export class ProyectoGrado {
  id?: number;
  idModalidad?: number;
  idIntegrante1?: number;
  idIntegrante2?: number;
  idIntegrante3?: number;
  titulo?: string;
  fechaCreacion?: string;
  lineaInvestigacion?: string;
  subLineaInvestigacion?: string;
  areaTematica?: string;
  grupoInvestigacion?: string;
  planteamientoProblema?: string;
  justificacion?: string;
  objetivoGeneral?: string;
  objetivosEspecificos?: string;
  bibliografia?: string;
  idDirector?: number;
  idCalificador?: number;
  esAceptadaPropuesta?: true;
  tipoFase?: string;
  estadoProyecto?: string;
  calificacion?: number;
  file?: string;
  comentarios?: [
    {
      id?: number;
      descripcion?: string,
      fechaComentario?: string,
      idPersona?: string
    }
  ]
  }