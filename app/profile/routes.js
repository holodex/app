const h = require('vdux/element').default

const ProfileList = require('./components/profileList')

const Profile = require('./components/profile')

const NewProfile = require('./components/newProfile')

const { getIndexProps,  } = require('./getters')
const { getHighlights } = require('../highlights/getters')


const { map } = require('lodash')

module.exports = routes

function routes (route) {
  return route('/profiles',[ 
            route('/', (params, state) => {
              const props = getIndexProps(state)
              
              return h(ProfileList, {}, map(props.profiles, (profile, profileKey) => {
                let highlights = getHighlights(props.highlights, profile)
                return h(Profile, { profile, highlights },[])
              }))
            }),
            //TODO /:id
            route('/new', (params, state) => {
              const props = getIndexProps(state)
                return h(NewProfile, { props }, [])
            })
    ])
}
