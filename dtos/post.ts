export default interface Post {
    psid: number;
    pid: number;
    body: string;
    datePosted: Date;
    imgURL?: string;
}