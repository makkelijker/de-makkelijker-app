Vue.component('code-invoer', {
  props:{
    title: String,
    nummer: String,
    placeholder: String,
  },
  methods: {
    versturen: function (event) {
      lijmcodeBereken(event.target.value);
    }
  },
  watch: {
    invoerRauw: function(){

      var typeInvoer = voorspelInvoerType( normaliseerInvoer(event.target.value));

      store.setStoreKey('typeInvoer', typeInvoer);
      store.setStoreKey('invoerRauw', this.invoerRauw);

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
  template: `
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Invoer</span>
        </div>
        <input

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
    nummerkenmerk: String
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> betalingskenmerk</p>
      </div>
      <div class="card-body text-center" style="background-color: #FFFFCC">
       <input type="text" class="ocr" v-model="nummerkenmerk" />
      </div>
    </div>
    `
})

Vue.component('aanslag-kaart', {
  props:{
    title: String,
    nummeraanslag: String
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> aanslagnummer</p>
      </div>
      <div class="card-body text-center" style="background-color: #61749F">
      <input type="text" class="no-ocr" v-model="nummeraanslag" />
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
        <kenmerk-kaart title="Invoer" :nummerkenmerk="nummer">
        </kenmerk-kaart>
      </template>

      <template v-if="type === 'aanslagnummer'">
        <aanslag-kaart title="Invoer" :nummeraanslag="nummer">
        </aanslag-kaart>
      </template>

    </div>
  `
})

Vue.component('vertaalkaart', {
  props: {
    type: String,
  },
  computed: {
    nummer: function(){
      return "een nummer";
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
    // a computed getter
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
    }
  }
})
