export class User {
    private username:string;
    private birthDate:Date;
    private email:string;
    private password:string;

    constructor(email:string, password:string, username:string, birthDate:Date) {
        this.username = username;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
    }
}
