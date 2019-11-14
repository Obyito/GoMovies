<template>

  <v-container v-if="loading">
    <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="blue">
        </v-progress-circular>
      </div>
  </v-container>

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-2 ml-2>
        <v-card>
          <v-img :src="singleMovie.Poster" aspect-ratio="4"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h1 class="headline mb-0">{{singleMovie.Title}}-{{singleMovie.Year}}</h1>
              <p>{{ singleMovie.Plot}} </p>
              <p>Genre: {{singleMovie.Genre}}</p>
              <h3>Les acteurs 🎭: </h3>{{singleMovie.Actors}}
              <h3>Les récompenses 🏆: </h3>{{singleMovie.Awards}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="blue" @click="back">Retour</v-btn>
            <v-dialog v-model="dialog" width="600">
          <v-btn slot="activator" color="blue" ml-2 dark>Voir les notes</v-btn>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Les notes de la presse</v-card-title>
            <v-card-text>
              <table style="width:100%" border="1" >
                <tr>
                  <th>Source</th>
                  <th>La note</th>
                </tr>
                <tr v-for="(rating,index) in this.ratings" :key="index">
                  <td align="center">{{ratings[index].Source}}</td>
                  <td align="center"><v-rating :half-increments="true" :value="ratings[index].Value"></v-rating></td>
                </tr>
              </table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialog = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center">
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.wrap{
  padding-top:1.5em;
}
</style>

<script>
import movieApi from '@/services/MovieApi'
export default {
  props: ['id'],

  data () {
    return {
      singleMovie: '',
      dialog: false,
      loading: true,
      ratings: ''
    }
  },

  mounted () {
    movieApi.fetchSingleMovie(this.id)
      .then(response => {
        this.singleMovie = response
        this.ratings = this.singleMovie.Ratings
        this.ratings.forEach(function (element) {
          element.Value = parseFloat(element.Value.split(/\/|%/)[0])
          element.Value = element.Value <= 10 ? element.Value / 2 : element.Value / 20
        }
        )
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
