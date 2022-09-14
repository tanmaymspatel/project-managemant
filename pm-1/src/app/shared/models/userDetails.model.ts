export class UserDetails {
    public id?: number;
    public name: string;
    public lastName: string;
    public email: string;
    public password: string;
    public profilePicture: string;
    public projectId: number[];

    constructor(
        id: number,
        name: string,
        lastName: string,
        email: string,
        password: string,
        profilePicture: string,
        projectId: number[]
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName,
            this.email = email,
            this.password = password,
            this.profilePicture = profilePicture,
            this.projectId = projectId
    }
}