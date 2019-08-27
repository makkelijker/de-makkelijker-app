Vue.component('code-invoer', {
  props:{
    title: String,
    nummer: String
  },
  template: `
    `
})

Vue.component('kenmerk-kaart', {
  props:{
    title: String,
    nummer: String
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> betalingskenmerk</p>
      </div>
      <div class="card-body text-center" style="background-color: #FFFFCC">
       <input type="text" class="ocr" v-model="nummer" />
      </div>
    </div>
    `
})

Vue.component('aanslag-kaart', {
  props:{
    title: String,
    nummer: String
  },
  template: `
    <div class="card">
      <div style="padding: 1.25rem;">
        <h4>{{ title }}</h4>
        <p class="card-text"><strong>Type:</strong> aanslagnummer</p>
      </div>
      <div class="card-body text-center" style="background-color: #61749F">
      <input type="text" class="no-ocr" v-model="nummer" />
      </div>
    </div>
    `
})

Vue.component('invoerkaart', {
  props:{
    type: String
  },
  template: `
    <div id="invoerkaart">
      <template v-if="type === 'kenmerk'">
        <kenmerk-kaart title="Invoer" nummer="1160 2505 8560 2240">
        </kenmerk-kaart>
      </template>
    </div>
  `
})

Vue.component('vertaalkaart', {
  props: {
    type: String
  },
  template: `
    <div id="vertaalkaart">
      <template v-if="type === 'aanslagnummer'">
        <aanslag-kaart title="Vertaald" nummer="xx1">
        </aanslag-kaart>
      </template>
    </div>
  `
})

var app = new Vue({
  el: '#app'
})
