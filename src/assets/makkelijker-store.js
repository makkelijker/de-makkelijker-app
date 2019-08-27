var store = {
  state: {
    invoerRauw: '',
    typeInvoer: 'onbruikbaar',

    invoerAanslagnummer: {
      bsn: '',
      middelcode: '',
      slotnummers: ''
    },

    invoerEenVanBeideGeformatteerd: '',
    //invoerKenmerk: '',

    uitvoerAanslagnummer: {
      bsn: '',
      middelcode: '',
      slotnummers: ''
    },
    uitvoerKenmerk: '',
  },

  clearInvoerAction() {
    this.state.uitvoerKenmerk = ''
    this.state.uitvoerAanslagnummer = {
      bsn: '',
      middelcode: '',
      slotnummers
    }
  },

  clearUitvoerAction() {
    this.state.uitvoerKenmerk = ''
    this.state.uitvoerAanslagnummer = {
      bsn: '',
      middelcode: '',
      slotnummers
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
