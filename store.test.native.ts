import { actions, store, User } from "./store"

describe("Testing redux store", () => {

    it("should utilize initial parameters", () => {
        const initialState: User = {
            profile: {
                pid: "",
                firstName: "",
                lastName: "",
                passkey: "",
                email: "",
                username: "",
                following: [],
                followers: []
            }
        }
        const user = store.getState();
        expect(user).toEqual(initialState);
    });

    it("should update the user", () => {
        const state: User = {
            profile: {
                pid: "123",
                firstName: "asdf",
                lastName: "hjkjk",
                passkey: "fdsawrt",
                email: "arewrwq",
                username: "asdff",
                following: [],
                followers: [],
                verification: true
            }
        }
        const action = actions.setUser(state.profile);
        store.dispatch(action);
        const update = store.getState();
        expect(update).toEqual(state);
    })
})