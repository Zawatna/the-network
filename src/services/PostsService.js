import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { logger } from "@/utils/Logger.js"

class PostsService {
    async likePost(postId) {
        const response = await api.post(`/api/posts/${postId}/like`)
        logger.log('updated likes ✏️👍', response.data)
        const posts = AppState.posts
        //   NOTE once you like it, use the response.data which is the updated on
        // find the old one and replace it with the new one/ REF any PUT
        const postIndex = posts.findIndex(post => post.id == postId)

    }


    async deletePost(postId) {
        const response = await api.delete(`/api/posts/${postId}`)
        logger.log('deleted post 💥📃', response.data)
        const posts = AppState.posts
        const postIndex = posts.findIndex(post => post.id == postId)
        posts.splice(postIndex, 1)
    }
    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('🔍📃 get posts from api', response.data)
        this.handleResponse(response.data)
    }
    async changePostsPage(pageNumber) {
        const response = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('📃🔢', response.data);
        this.handleResponse(response.data)
    }
    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('created a post 🔨📃', response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
    }
    async changeProfilePage(userId, pageNumber) {
        const response = await api.get(`/api/profiles/${userId}/posts?page=${pageNumber}`)
        logger.log('📃🃏✏️🔢 page turn profile posts', response.data)
        this.handleResponse(response.data)
    }

    async getPostsByUserId(userId) {
        const response = await api.get(`api/profiles/${userId}/posts`)
        logger.log('🔍📃 get posts from api', response.data)
        this.handleResponse(response.data)
    }

    async searchPosts(editableSearchTerm) {
        AppState.currentSearch = editableSearchTerm
        const response = await api.get(`/api/posts?query=${editableSearchTerm}`)
        logger.log('🔍🔍📃', response.data);
        // const posts = responseData.posts.map(pojo => new Post(pojo))
        // AppState.posts = posts
        // AppState.currentPage = responseData.page
        // AppState.totalPages = responseData.totalPages  
        this.handleResponse(response.data)
    }

    async changeSearchPage(pageNumber, editableSearchTerm) {
        const response = await api.get(`/api/posts?page=${pageNumber}&query=${editableSearchTerm}`)
        logger.log('🔍🔍📃🔢', response.data);
        // this works up to here. page number does not change when newer and older button clicked.
        this.handleResponse(response.data)

    }

    handleResponse(responseData) {
        const posts = responseData.posts.map(pojo => new Post(pojo))
        AppState.posts = posts
        AppState.currentPage = responseData.page
        AppState.totalPages = responseData.totalPages
    }

    // async getPostById(postId){
    //     const response = await api.get(`api/posts/${postId}`)
    //     logger.log('🔍🪪 geting post by id', response.data)
    //     // const postsById = response.data.map{pojo => new Post(pojo)}
    //     AppState.activePost = new Post(response.data) 
    // }
}

export const postsService = new PostsService()
