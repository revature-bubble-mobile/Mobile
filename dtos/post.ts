export default interface Post {
    /**Unique ID of the Post */
    psid: number;
    /**ID number of a profile */
    pid: number;
    /**Text entered when creating the Post */
    body: string;
    datePosted: Date;
    imgURL?: string;
}