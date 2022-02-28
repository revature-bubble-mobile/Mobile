import { mount } from 'enzyme';
import { Pressable } from 'react-native';
import DrawerHeader from './drawer-header';
import * as reactRedux from 'react-redux';

const runAllPromises = ()=>(new Promise(setImmediate));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
        navigate: mockedNavigate,
        }),
    };
});

describe("Testing the Drawer Header Component",()=>{

    jest.spyOn(reactRedux, 'useSelector').mockImplementation(jest.fn(()=>(
        {profile:{firstName:"",lastName:""}}
    )));

    it("Should navigate to the profile view", async ()=>{
        const wrapper = mount(<DrawerHeader/>);
        await runAllPromises();
        const pressable = wrapper.find(Pressable).first();
        const onPress = pressable.prop("onPress");
        //@ts-ignore
        onPress();
        expect(mockedNavigate).toHaveBeenCalledWith('Profile');
    });
});