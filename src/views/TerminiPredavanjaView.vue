<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="terminipredavanja" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiTerminiPredavanja(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.satnica" placeholder="Satnica"></v-text-field>
    <v-autocomplete :items="ucionica" item-text="naziv" item-value="id" v-model="forma.ucionica_id" placeholder="Ucionica"></v-autocomplete>
    <v-autocomplete :items="predmeti" item-text="naziv" item-value="id" v-model="forma.predmet_id" placeholder="Predmeti"></v-autocomplete>
    <v-btn @click="dodajTerminiPredavanja">Dodaj termine predavanja</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'TerminiPredavanjaView',
  data () {
    return {
      terminipredavanja: [],
      ucionica: [],
      predmeti: [],
      ucitavam: false,
      forma: {
        satnica: '',
        ucionica_id: '',
        predmet_id: '',
      },
      stupci: [
        {text: 'Satnica', value: 'satnica'},
        {text: 'Ucionica', value: 'ucionica.naziv'},
        {text: 'Predmeti', value: 'predmeti.naziv'},
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
    this.dohvatiTerminiPredavanja();
    this.dohvatiUcionica();
    this.dohvatiPredmeti();
  },
  methods: {
    dohvatiTerminiPredavanja: function () {
      this.ucitavam = true;
      this.axios.get('http://localhost:8000/api/terminipredavanja/dohvati').then((response) => {
        this.terminipredavanja = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu termina predavanja.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dohvatiUcionica: function () {
      this.axios.get('http://localhost:8000/api/ucionica/dohvati').then((response) => {
        this.ucionica = response.data;
      })
    },
    dohvatiPredmeti: function () {
      this.axios.get('http://localhost:8000/api/predmeti/dohvati').then((response) => {
        this.predmeti = response.data;
      })
    },
    dodajTerminiPredavanja: function () {
      this.axios.post('http://localhost:8000/api/terminipredavanja/dodaj', this.forma).then(() => {
        this.dohvatiTerminiPredavanja()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodan termin predavanja.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju termina predavanja.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
    izbrisiTerminiPredavanja: function (id) {
      this.axios.get('http://localhost:8000/api/terminipredavanja/izbrisi/' + id).then(() => {
        this.dohvatiTerminiPredavanja();
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisan termin predavanja.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju termina predavanja.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
  },
}
</script>