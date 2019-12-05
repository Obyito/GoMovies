<template>
  <v-app>
    <v-toolbar dark app>
      <v-flex mt-1 xs3>
        <router-link to='/' tag='span'>
        <img src="../src/assets/gomovieslogo.png" width="70%" height="90%" cursor="pointe">
        </router-link>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs8 sm6 md6>
        <v-text-field label='Votre recherche' v-model="searchString">
        </v-text-field>
        </v-flex>
        <v-flex>
          <v-menu
  offset-y
  content-class="dropdown-menu"
  transition="slide-y-transition">
  <v-btn
  slot="activator"
    color="primary"
  >
    Filtres
  </v-btn>
  <v-card>
    <v-list dense>
      <v-list-tile
        v-for="filtres in filtres"
        :key="filtres"
      >
        <v-list-tile-title
          v-text="filtres"
        />
      </v-list-tile>
    </v-list>
      </v-card>
        </v-menu>
        </v-flex>
        <v-flex xs4>
      <v-btn outline :disabled="!dataAvailable" v-model="searchButton" @click="searchMovie">
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
      searchString: '',
      filtres: [
        'Film',
        'Série',
        'Populaire',
        'Récent',
      ]
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
