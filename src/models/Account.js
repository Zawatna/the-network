export class Account {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * @property {String} bio
   * @property {String} coverImg
   * @property {String} gitHub
   * @property {String} linkedin
   * @property {String} resume
   * @property {String} class
   * @property {Boolean} graduated
   
   * @param {AccountData} data
   */
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.gitHub = data.gitHub
    this.linkedIn = data.linkedin
    this.resume = data.resume
    this.class = data.class 
    // TODO add additional properties if needed
  }
}
