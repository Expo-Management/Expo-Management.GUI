import { JudgeCalification } from "./judge-calification"

export interface ProjectQualifications {
    projectId: string,
    projectName: string,
    projectDescription: string,
    projectQualifications: JudgeCalification[]
    members: string[],
    category: string | null,
    finalPunctuation: string | null
}
