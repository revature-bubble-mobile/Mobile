export default interface Comment {
    /**Comment ID string */
    cid: string;
    /**ID string of a profile */
    pid: string;
    /**ID string of a post */
    psid: string;
    /**Text entered when creating the Comment */
    message: string;
    dateCreated: Date;
    parentComment?: string;
}