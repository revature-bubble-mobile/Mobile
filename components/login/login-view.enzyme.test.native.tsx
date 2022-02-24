import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { shallow } from "enzyme";
import LoginView from "./login-view";
import { Button } from "react-native-elements";
import axios from "axios";
import React from "react";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

const runAllPromises = () => new Promise((resolve) => setImmediate(resolve));
const spy2 = jest
  .spyOn(axios, "patch")
  .mockImplementation(() => Promise.resolve({ data: {} }));

describe("Test login form", () => {
  test("See if axios successfully called", async () => {
    const wrapper = shallow(<LoginView />);
    wrapper.find(Button).simulate("press");
    await runAllPromises();
    expect(spy2).toHaveBeenCalled();
  });

  test("See if AsyncStorage successfully called", async () => {
    const wrapper = shallow(<LoginView />);
    wrapper.find(Button).simulate("press");
    await runAllPromises();
    expect(mockAsyncStorage.setItem).toHaveBeenCalled();
  });

  test("Check Username text change", async () => {
    let username = "";
    const setUsername = jest.fn((value) => {
      username = value;
    });
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [username, setUsername]);
    const wrapper = shallow(<LoginView />);
    wrapper.find("TextInput").at(0).simulate("changeText", "mbuble");
    await runAllPromises();
    expect(username).toBe("mbuble");
  });

  test("Check Password text change", async () => {
    let passkey = "";
    const setPasskey = jest.fn((value) => {
      passkey = value;
    });
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => ["", jest.fn])
      .mockImplementationOnce(() => [passkey, setPasskey]);
    const wrapper = shallow(<LoginView />);
    wrapper.find("TextInput").at(1).simulate("changeText", "test");
    await runAllPromises();
    expect(passkey).toBe("test");
  });


});
