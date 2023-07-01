<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
            class="mr-10"
            size="70"
        >
        <v-img src="https://cdn.shopify.com/s/files/1/0080/8372/products/tattly_kelsey-oseid_blue-butterfly_00_be350f21-cf28-4ee5-9190-4bbcaaf2a574_1024x1024@2x.png?v=1659363773"></v-img>
        </v-avatar>
        
        

        <v-btn
            v-for="link in links"
            :key="link.route"
            :to="link.route"
            text
        >
          {{ link.text }}
        </v-btn>

        <v-spacer></v-spacer>

        
      </v-container>
    </v-app-bar>

    <v-main class="blue lighten-3">
      <v-container>
        <v-row>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="pa-5"
            >

              <router-view/>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      {route: '/', text: 'Početna'},
      {route: '/ucionica', text: 'Učionica'},
      {route: '/terminipredavanja', text: 'Termini Predavanja'},
      {route: '/predmeti', text: 'Predmeti'},
      {route: '/profesori', text: 'Profesori'},
    ],
  }),
}
</script>