export class Role {
    roleId?: number;
    role: string; 
    description: string;
    status: string;

    constructor(roleId: number, role: string, description: string, status: string) {
        this.roleId = roleId;
        this.role =  role;
        this.description = description;
        this.status = status;
    }

}
