<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="predmeti" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiPredmeti(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
    <v-text-field v-model="forma.opis" placeholder="Opis"></v-text-field>
    <v-autocomplete :items="profesori" item-text="ime" item-value="id" v-model="forma.profesor_id" placeholder="Profesor"></v-autocomplete>
    <v-btn @click="dodajPredmeti">Dodaj predmet</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'PredmetiView',
  data () {
    return {
      profesori: [],
      predmeti: [],
      ucitavam: false,
      forma: {
        naziv: '',
        opis: '',
        profesor_id: '',
      },
      stupci: [
        {text: 'Naziv', value: 'naziv'},
        {text: 'Opis', value: 'opis'},
        {text: 'Profesor', value: 'profesor.ime'},
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
    this.dohvatiPredmeti();
    this.dohvatiProfesori();
  },
  methods: {
    dohvatiPredmeti: function () {
      this.ucitavam = true;

      this.axios.get('http://localhost:8000/api/predmeti/dohvati').then((response) => {
        this.predmeti = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu predmeta.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dohvatiProfesori: function () {
      this.axios.get('http://localhost:8000/api/profesori/dohvati').then((response) => {
        this.profesori = response.data;
      })
    },
    dodajPredmeti: function () {
      this.axios.post('http://localhost:8000/api/predmeti/dodaj', this.forma).then(() => {
        this.dohvatiPredmeti()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodan predmet.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju predmeta.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
    izbrisiPredmeti: function (id) {
      this.axios.get('http://localhost:8000/api/predmeti/izbrisi/' + id).then(() => {
        this.dohvatiPredmeti();

        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisan predmet.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju predmeta.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
  },
}
</script>