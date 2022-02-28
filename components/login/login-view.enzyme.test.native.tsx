import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { mount, shallow } from "enzyme";
import LoginView from "./login-view";
import { Button } from "react-native-elements";
import axios from "axios";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

const runAllPromises = () => new Promise((resolve) => setImmediate(resolve));
const spy2 = jest
  .spyOn(axios, "patch")
  .mockImplementation(() => Promise.resolve({ data: {username: "username" , passkey: "passkey"} }));

describe("Test login form", () => {
  test("See if axios successfully called", async () => {
    const wrapper = mount(<Provider store={store}><LoginView setVerification={jest.fn()}/></Provider>);
    //@ts-ignore
    wrapper.find(Button).prop("onPress")();
    await runAllPromises();
    expect(spy2).toHaveBeenCalled();
  });

  test("See if AsyncStorage successfully called", async () => {
    const wrapper = mount(<Provider store={store}><LoginView setVerification={jest.fn()}/></Provider>);
    //@ts-ignore
    wrapper.find(Button).prop("onPress")();
    await runAllPromises();
    expect(mockAsyncStorage.setItem).toHaveBeenCalled();
  });

  test("setVerication function called properly", async () => {
    const setVerification = jest.fn();
    const wrapper = mount(<Provider store={store}><LoginView setVerification={setVerification}/></Provider>);
    //@ts-ignore
    wrapper.find(Button).prop("onPress")();
    await runAllPromises();
    expect(setVerification).toHaveBeenCalled();

  });

});
