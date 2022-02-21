import Post from "../../dtos/post"
import Comment from "../../dtos/comment"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, shallow } from "enzyme"
import CommentView from "./comment-view"

const testPost: Post = {psid: "test-post", pid: "test-profile", body: "Test Message", datePosted: new Date()}
const testComments: Comment[] = [
    {cid: "123", pid: "test-profile", psid: "test-post", message: "Test Comment 1", dateCreated: new Date()},
    {cid: "456", pid: "test-profile", psid: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    {cid: "789", pid: "test-profile", psid: "test-post", message: "Test Reply 1", dateCreated: new Date(), parentComment: "123"},
    {cid: "222", pid: "test-profile", psid: "test-post", message: "Test Reply 2", dateCreated: new Date(), parentComment: "123"}
]

//@ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(testComments),
    })
)

describe("Comment tests", ()=>{

    it("Should display comment", ()=>{

    })

    it("Should display reply", ()=>{

    })

    it("Should create new comment", ()=>{

    })

    it("Should create new reply", ()=>{

    })
})