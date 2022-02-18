export default interface Post {
    psid: string;
    pid: string;
    body: string;
    datePosted: Date;
    cids: string[];
    imgURL?: string;
}