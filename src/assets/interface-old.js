//var sVersie= "1.39.06.01";
//
//
  /*
function initVersie(){
  //addHtml()
  document.getElementById("divVersie").innerHTML = '<p>Versie: ' + sVersie + '</p>'
}
*/
/*
function doKeuzeChange(strWaarde) {
  SluitHelp();
  document.getElementById("frmBerekening").reset();
    //document.getElementById("restant").style.display = 'none';
  document.getElementById("genereer").style.display = 'none';
  document.getElementById("BtwLhGenereer").style.display = 'none';
  document.getElementById("fsInvoer1").style.display = 'none';
  document.getElementById("fsInvoer2").style.display = 'none';
  document.getElementById("fsBtwLhNaarKenmerk").style.display = 'none';
    //  document.getElementById("fsAangifteNaarKenmerk").style.display = 'none';
  document.getElementById("fsUitvoer").style.display = 'none';
  document.getElementById("divResultaat").style.display = 'none';

  if (strWaarde=="aanslagNAARkenmerk") {
    document.getElementById("fsInvoer1").style.display = 'block';
    document.getElementById("radioNaarKenmerk").checked = true;
  } else {
    document.getElementById("fsInvoer2").style.display = 'block';
    document.getElementById("radioNaarAanslag").checked = true;
  }

  return true;
}
*/

/*
function doKeuzeNaarKenmerkChange(oThis) {
  var sKeuze = oThis.value;
  document.getElementById("frmBerekening").reset();
  document.getElementById("radioNaarKenmerk").checked = true;
  if (oThis.value=="aangifteNAARkenmerk") {
    document.getElementById("radioAangifte").checked = true;
    $("#pMiddelCode").hide();
    $("#restant").hide();
    document.getElementById("fsBtwLhNaarKenmerk").style.display = 'none';
    document.getElementById("fsAangifteNaarKenmerk").style.display = 'block';
  } else if (oThis.value=="btwlhNAARkenmerk") {
    document.getElementById("radioBtwLh").checked = true;
    $("#BtwLhJaar").hide();
    $("#BtwLhFrequentie").hide();
    $('#BtwLhAangiftetijdvak').hide();
    vulBtwLhFrequentie();
    document.getElementById("fsAangifteNaarKenmerk").style.display = 'none';
    document.getElementById("fsBtwLhNaarKenmerk").style.display = 'block';
  }
  return true;
}
*/

var sVorigBtwLh = "";
function CheckBtwLh(oThis, bAlert) {
  sBtwLh = oThis.value
  if ((sBtwLh!=sVorigBtwLh && (sBtwLh != undefined || sBtwLh != "")) || bAlert==true){
    sBtwLh = sBtwLh.toUpperCase();
    var sSofi ="";
    var sMiddel="";
    var sVolgNr = "";
    var bValid = true;
    if (sBtwLh.indexOf("B") > -1 ){
      sMiddel = "B";
    }
    if (sBtwLh.indexOf("L") > -1 ){
      sMiddel += "L";
    }
    if (sMiddel.length == 1){
      var iPos = sBtwLh.indexOf(sMiddel);
      sSofi = verwijderKarakters(sBtwLh.substr(0,iPos),false);
      if (iPos + 1 < sBtwLh.length){
        sVolgNr = verwijderKarakters(sBtwLh.substr(iPos+1),false);
        if (sVolgNr.length != 2 || isNaN(sVolgNr) == true){
          bValid = false;
        }
        if (sSofi.length >= 7 && sSofi.length <= 9){
          if(CheckSofiControleGetal(sSofi) == false) {
            bAlert == true;
            bValid = false;
          } else {
            while (sSofi.length != 9) { sSofi = "0" + sSofi }
          }
        } else{
          bValid = false;
        }
      } else {
        bValid = false;
      }
    } else {
      sSofi = verwijderKarakters(sBtwLh,false);
      bValid = false;
    }
    sVorigBtwLh = sSofi + sMiddel + sVolgNr;
    if (bValid == false ){
      $("#BtwLhJaar").hide();
      $('#BtwLhFrequentie').hide();
      $('#BtwLhAangiftetijdvak').hide();
      if (bAlert == true || sBtwLh.length == 12){
        alert("U hebt een btw-/loonheffingennummer ingevuld dat ongeldig is. Vul dit nummer opnieuw in.");
      }
    } else {
      sSofinummer = sSofi;
      sMiddelCode = sMiddel;
      sSubnr = sVolgNr;
      vulBtwLhJaar();
      vulBtwLhFrequentie(sMiddel)

      $("#BtwLhJaar").show();
      $("#BtwLhFrequentie").hide();
      $('#BtwLhAangiftetijdvak').hide();
    }
  }
  BtwLhGenereer();
  return sVorigBtwLh;
}

