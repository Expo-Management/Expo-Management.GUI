import { Files } from "./files";
import { Projects } from "./projects";

export interface MembersEmails {
    userId: number;
    name: string;
    email: string;
    project: Projects;
}
