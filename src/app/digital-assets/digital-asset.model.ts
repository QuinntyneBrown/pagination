export class DigitalAsset { 
    public id: number;
    public name: string;
    public fileName: string;
    public description: string;
    public created: Date;
    public fileModified: Date;
    public size: number;
    public contentType: string;
    public relativePath: string;  
    public uniqueId: string;
    public isDeleted: boolean;
}
