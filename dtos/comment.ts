export default interface Comment {
    cid: number;
    pid: number;
    psid: number;
    message: string;
    dateCreated: Date;
    parentComment?: number;
}