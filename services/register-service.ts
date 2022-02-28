import axios from "axios";
import Profile from "../dtos/profile";

class RegisterService {

    private URI: string;
    constructor (){
        this.URI = "https://wk-revature-bubble-mobile.azurewebsites.net/api"
    }

    registerProfile(profile: Profile): Promise<Profile> {
        return axios
            .post(this.URI + `/profile`, profile)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

}

const registerService = new RegisterService();
export default registerService;