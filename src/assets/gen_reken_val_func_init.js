function RegExpNumeric(strWaarde, strWelkVeld) {
  if (!isNummer(strWaarde)) {
    alert("Veld kan alleen cijfers bevatten");
    SetFocus(strWelkVeld);
  }
}
function RegExpAllNumeric(strWaarde, iPosities, strWelkVeld) {
  if (strWaarde.length!=iPosities) {
    alert("Onvoldoende cijfers");
    SetFocus(strWelkVeld);
  }
  if (!isNummer(strWaarde)) {
    alert("Veld mag alleen cijfers bevatten");
    SetFocus(strWelkVeld);
  }
}
function isNummer(strWaarde) {
  var objRegExp = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
  return objRegExp.test(strWaarde);
}
function MagBedrag(strWaarde, strMededeling) {
  // Check of de invoer van een veld met bedragen alleen uit cijfers bestaat.
  if (strWaarde.length!=0) {
    if ( (!isNummer(strWaarde)) || (strWaarde.indexOf(".")>-1) ) {
      alert(strMededeling);
      return false;
    } else {
      return true;
    }
  }
}
function MagSofi(strWaarde) {
  // Check of de invoer van een sofinummer alleen uit cijfers bestaat.
  if (strWaarde.length!=0) {
    if ( (!isNummer(strWaarde)) || (strWaarde.indexOf(".")>-1) ) {
      alert("Sofinummer mag alleen cijfers bevatten");
      return false;
    } else {
      return true;
    }
  }
}
function CheckSofinummer(strWaarde) {
  // Check of het ingevoerde een echt sofinummer is.
  while (strWaarde.length!=9) { strWaarde="0" + strWaarde }
  var iTemp = 0;
  var strControleGetal = strWaarde.substring(8,9);
  for (i=0;i<=7; i++) { iTemp = iTemp + ( parseInt(strWaarde.substring(i,i+1)) * (9-i) ) }
  strWaarde = iTemp % 11;
  if (strWaarde!=strControleGetal) {
    alert("Sofinummer onjuist");
    return false;
  } else {
    return true;
  }
}
function String2Valuta(strWaarde, bDecimaal){
  // Plaatst de duizendtalpunten. bDecimaal = false = geen gebruik van decimalen, bDecimaal = true = wel gebruik van decimalen
  strWaarde = "" + strWaarde;	// Indien strWaarde = integer >> omzetten naar string
  if ( (bDecimaal == false) && (strWaarde.length>0) ) {
    var iLengte = strWaarde.length;
    var iAantalDec = parseInt(iLengte / 3.1);
    var iTeller = 3;
    for (var i = 1; i <= iAantalDec; i++) {
      strWaarde = strWaarde.substring(0, iLengte - iTeller) + "." + strWaarde.substring(iLengte - iTeller);
      iTeller = iTeller + 3;
    }
  }
  return strWaarde;
}
function checkBedragen(oThis, strVeldnaam, bCenten, bDuizendtallen, bValidatie, bMagNegatief, bToonMetCenten, bAlert) {
  // aangepaste functie checkBedrag t.b.v. probleem in IE met het niet tonen van de cursor invoervelden. 
  // Hierbij wordt de berekende waarde automatisch aan het aanroepende veld teruggegeven.
  var num = oThis.value;
  var sign;
  var centen;
  var strSavNum=num;
  var tmpReturn;
  var sMin = "";
  if ( bMagNegatief ) {
    if (num.substring(0,1) == "-") {
      if (num.length > 1) {
        sMin = "-"; num = num.substring(1);
      } else 	{
        oThis.value = strSavNum;		
        if (bValidatie == true) {
          if (document.getElementById("divTiContent") != null && document.getElementById("divTiContent").style.display == 'block') {
            algTiValidatie();
          } else {
            algValidatie();
          }
        }				
        return(strSavNum);
      }
    }
  } else if(num.length > 0) {
    if (num.substring(0,1) == "-") {
      if (bAlert != false)alert("Negatieve bedragen zijn niet toegestaan, het min-teken wordt automatisch verwijderd.");
      oThis.value = num.substring(1,num.length);
      if (bValidatie == true) {
        if (document.getElementById("divTiContent") != null && document.getElementById("divTiContent").style.display == 'block') {
          algTiValidatie();
        } else {
          algValidatie();
        }
      }				
      return(num.substring(1,num.length));
    }
  }
  num = num.toString().replace(/\$|\,/g,'.');
  if(isNaN(num) || num=="" || num == null){
    num = strSavNum;
    if (num != "" && num != null) {	
      num = verwijderKarakters(num,bCenten);
      if (bCenten==false) {
        if (bAlert != false)alert("De door u ingevoerde waarde '" + strSavNum + "' is geen juiste invoer voor een bedrag. Voer uitsluitend cijfers in.");
      } else {	
        if (bAlert != false)alert("De door u ingevoerde waarde '" + strSavNum + "' is geen juiste invoer voor een bedrag. Voer uitsluitend cijfers en een komma in.");
      }
      if (strVeldnaam != "" && strVeldnaam != null){
        SetFocus(strVeldnaam);
      }
    }
    oThis.value = sMin + num;
    if (bValidatie == true) {
      if (document.getElementById("divTiContent") != null && document.getElementById("divTiContent").style.display == 'block') {
        algTiValidatie();
      } else {
        algValidatie();
      }
    }						
    return(sMin + num);
  }
  var achterdekomma=num.toString().split("."); 
  if (achterdekomma.length === 2 && achterdekomma[1].length > 2) {
    oThis.value = achterdekomma[0] + "," + achterdekomma[0].substr(0,2);
    if (bAlert != false) {
      alert("U hebt " + strSavNum + " als bedrag ingevuld. Dit is niet juist, bij een bedrag mag u slechts 2 cijfers achter de komma invullen. De teveel ingevoerde cijfers achter de komma worden automatisch verwijderd.");
      return;
    }
  }
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  centen = num%100;
  num = Math.floor(num/100).toString();
  if(centen<10){
    if (centen==0){
      centen="00";
    } else {
      centen = "0" + centen;
    }
  }
  if (bDuizendtallen == true) {
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
      num = num.substring(0,num.length-(4*i+3))+'.'+
        num.substring(num.length-(4*i+3));
    }	
  }
  if (bCenten==true ){
    if (bToonMetCenten==true ){
      tmpReturn = (((sign)?'':'-') + num + ',' + centen);
    } else {
      tmpReturn = strSavNum;
    }
  } else {
    tmpReturn = (((sign)?'':'-') + num);		
    if (strSavNum.indexOf(",") > -1 ) {
      if (bAlert != false)alert("U hebt het bedrag niet juist ingevuld. Vul het bedrag in hele euro's in. De komma wordt automatisch verwijderd.");
      SetFocus(oThis.name);
    }

  }
  oThis.value = sMin + tmpReturn;
  if (bValidatie == true) {
    if (document.getElementById("divTiContent") != null && document.getElementById("divTiContent").style.display == 'block') {
      algTiValidatie();
    } else {
      algValidatie();
    }
  }
  return tmpReturn;
}
function toRekenBedrag(num) {
  var strSavNum=num;
  num = num.toString().replace(/\$|\./g,'');
  num = num.toString().replace(/\$|\,/g,'.');	// alleen in blauw
  if(isNaN(num) || num=="" || num == null){
    num = strSavNum;
    return(num); 
  }
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  centen = num%100;
  num = Math.floor(num/100).toString();
  if(centen<10){
    if (centen==0){
      centen="00";
    } else {
      centen = "0" + centen;
    }
  }
  return (((sign)?'':'-') + num + '.' + centen);
}
function SetFocus(sInp) {
  // Indien element is disabled >> focus geeft error in IE
  if(!document.getElementById(sInp).disabled) {
    // setTimout is nodig voor FF
    if(document.getElementById(sInp)) {
      setTimeout(function(){document.getElementById(sInp).focus()},10);
    } else if(document.getElementById("Berekening").sInp) {
      setTimeout(function(){eval("document.getElementById(\"Berekening\")."+sInp+".focus()")},10);
    } else if(document.getElementById("frmBerekening").sInp) {
      setTimeout(function(){eval("document.getElementById(\"frmBerekening\")."+sInp+".focus()")},10);
    }
  }
}
