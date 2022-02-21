export default interface Profile {
    /**Profile ID number */
    pid: number;
    firstName: string;
    lastName: string;
    /**Hashed value obtained from an existing JWT */
    passkey: string;
    email: string;
    username: string;
    imgurl?: string;
    verification?: boolean;
}