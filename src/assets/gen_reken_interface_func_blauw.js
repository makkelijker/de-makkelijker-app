function schakelButtons(element, schakelaar, button, fsswitch) {
  //Doel: Met deze functie kunnen alle buttons of één specifieke button binnen een fieldset worden verborgen danwel getoond.
  //para1: Geef hier de naam van de fieldset op waarbinnen de buttons worden geschakeld
  //para2: Geef hier true of false op om de buttons te tonen danwel te verbergen
  //para3: Geef de naam op van de specifieke button welke geschakeld moet worden OF
  //			 geef te tekst all op waarmee wordt bereikt dat alle buttons binnen de fieldset worden geschakeld.
  //			 true = tonen, false is NIET tonen
  //para4: Geef hier true of false op om de in para1 vermelde fieldset te verberegen of te tonen.

  var input = document.getElementById(element).getElementsByTagName("input");
  if (schakelaar == true) {
    schakelaar = "visible";
  } else {
    schakelaar = "hidden";
  }for(var i = 0; i < input.length; i++) {
    if(input[i].name.substr(0, 4) == "but_") {
      if (button == "all" || input[i].name == button) {
        //alert("Schakel " + input[i].name + " naar " + schakelaar);
        input[i].style.visibility = schakelaar;
      }
    }
  }
  if (fsswitch == false) {
    document.getElementById(element).style.display = 'none';
    document.getElementById("divButtons").style.display = 'none';
  } else {
    document.getElementById(element).style.display = 'block';
    document.getElementById("divButtons").style.display = 'block';
  }
}

function ZetInputUit(element, schakelaar) {
  //Doel: Deze functie schakelt alle invoervelden binnen een fieldset in danwel uit.
  //Werking: Alle input-tags worden geschakeld behalve de tags waarvan de naam van de tag begint met de tekst "but_"
  //para1: Geef hier de naam van de fieldset op waarbinnen de velden worden geschakeld
  //para2: Geef hier true of false op om de velden te déactiveren danwel te activeren
  //			 true = uitgeschakeld, false is ingeschakeld
  var input = document.getElementById(element).getElementsByTagName("input");
  for(var i = 0; i < input.length; i++) {
    if(input[i].name.substr(0, 4) != "but_") {
      input[i].disabled = schakelaar;
    }
  }
}

function ZetSelectUit(element, schakelaar) {
  //Doel: Deze functie schakelt alle selectboxes binnen een fieldset in danwel uit.
  //Werking: Alle select's	worden geschakeld behalve de tags waarvan de naam van de tag begint met de tekst "but_"
  //para1: Geef hier de naam van de fieldset op waarbinnen de velden worden geschakeld
  //para2: Geef hier true of false op om de velden te déactiveren danwel te activeren
  //			 true = uitgeschakeld, false is ingeschakeld
  var input = document.getElementById(element).getElementsByTagName("select");
  for(var i = 0; i < input.length; i++) {
    input[i].disabled = schakelaar;
  }
}

// BEGIN Functies t.b.v. Module Beslisboom
if (arrAllResults == undefined) var arrAllResults = new Array();

if (arrAllQuestions == undefined){
  // de array waarin de beantwoording van de getoonde vragen wordt bijgehouden.
  var arrAllQuestions = new Array();
  arrAllQuestions[arrAllQuestions.length]= "Vraag1";
}

function doBeslis(strActVeld, strConclusie, strVolgendeVraag, strResult){
  // Met deze functie wordt de presentatie van de vragen geregeld voor een beslisboom.
  // Para1: De Actuele vraag
  // Para2: Te onthouden TussenConclusie.
  // Para3: De volgende vraag.
  // Para4: Te tonen eindresultaat/conclusie. 

  var arrAllFields = document.getElementById("fsInvoer1").getElementsByTagName("input")

  toonDivs("", "divResult", "fsUitvoer", "");
  if (strActVeld != arrAllQuestions[arrAllQuestions.length-1]){
    // gebruiker klikt op iets anders dan de volgende vraag
    var bStop = false;
    for (var i = arrAllQuestions.length-1 ; i>0 && bStop == false; i--) {
      if (arrAllQuestions[i] != strActVeld) {
        if (isRadio(arrAllFields, arrAllQuestions[i]) == 'radio') {
          eval("document.getElementById(\"frmBerekening\")." + arrAllQuestions[i] + "[0].checked = false");
          eval("document.getElementById(\"frmBerekening\")." + arrAllQuestions[i] + "[1].checked = false");
          //					document.getElementById("prn" + arrAllQuestions[i]).innerHTML = "" ;
          doPrnRadio("prn" + arrAllQuestions[i], "");
        }
        document.getElementById("div" + arrAllQuestions[i]).style.display = 'none';
        arrAllQuestions.pop();
        arrAllResults.pop();
      } else {
        bStop = true;
        if (arrAllResults.length > (arrAllQuestions.length - 1)) {
          arrAllResults.pop();
        }
      }
    }
  }
  // tonen van de volgende volgende vraag
  if (strVolgendeVraag != "" || ( strVolgendeVraag == "" && strActVeld == arrAllQuestions[arrAllQuestions.length-1])) {
    if (arrAllResults.length == arrAllQuestions.length &&	strActVeld == arrAllQuestions[arrAllQuestions.length-1]) {
      arrAllResults[arrAllResults.length-1]= strConclusie;
    } else {
      arrAllResults[arrAllResults.length]= strConclusie;
    }	
    if (strVolgendeVraag != "") {
      arrAllQuestions[arrAllQuestions.length]= strVolgendeVraag;
      toonDivs("div" + strVolgendeVraag, "divResult", "", "");
    }
  }
  if (strResult != "") {
    doUitvoerResult(strResult, arrAllResults);
  }
  // printwaarde vullen
  var sSpanText = "";

  /* mdb 29-10-2010 (tbv name=frmBerekening uit formulieren te verwijderen
  if (eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[0].checked == true")) {
    sSpanText = eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[0].value");
  } else if (eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[1].checked == true")) {
    sSpanText = eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[1].value");
  }
  doPrnRadio("prn" + strActVeld, sSpanText);
//document.getElementById("prn" + strActVeld).innerHTML = sSpanText;*/
if (eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[0].checked == true")) {
  sSpanText = eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[0].value");
} else if (eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[1].checked == true")) {
  sSpanText = eval("document.getElementById(\"frmBerekening\")." + strActVeld + "[1].value");
}
doPrnRadio("prn" + strActVeld, sSpanText);
}

