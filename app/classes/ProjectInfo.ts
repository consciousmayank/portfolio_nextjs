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

    // Safely parse JSON or return the value if it's already an array
    private static parseJsonOrArray(value: unknown): string[] {
        // If it's already an array, return it
        if (Array.isArray(value)) return value;
        
        // If it's a string, try to parse it
        if (typeof value === 'string') {
            try {
                // Handle nested JSON strings like "["Flutter","Android Native","iOS"]"
                let parsed = value;
                
                // Try to parse up to twice for nested JSON strings
                for (let i = 0; i < 2; i++) {
                    if (typeof parsed === 'string') {
                        try {
                            const attempt = JSON.parse(parsed);
                            parsed = attempt;
                        } catch {
                            // If parsing fails, break the loop
                            break;
                        }
                    }
                }
                
                // Return the parsed array or empty array if not an array
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                // Error parsing JSON, return empty array
                return [];
            }
        }
        
        return [];
    }

    // Define interface for the JSON structure from the database
    static fromJSON(json: Record<string, unknown>): ProjectInfo {
        console.log(json);
        
        // Handle both string and array formats
        const technologies = this.parseJsonOrArray(json.technologiesUsed);
        const links = this.parseJsonOrArray(json.links);
        
        return new ProjectInfo(
            Number(json.id) || 0,
            String(json.title) || '',
            String(json.description) || '',
            technologies,
            String(json.role) || '',
            links,
            String(json.image) || ''
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

// We're using 'any' type for the fromJSON parameter 
// since we need to handle different data structures from Prisma
