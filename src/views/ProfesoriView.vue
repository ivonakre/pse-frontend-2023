<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="profesori" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiProfesori(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.ime" placeholder="Ime"></v-text-field>
    <v-text-field v-model="forma.prezime" placeholder="Prezime"></v-text-field>
    <v-text-field v-model="forma.korisnicko_ime" placeholder="Korisnicko ime"></v-text-field>
    <v-text-field v-model="forma.lozinka" placeholder="Lozinka"></v-text-field>
    <v-text-field v-model="forma.stalno_uposlen" placeholder="Stalno uposlen"></v-text-field>
    <v-autocomplete :items="spolovi" v-model="forma.spol" placeholder="Spol"></v-autocomplete>
    <v-btn @click="dodajProfesori">Dodaj profesora</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'ProfesoriView',
  data () {
    return {
      profesori: [],
      spolovi: [
        {text: 'Muški', value: 'musko'},
        {text: 'Ženski', value: 'zensko'}
      ],
      ucitavam: false,
      forma: {
        ime: '',
        prezime: '',
        korisnicko_ime: '',
        lozinka: '',
        stalno_uposlen: '',
        spol: '',
      },
      stupci: [
        {text: 'Ime', value: 'ime'},
        {text: 'Prezime', value: 'prezime'},
        {text: 'Korisnicko ime', value: 'korisnicko_ime'},
        {text: 'Lozinka', value: 'lozinka'},
        {text: 'Stalno uposlen', value: 'stalno_uposlen'},
        {text: 'Spol', value: 'spol'},
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
    this.dohvatiProfesori();
  },
  methods: {
    dohvatiProfesori: function () {
      this.ucitavam = true;
      this.axios.get('http://localhost:8000/api/profesori/dohvati').then((response) => {
        this.profesori = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu profesora.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dodajProfesori: function () {
      this.axios.post('http://localhost:8000/api/profesori/dodaj', this.forma).then(() => {
        this.dohvatiProfesori()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodan profesor.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju profesora.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
    izbrisiProfesori: function (id) {
      this.axios.get('http://localhost:8000/api/profesori/izbrisi/' + id).then(() => {
        this.dohvatiProfesori();
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisan profesor.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju profesora.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
  },
}
</script>