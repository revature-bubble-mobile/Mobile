export default interface Comment {
    cid: string;
    pid: string;
    psid: string;
    message: string;
    dateCreated: Date;
    parentcid?: number;
}