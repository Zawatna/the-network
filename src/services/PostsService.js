import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"

class PostsService {

    async getPosts() {
        const response = await api.get('api/posts')
        console.log('🔍📃 get posts from api', response.data)
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = posts

    }
}

export const postsService = new PostsService()

