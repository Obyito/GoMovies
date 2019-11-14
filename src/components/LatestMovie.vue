<template>

  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="blue">
      </v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <div style="margin-top:1.5em;" class="text-xs-left">
    <h1><b>Recherchez de l'info</b> sur des films &amp; séries sans limites !</h1>
    <h2>Mes bookmarks :</h2>
    </div>
    <v-layout wrap>
      <v-flex xs12 v-for="(item, index) in wholeResponse" :key="index" mb-2>
        <v-card shaped>
          <v-img :src="item.Poster" aspect-ratio="1"></v-img>

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
            <v-btn icon><v-icon>bookmark</v-icon></v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<style>
.grid-list-xl {
  padding-top:1.1em;
}
</style>

<script>
import movieApi from '@/services/MovieApi'

export default {
  data () {
    return {
      wholeResponse: [],
      loading: true
    }
  },
  mounted () {
    movieApi.fetchMovieCollection('Harry Potter')
      .then(response => {
        this.wholeResponse = response.Search
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