function doBeslisBoom(oActVraag, strConclusie, strVolgendeVraag, strResult){
  // Met deze functie wordt de presentatie van de vragen geregeld voor een beslisboom.
  // Para1: De Actuele vraag
  // Para2: Te onthouden TussenConclusie.
  // Para3: De volgende vraag.
  // Para4: Te tonen eindresultaat/conclusie. 

  var arrAllFields = document.getElementById("fsInvoer1").getElementsByTagName("input");

  toonDivs("", "divResult", "fsUitvoer", "");
  if (oActVraag.tagName == "DIV") {
    oActVraag.name = oActVraag.id.substr(3);
  }

  if (oActVraag.name != arrAllQuestions[arrAllQuestions.length-1]){
    // gebruiker klikt op iets anders dan de volgende vraag
    var bStop = false;						 
    for (var i = arrAllQuestions.length-1 ; i>0 && bStop == false; i--) {
      if (arrAllQuestions[i] != oActVraag.name) {
        if (isRadio(arrAllFields, arrAllQuestions[i]) == 'radio'){
          document.getElementById(arrAllQuestions[i] + "True").checked = false;
          document.getElementById(arrAllQuestions[i] + "False").checked = false;
          doPrnRadio("prn" + arrAllQuestions[i], "");
        }
        document.getElementById("div" + arrAllQuestions[i] ).style.display = 'none';
        arrAllQuestions.pop();
        arrAllResults.pop();
      } else {
        bStop = true;
        if (arrAllResults.length > (arrAllQuestions.length - 1)) {
          arrAllResults.pop();
        }
      }
    }
  }
  // tonen van de volgende volgende vraag
  if (strVolgendeVraag != "" || ( strVolgendeVraag == "" && oActVraag.name == arrAllQuestions[arrAllQuestions.length-1])) {
    if (arrAllResults.length == arrAllQuestions.length &&	oActVraag.name == arrAllQuestions[arrAllQuestions.length-1]) {
      arrAllResults[arrAllResults.length-1]= strConclusie;
    } else {
      arrAllResults[arrAllResults.length]= strConclusie;
    }	
    if (strVolgendeVraag != "") {
      arrAllQuestions[arrAllQuestions.length]= strVolgendeVraag;
      toonDivs("div" + strVolgendeVraag, "divResult", "", "");
    }
  }
  if (strResult != "") {
    doUitvoerResult(strResult, arrAllResults);
  }
  // printwaarde vullen
  doPrnRadio("prn" + oActVraag.name, oActVraag.value);
}
// EINDE Functies t.b.v. Module Beslisboom

// Nieuw - oktober 2007
function GenereerListBox(iVan, iTot, iStep, sVanTotTekst, sDefaultValue, sDefaultTekst) {
  if (sDefaultValue != "" && sDefaultTekst != "") {
    document.write("<option value=\"" + sDefaultValue + "\">" + sDefaultTekst + "</option>");
  }
  if (iStep > 0) {
    for(i=iVan; i<=iTot; i+=iStep) {
      document.write("<option value=\"" + i + "\">" + i + sVanTotTekst + "</option>");
    }
  } else if (iStep < 0) {
    for (i=iVan; i>=iTot; i+=iStep) {
      document.write("<option value=\"" + i + "\">" + i + sVanTotTekst + "</option>");
    }
  }
}

function GetCurrentFieldSet(sDiv,iProtect) {
  // iProtect: max. 20 loops
  oDiv = sDiv.parentNode;
  while(oDiv.id.substring(0,2) != "fs" && iProtect < 20) {
    return GetCurrentFieldSet(oDiv,iProtect+1);
  }
  return oDiv.id;
}

function ConvertToObject(elem) {
  return (typeof(sDiv) != "object") ? document.getElementById(elem) : sDiv;
}

function HideAndShowDiv(sDiv) {
  // IE bug: legends van fieldsets staan door elkaar heen wanneer er een div tussen 2 fieldsets wordt geplaatst
  if (isVisible(sDiv)) {
    document.getElementById(sDiv).style.display = 'none';
    document.getElementById(sDiv).style.display = 'block';
  }
}
