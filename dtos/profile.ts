export default interface Profile {
    /**Profile ID string */
    pid: string;
    firstName: string;
    lastName: string;
    /**Hashed value obtained from an existing JWT */
    passkey: string;
    email: string;
    username: string;
    imgurl?: string;
    verification?: boolean;
    followers: string[];
    following: string[];
}