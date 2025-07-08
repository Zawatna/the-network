export class Account {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * @property {String} bio
   * @property {String} coverImg
   * @property {String} github
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
    this.gitHub = data.github
    this.linkedIn = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    // TODO add additional properties if needed
  }
}
