import { Vladdy } from "@/models/Vladdy.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class VladdiesService {

    async getVladdies() {
        const response =  await api.get('api/ads')
        console.log('get vladdies from api 🔍🃏', response.data)
        const vladdies = response.data.map(pojo => new Vladdy(pojo))
        AppState.vladdies = vladdies
    }
}

export  const vladdiesService = new VladdiesService()