export interface ProjectQualifications {
    projectId: string,
    projectName: string,
    projectDescription: string,
    judgeName: string,
    punctuation: string
    members: string[],
    category: string | null,
    finalPunctuation: string | null
}
