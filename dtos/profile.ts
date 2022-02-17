export default interface Profile {
    pid: number;
    firstName: string;
    lastName:string;
    passkey: string;
    email: string;
    username: string;
    imgurl?: string;
    verification?: boolean;
}