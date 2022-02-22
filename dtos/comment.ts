export default interface Comment {
    /**Comment ID string */
    cid: string;
    /**ID string of a profile */
    writer: string;
    /**ID string of a post */
    post: string;
    /**Text entered when creating the Comment */
    message: string;
    dateCreated: Date;
    parentComment?: string;
}