function vulBtwLhFrequentie(sMiddel){
  var i = 0;
  var aFreq = new Array();
  aFreq[i] = new Array(2);  aFreq[i][0] = ""; aFreq[i][1] = "Maak een keuze..."; i++;
  if (sMiddel == "B"){
    aFreq[i] = new Array(2);  aFreq[i][0] = "maand"; aFreq[i][1] = "Maand"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "kalenderkwartaal"; aFreq[i][1] = "Kalenderkwartaal"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "Boekjaarkwartaal_startmnd_2"; aFreq[i][1] = "Boekjaarkwartaal dat aanvangt in 2e maand van een kalenderkwartaal"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "Boekjaarkwartaal_startmnd_3"; aFreq[i][1] = "Boekjaarkwartaal dat aanvangt in 3e maand van een kalenderkwartaal"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "jaar"; aFreq[i][1] = "Jaar"; i++;
  } else if (sMiddel == "L"){
    aFreq[i] = new Array(2);  aFreq[i][0] = "maand"; aFreq[i][1] = "Maand"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "4_wekelijks"; aFreq[i][1] = "4-wekelijks"; i++;
    aFreq[i] = new Array(2);  aFreq[i][0] = "halfjaar"; aFreq[i][1] = "Halfjaar"; i++
    aFreq[i] = new Array(2);  aFreq[i][0] = "jaar"; aFreq[i][1] = "Jaar"; i++;
  }
  $('#selectBtwLhFrequentie').empty();
  for (var i = 0; i < aFreq.length; i++){
    $('#selectBtwLhFrequentie').append($('<option/>',{
      value: aFreq[i][0],
      text: aFreq[i][1]
    } ));
  }
}

function doBtwLhFrequentie(oThis){
  document.getElementById("BtwLhGenereer").style.display = 'none';
  sTv = oThis.value;
  if (sTv != ""){
    var i = 0;
    var aTijdvak = new Array();
    aTijdvak[i] = new Array(2);  aTijdvak[i][0] = ""; aTijdvak[i][1] = "Maak een keuze..."; i++;
    if (oThis.value=="maand"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "01"; aTijdvak[i][1] = "januari"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "02"; aTijdvak[i][1] = "februari"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "03"; aTijdvak[i][1] = "maart"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "04"; aTijdvak[i][1] = "april"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "05"; aTijdvak[i][1] = "mei"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "06"; aTijdvak[i][1] = "juni"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "07"; aTijdvak[i][1] = "juli"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "08"; aTijdvak[i][1] = "augustus"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "09"; aTijdvak[i][1] = "september"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "10"; aTijdvak[i][1] = "oktober"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "11"; aTijdvak[i][1] = "november"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "12"; aTijdvak[i][1] = "december"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle maanden"; i++;
    } else if (oThis.value=="kalenderkwartaal"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "21"; aTijdvak[i][1] = "januari t/m maart"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "24"; aTijdvak[i][1] = "april t/m juni"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "27"; aTijdvak[i][1] = "juli t/m september"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "30"; aTijdvak[i][1] = "oktober t/m december"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle kalenderkwartalen"; i++;
    } else if (oThis.value=="Boekjaarkwartaal_startmnd_2"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "22"; aTijdvak[i][1] = "februari t/m april"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "25"; aTijdvak[i][1] = "mei t/m juli"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "28"; aTijdvak[i][1] = "augustus t/m oktober"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "31"; aTijdvak[i][1] = "november t/m januari"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle boekjaarkwartalen startend in 2e maand van een kalenderkwartaal"; i++;
    } else if (oThis.value=="Boekjaarkwartaal_startmnd_3"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "23"; aTijdvak[i][1] = "maart t/m mei"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "26"; aTijdvak[i][1] = "juni t/m augustus"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "29"; aTijdvak[i][1] = "september t/m november"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "32"; aTijdvak[i][1] = "december t/m februari"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle boekjaarkwartalen startend in 3e maand van een kalenderkwartaal"; i++;
    } else if (oThis.value=="4_wekelijks"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "71"; aTijdvak[i][1] = "Periode 1"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "72"; aTijdvak[i][1] = "Periode 2"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "73"; aTijdvak[i][1] = "Periode 3"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "74"; aTijdvak[i][1] = "Periode 4"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "75"; aTijdvak[i][1] = "Periode 5"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "76"; aTijdvak[i][1] = "Periode 6"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "77"; aTijdvak[i][1] = "Periode 7"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "78"; aTijdvak[i][1] = "Periode 8"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "79"; aTijdvak[i][1] = "Periode 9"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "80"; aTijdvak[i][1] = "Periode 10"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "81"; aTijdvak[i][1] = "Periode 11"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "82"; aTijdvak[i][1] = "Periode 12"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "83"; aTijdvak[i][1] = "Periode 13"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle 4-wekelijkse perioden"; i++;
    } else if (oThis.value=="halfjaar"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "31"; aTijdvak[i][1] = "1e half jaar"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "32"; aTijdvak[i][1] = "2e half jaar"; i++;
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "alle"; aTijdvak[i][1] = "alle perioden"; i++;
    } else if (oThis.value=="jaar"){
      aTijdvak[i] = new Array(2);  aTijdvak[i][0] = "40"; aTijdvak[i][1] = "januari t/m december"; i++;
    }
    $('#selectBtwLhAangiftetijdvak').empty();
    for (var i = 0; i < aTijdvak.length; i++){
      $('#selectBtwLhAangiftetijdvak').append($('<option/>',{
        value: aTijdvak[i][0],
        text: aTijdvak[i][1]
      } ));
      $('#BtwLhAangiftetijdvak').show();
    }
  } else {
    $('#BtwLhAangiftetijdvak').hide();
    BtwLhGenereer();
    return false;
  }
  BtwLhGenereer()
  return true;
}

