import { Origin } from "./origin";

export interface Offer {
    uniqId: string;
    title: string,
    createdAt: string,
    companyName: string;
    salaryRange: {
        from: number;
        to: number;
    };
    url: string;
    requiredSkills: string[];
    seniority: string[];
    origin: Origin;
}