export class Post {
    constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.creatorName = data.creator.name
    this.creatorPicture = data.creator.picture
    this.createdAt = new Date()
    this.likes = data.likes.length
}
}