function doBtwLhJaar(oThis){
  if (oThis.value != ""){
    $("#BtwLhFrequentie").show();
    if($("#selectBtwLhFrequentie option:selected").val() != ""){
      $("#BtwLhAangiftetijdvak").show();
    }
    BtwLhGenereer()
    return true;
  } else {

    $("#BtwLhFrequentie").hide();
    $("#BtwLhAangiftetijdvak").hide();
    BtwLhGenereer();
    return false;
  }
}

function BtwLhGenereer(){
  sValid = "show";
  aFields=$("#fsBtwLhNaarKenmerk ").find('input[type=text],select');
  for (var i = 0; i < aFields.length && sValid == "show"; i++){
    if(!$(aFields[i]).is(':visible')){
      sValid = "hide";
    } else {
      if($(aFields[i]).val() == ""){
        sValid = "hide";
      }
    }
  }
  eval('$("#BtwLhGenereer").' + sValid + '()');
}

function doBtwLhAangiftetijdvak(oThis){
  BtwLhGenereer();
  if (oThis.value != ""){
    return true;
  } else {
    return false;
  }
}

function CheckMiddelcode(strMiddelcode) {
  verbergDivVraag();
  var strMiddelKeuze = "";
  toonDivs("", "divResult", "fsUitvoer", "");	// altijd disablen (voor het geval er reeds een resultaat is getoond)
  if (strMiddelcode == "") {
    document.getElementById("restant").style.display = "none";
    document.getElementById("genereer").style.display = "none";
    return false;
  }
  if ( (strMiddelcode=="a") || (strMiddelcode=="b") || (strMiddelcode=="d") || (strMiddelcode=="e") || (strMiddelcode=="f") || (strMiddelcode=="l") ){
    strMiddelKeuze="A";
  } else if ( (strMiddelcode=="h") || (strMiddelcode=="n") || (strMiddelcode=="s")){
    strMiddelKeuze="H";
  } else if (strMiddelcode=="v") {
    strMiddelKeuze="V";
  } else if (strMiddelcode=="y") {
    strMiddelKeuze="Y";
  } else if (strMiddelcode=="m") {
    strMiddelKeuze="M";
  } else if (strMiddelcode=="t") {
    strMiddelKeuze="T";
  } else if (strMiddelcode=="w") {
    strMiddelKeuze="W";
  } else if (strMiddelcode=="z") {
    strMiddelKeuze="Z";
  } else if (strMiddelcode=="anders") {
    doTel('bld.reken.betalingskenmerk.betalingskenmerk_naar_aanslagnummer_false');
    doUitvoerResult("divResultGeenAanslagnummer");
    return false;
  }
  // Reset alle inputvelden binnen "restant"
  iInputs = document.getElementById("restant").getElementsByTagName("input");
  for(i=0; i<iInputs.length; i++) {
    iInputs[i].value = "";
  }
  document.getElementById("restant").style.display = 'block';
  document.getElementById("frmBerekening").inputSofiMiddel.value = document.getElementById("frmBerekening").inputSofi.value + " . " + document.getElementById("frmBerekening").selectMiddelcode.value.toUpperCase() + " . ";
  document.getElementById(strMiddelKeuze).style.display = 'inline';
  //		if (strMiddelKeuze == "M") {
  //			document.getElementById("genereer").style.display = 'block';
  //		} else {
  document.getElementById("genereer").style.display = 'none';
  //		}
  SetFocus(strMiddelKeuze);
}

