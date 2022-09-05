export class UserDetails{
    public id : string; 
    public name : string; 
    public lastName : string; 
    public email : string; 
    public password : string; 
    public profilePicture : string; 

    constructor(
        id: string,
        name: string,
        lastName: string,
        email: string,
        password: string,
        profilePicture: string,
    ){
        this.id = id;
        this.name = name;
        this.lastName = lastName,
        this.email = email,
        this.password = password,
        this.profilePicture = profilePicture
    }
}