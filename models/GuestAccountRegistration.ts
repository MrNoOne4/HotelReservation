class Guest {
    private fullName: string;
    private email: string;
    private password: string;

    constructor(fullName: string, email: string, password: string) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

    public setPassword(password: string) : void {
        this.password = password;
    }
}