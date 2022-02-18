export default interface Profile {
    pid: string;
    firstName: string;
    lastName:string;
    passkey: string;
    email: string;
    username: string;
    following: string[];
    followers: string[];
    imgurl?: string;
    verification?: boolean;
}