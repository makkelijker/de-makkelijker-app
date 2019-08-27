var store = {
  state: {
    invoerRauw: '',
    typeInvoer: 'onbruikbaar',

    invoerAanslagnummer: {
      bsn: '',
      middelcode: '',
      slotnummers: '',
      compleet: ''
    },

    invoerEenVanBeideGeformatteerd: '',

    uitvoerAanslagnummer: {
      bsn: '',
      middelcode: '',
      slotnummers: '',
      compleet: ''
    },
    uitvoerKenmerk: '',
    vertaalStatus: ''
  },

  clearInvoerAction() {
    this.state.uitvoerKenmerk = ''
    this.state.uitvoerAanslagnummer = {
      bsn: '',
      middelcode: '',
      slotnummers: '',
      compleet: ''

    }
  },

  clearUitvoerAction() {
    this.state.uitvoerKenmerk = ''
    this.state.uitvoerAanslagnummer = {
      bsn: '',
      middelcode: '',
      slotnummers: '',
      compleet: ''
    }
  },

  setStoreKey(key,newValue) {
    this.state[key] = newValue
  },

  setStoreKeyUitvoerAanslagnummer(key,newValue) {
    this.state.uitvoerAanslagnummer[key] = newValue
  },

  setStoreKeyInvoerAanslagnummer(key,newValue) {
    this.state.invoerAanslagnummer[key] = newValue
  }


}
