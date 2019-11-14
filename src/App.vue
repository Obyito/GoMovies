<template>
  <v-app>
    <v-toolbar dark app>
      <v-flex mt-1 xs3>
        <router-link to='/' tag='span'>
        <img src="../src/assets/gomovieslogo.png" width="40%" height="60%" cursor="pointe">
        </router-link>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs8 sm6 md6>
        <v-text-field label='Votre recherche' v-model='searchString'>
        </v-text-field>
        </v-flex>
        <v-flex xs4>
      <v-btn outline :disabled="!dataAvailable" @click="searchMovie">
       <span>Go !</span>
      </v-btn>
        </v-flex>
    </v-toolbar>
    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      this.searchString = ''
    }
  },
  computed: {
    dataAvailable () {
      return this.searchString !== null && this.searchString !== ''
    }
  }
}
</script>
