export class ProjectInfo {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public technologiesUsed: string[],
        public role: string,
        public links: string[],
        public image: string
    ) {}

    get imageUrl(): string {
        return this.image;
    }

    // Define interface for the JSON structure
    static fromJSON(json: ProjectInfoJSON): ProjectInfo {
        return new ProjectInfo(
            json.id,
            json.title,
            json.description,
            JSON.parse(json.technologiesUsed),
            json.role,
            JSON.parse(json.links),
            json.image
        );
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            technologiesUsed: JSON.stringify(this.technologiesUsed),
            role: this.role,
            links: JSON.stringify(this.links),
            image: this.image
        };
    }
}

// Interface for the JSON structure coming from the database
interface ProjectInfoJSON {
    id: number;
    title: string;
    description: string;
    technologiesUsed: string; // JSON string of string[]
    role: string;
    links: string; // JSON string of string[]
    image: string;
}
