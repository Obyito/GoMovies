<template>

  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="blue">
      </v-progress-circular>
    </div>
  </v-container>

  <v-container v-else-if="noData">
    <div class="text-xs-center">
    <h2>Pas de films connus sous "{{this.name}}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <div style="margin-top:2em;" class="text-xs-left">
    <h2>Résultats de votre recherche pour "{{this.name}}" :</h2>
    </div>
    <v-layout wrap>
      <v-flex xs12 v-for="(item, index) in movieResponse" :key="index" mb-2>
        <v-card shaped>
          <v-img :src="item.Poster" aspect-ratio="1">
          </v-img>
          
          <v-card-title primary-title>
            <div>
              <h2>{{item.Title}}</h2>
              <div>Sortie officielle: {{item.Year}}</div>
              <div>Genre: {{item.Type}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat color="blue" @click="singleMovie(item.imdbID)">En savoir plus</v-btn>
              <v-spacer></v-spacer>
            <v-btn icon><v-icon>bookmark_border</v-icon></v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<style>
.grid-list-xl {
  padding-top:1.2em;
}
</style>

<script>
import movieApi from '@/services/MovieApi'

export default {
  props: ['name'],
  data () {
    return {
      movieResponse: [],
      loading: true,
      noData: false
    }
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    },

    fetchResult (value) {
      movieApi.fetchMovieCollection(value)
        .then(response => {
          if (response.Response === 'True') {
            this.movieResponse = response.Search
            this.loading = false
            this.noData = false
          } else {
            this.noData = true
            this.loading = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.fetchResult(this.name)
  },
  watch: {
    name (value) {
      this.fetchResult(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
