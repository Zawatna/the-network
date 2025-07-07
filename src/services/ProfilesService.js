import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js";
import { Profile } from "@/models/Profile.js";

class ProfilesService{
  async  getProfileById(profileId) {
const response = await api.get(`api/profiles/${profileId}`)  
logger.log('😎', response.data);
AppState.activeProfile = new Profile(response.data)
 }

//     async getProfileById(){
//         const profile = await api.get('account/')
//     }
}

export const profilesService = new ProfilesService()