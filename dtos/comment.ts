export default interface Comment {
    /**Comment ID number */
    cid: number;
    /**ID number of a profile */
    pid: number;
    /**ID number of a post */
    psid: number;
    /**Text entered when creating the Comment */
    message: string;
    dateCreated: Date;
    parentComment?: number;
}