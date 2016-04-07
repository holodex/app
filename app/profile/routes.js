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
              return h(ProfileList, {}, map(props.profilesWithData, (profile, profileKey) => {
                return h(Profile, { profile },[])
              }))
            }),
            //TODO /:id
            route('/new', (params, state) => {
              const props = getIndexProps(state)
                return h(NewProfile, { props }, [])
            })
    ])
}
