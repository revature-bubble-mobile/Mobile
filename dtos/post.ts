export default interface Post {
    /**Unique ID of the Post */
    psid: string;
    /**ID string of a profile */
    pid: string;
    /**Text entered when creating the Post */
    body: string;
    datePosted: Date;
    imgURL?: string;
}