function verbergDivHelp() {
  document.getElementById("divHelpStartTekst").style.visibility = "hidden";
  document.getElementById("divHelpSofinummer").style.visibility = "hidden";
  document.getElementById("divHelpMiddelcode").style.visibility = "hidden";
  document.getElementById("divHelpRestant").style.visibility = "hidden";
}

function verbergDivVraag() {
  document.getElementById("A").style.display = "none";
  document.getElementById("H").style.display = "none";
  document.getElementById("Y").style.display = "none";
  document.getElementById("M").style.display = "none";
  document.getElementById("T").style.display = "none";
  document.getElementById("V").style.display = "none";
  document.getElementById("W").style.display = "none";
  document.getElementById("Z").style.display = "none";
}

function doUitvoerResult(strWelkeDiv) {

  /*
  ZetInputUit("fsKeuze" , true);
  ZetInputUit("fsInvoer1" , true);
  ZetInputUit("fsInvoer2" , true);
  ZetInputUit("fsBtwLhNaarKenmerk" , true);
  ZetInputUit("fsAangifteNaarKenmerk" , true);
  ZetSelectUit("fsKeuze" , true);
  ZetSelectUit("fsInvoer1" , true);
  ZetSelectUit("fsInvoer2" , true);
  ZetSelectUit("fsBtwLhNaarKenmerk" , true);
  ZetSelectUit("fsAangifteNaarKenmerk" , true);
  */

  toonDivs("", "divHelp", "", "");
  toonDivs(strWelkeDiv, "divResult", "", "fsUitvoer");
  toonDivs("divResultaat", "", "", "fsUitvoer", "", "", "");
  //document.getElementById("genereer").style.display = 'none';
  //document.getElementById("BtwLhGenereer").style.display = 'none';
  //	schakelButtons("fsButtons", false, "all", false);
}

function doOpnieuw(strWelkVeld, strActie) {
  toonDivs("", "divResult", "fsUitvoer", "");
  ZetInputUit("fsKeuze" , false);
  ZetInputUit("fsInvoer1" , false);
  ZetInputUit("fsAangifteNaarKenmerk" , false);
  ZetInputUit("fsBtwLhNaarKenmerk" , false);
  ZetInputUit("fsInvoer2" , false);
  ZetSelectUit("fsAangifteNaarKenmerk" , false);
  ZetSelectUit("fsBtwLhNaarKenmerk" , false);
  ZetSelectUit("fsInvoer2" , false);
  //	schakelButtons("fsButtons", true, "all", true);
  document.getElementById("genereer").style.display = 'block';
  document.getElementById("BtwLhGenereer").style.display = 'block';
  if (strWelkVeld != "") {
    SetFocus(strWelkVeld);
  }
}

function vulBtwLhJaar(){
  var year = new Date().getFullYear();
  $('#selectBtwLhJaar').empty();
  $('#selectBtwLhJaar').append($('<option/>',{
    value: "",
    text: "Maak een keuze..."
  }))
  for (var i = year - 10; i < year + 10; i++){
    var bSel = false;
    if (i == year){
      // bSel = true;
    }
    $('#selectBtwLhJaar').append($('<option/>',{
      value: i.toString().substr(3,1),
      text: i
    } ).attr('selected', bSel));
  }


}


