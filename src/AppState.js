import { reactive } from 'vue'
import { Profile } from './models/Profile.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  currentPage: 1,
  totalPages: 1,

  currentSearch: null,


  // page: `1 of 20`,
  // newer: null,
  // older: 'https://sandbox.codeworksacademy.com/api/posts?page=1' : null,
  // posts: [post], // limit 10


  /** @type {Profile} */
  activeProfile: null,

  // /** @type {Post} */
  // activePost: null,

  /** @type {import('./models/Vladdy.js').Vladdy[]} */
  vladdies: [],
  /** @type {import('./models/Profile.js').Profile[]} */
  profile: null

})

