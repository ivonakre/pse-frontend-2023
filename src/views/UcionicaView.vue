<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="ucionica" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiUcionica(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
    <v-text-field v-model="forma.vrsta" placeholder="Vrsta"></v-text-field>
    <v-btn @click="dodajUcionica">Dodaj učionica</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'UcionicaView',
  data () {
    return {
      ucionica: [],
      ucitavam: false,
      forma: {
        naziv: '',
        vrsta: ''
      },
      stupci: [
        {text: 'Naziv', value: 'naziv'},
        {text: 'Vrsta', value: 'vrsta'},
        {text: 'Akcije', value: 'akcije'}
      ],
      snackbar: {
        model: false,
        color: '',
        text: ''
      },
    }
  },
  created() {
    this.dohvatiUcionica();
  },
  methods: {
    dohvatiUcionica: function () {
      this.ucitavam = true;

      this.axios.get('http://localhost:8000/api/ucionica/dohvati').then((response) => {
        this.ucionica = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu ucionice.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dodajUcionica: function () {
      this.axios.post('http://localhost:8000/api/ucionica/dodaj', this.forma).then(() => {
        this.dohvatiUcionica()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodana ucionica.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju ucionice.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
    izbrisiUcionica: function (id) {
      this.axios.get('http://localhost:8000/api/ucionica/izbrisi/' + id).then(() => {
        this.dohvatiUcionica();

        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisana ucionica.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju ucionice.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
  },
}
</script>