import { Projects } from "./projects";

export interface Recommendation {
    id: number;
    project: Projects;
    user: Object;
    recomendacion: string
}
