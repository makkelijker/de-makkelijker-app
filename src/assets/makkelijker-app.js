Vue.component('code-invoer', {
  props:{
    title: String,
    nummer: String,
    placeholder: String,
  },
  methods: {
    versturen: function (event) {
      lijmcodeBereken(event.target.value);
    },
    focusInput() {
      const input = document.getElementById('invoerkenmerk');
      
      //this.$refs.invoerveld.$el.focus();
      input.focus();
    }
  },
  watch: {
    invoerRauw: function(){

      var typeInvoer = voorspelInvoerType( normaliseerInvoer(event.target.value));

      store.setStoreKey('typeInvoer', typeInvoer);
      store.setStoreKey('invoerRauw', this.invoerRauw);
      store.setStoreKey('vertaalStatus', '');

      if( typeInvoer =='kenmerk'){
        store.setStoreKey('invoerEenVanBeideGeformatteerd', formatteerKenmerk(this.invoerRauw));
        lijmcodeBereken(this.invoerRauw);
      }
      else if( typeInvoer =='aanslagnummer'){
        store.setStoreKey('invoerEenVanBeideGeformatteerd', this.invoerRauw);
        lijmcodeBereken(this.invoerRauw);
      }
    }
  },
  data: function () {
    return {
      invoerRauw: ""
    }
  },
  mounted() {
    this.focusInput();
  },
  template: `
    <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg">Invoer</span>
      </div>
      <input

        ref="invoerveld"

        id="invoerkenmerk"
        type="text"
        class="form-control"

        v-model="invoerRauw"
        v-on:keyup.13="versturen"

        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        placeholder="type of plak hier uw aanslagnummer of belalingskenmerk">
    </div>
    `
})

Vue.component('kenmerk-kaart', {
  props:{
    title: String,
    nummerkenmerk: String,
    tabindex: String
  },
  data() {
    return {
      storeState: store.state
    };
  },
  computed:{
    vertaalFoutMelding: function(){
      if( this.storeState.vertaalStatus == 'foutInvoerKenmerk' ){
        return 'Het kenmerk kan niet worden vastgesteld.';
      }
      else{
        return '';
      }
    }
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> betalingskenmerk</p>
      </div>
      <div class="card-body" style="background-color: #FFFFCC">
     <div v-if="vertaalFoutMelding!=''" class="alert alert-danger" role="alert">
       {{vertaalFoutMelding}}
     </div>
       <input type="text" class="ocr" :tabindex="tabindex" v-model="nummerkenmerk" v-else/>
      </div>
    </div>
    `
})

Vue.component('aanslag-kaart', {
  props:{
    title: String,
    nummeraanslag: String,
    tabindex: String
  },
  data() {
    return {
      storeState: store.state
    };
  },
  computed:{
    vertaalFoutMelding: function(){
      if( this.storeState.vertaalStatus == 'foutInvoerAanslag' ){
        return 'Het aangifte-, aanslag- of beschikkingsnummer kan niet worden vastgesteld.';
      }
      else{
        return '';
      }
    }
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> aanslagnummer</p>
      </div>
      <div class="card-body" style="background-color: #61749F">
     <div v-if="vertaalFoutMelding!=''" class="alert alert-danger" role="alert">
       {{vertaalFoutMelding}}
     </div>
      <input type="text" class="no-ocr" :tabindex="tabindex" v-model="nummeraanslag" v-else />
      </div>
    </div>
    `
})

Vue.component('invoerkaart', {
  props:{
    type: String,
    nummer: String
  },
  template: `
    <div id="invoerkaart">
      <template v-if="type === 'kenmerk'">
        <kenmerk-kaart tabindex="-1" title="Invoer" :nummerkenmerk="nummer">
        </kenmerk-kaart>
      </template>

      <template v-if="type === 'aanslagnummer'">
        <aanslag-kaart tabindex="-1" title="Invoer" :nummeraanslag="nummer">
        </aanslag-kaart>
      </template>

    </div>
  `
})

Vue.component('vertaalkaart', {
  props: {
    type: String,
  },
  data() {
    return {
      storeState: store.state
    };
  },
  computed: {
    nummer: function(){
      if(this.storeState.typeInvoer == 'kenmerk'){
        return this.storeState.uitvoerAanslagnummer.compleet;
      }
      else if(this.storeState.typeInvoer == 'aanslagnummer'){
        return this.storeState.uitvoerKenmerk;
      }
    }
  },
  template: `
    <div id="vertaalkaart">
      <template v-if="type === 'kenmerk'">
        <kenmerk-kaart title="Vertaald" :nummerkenmerk="nummer">
        </kenmerk-kaart>
      </template>

      <template v-if="type === 'aanslagnummer'">
        <aanslag-kaart title="Vertaald" :nummeraanslag="nummer">
        </aanslag-kaart>
      </template>
    </div>
  `
})

var app = new Vue({
  el: '#app',
  data() {
    return {
      storeState: store.state
    };
  },
  computed: {
    typeUitvoer: function() {
      if(this.storeState.typeInvoer == 'kenmerk'){
        return 'aanslagnummer';
      }
      else if(this.storeState.typeInvoer == 'aanslagnummer'){
        return 'kenmerk';
      }
    },
    formStatus: function () {
      if(this.storeState.typeInvoer != 'onbruikbaar'){
        return 'gebruikt';
      }
      else{
        return 'leeg';
      }
    },
    vertaalStatus: function(){

      if( this.storeState.vertaalStatus != '' ){
        return 'fout';
      }
      else{
        return '';
      }

    },
    vertaalFoutMelding: function(){

      if( this.storeState.vertaalStatus == 'foutInvoerKenmerkOfAanslag' ){
        return 'De invoer is geen geldig betalingskenmerk of aangifte-, aanslag- of beschikkingsnummer.';
      }
      else{
        return '';
      }

    }
  }
})
