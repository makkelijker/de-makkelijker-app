/* mdb, wordt alleen gebruikt in betalingskenmerk en deze heeft al een eigen stripString functie
function stripString(strWaarde, strTheStrip) {
  // Strip alle voorloop????, hangt van strTheStrip af
  return strWaarde.replace(new RegExp("^" + strTheStrip + "*(.*?)"), "$1");
}*/

function verwijderKarakters(sVal, bCent, bOokNul) {
  if(bCent) {
    sNewVal = sVal.replace(/[^\d,]/g,"");	// laat cijfers en komma staan
    //dubbele komma's verwijderen
    var iKomma = 0;
    var sTemp="";
    for (var i=0; i < sNewVal.length; i++){
      if (sNewVal.substr(i,1) != "," || (sNewVal.substr(i,1) == "," && iKomma == 0 )) {
        sTemp+=sNewVal.substr(i,1);
        if (sNewVal.substr(i,1) == "," && iKomma == 0 ) {
          iKomma++;
        }
      }
    }
    sNewVal = sTemp;

  } else {
    sNewVal = sVal.replace(/[^\d]/g,"");	// laat alleen cijfers staan
    if (bOokNul && sVal=="0") {
      sNewVal = ""
    }
  }
  return sNewVal
}


function checkBedrag(num, strVeldnaam, frmName, bCenten, bDuizendtallen, bValidatie, bMagNegatief) {
  //handelt de invoer van bedrag-velden af.
  //parameters
  // num = de invoer welke onderzocht moet worden
  // strVeldnaam =  de naam van het veldnaam van het veld welke na de verwerking de
  var sign;
  var centen;
  // var num = objVeld.value;
  //  var strVeldnaam = objVeld.name;
  var strSavNum=num;
  if ( bMagNegatief ) {
    if ( num.substring(0,1) == "-" && num.length== 1) { return(strSavNum)	}
  }
  num = num.toString().replace(/\$|\,/g,'.');
  if(isNaN(num) || num=="" || num == null){
    num = strSavNum;
    if (num != "" && num != null) {
      if (bCenten==false) {
        num = verwijderKarakters(num, bCenten, false);
        if (num == "") {num = "0"};
        //					num = num.toString().substr(0, num.toString().length -1)
        alert("De door u ingevoerde waarde '" + strSavNum + "' is geen juiste invoer voor een bedrag. Voer uitsluitend cijfers in.");
      } else {
        alert("De door u ingevoerde waarde '" + strSavNum + "' is geen juiste invoer voor een bedrag. Voer uitsluitend cijfers en een komma in.");
      }
      if (strVeldnaam != "" && strVeldnaam != null ){
        setTimeout(function(){eval("document.getElementById(\"" + strVeldnaam + "\").focus()");eval("document.getElementById(\"" + strVeldnaam + "\").select()");},10)
      }

    }
    if (bValidatie) {algValidatie()};
    // focus zetten omdat algValidatie focus weghaalt (in IE) door fieldsets uit- en aan te zetten
    if (strVeldnaam != "" && strVeldnaam != null ){setTimeout(function(){eval("document.getElementById(\"" + strVeldnaam + "\").focus()");},10)}
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
  if (bDuizendtallen == true) {
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
      num = num.substring(0,num.length-(4*i+3))+'.'+
        num.substring(num.length-(4*i+3));
    }
  }
  if (bValidatie == true) {algValidatie()};
  // focus zetten omdat algValidatie focus weghaalt (in IE) door fieldsets uit- aan te zetten
  if (strVeldnaam != "" && strVeldnaam != null ){setTimeout(function(){eval("document.getElementById(\"" + strVeldnaam + "\").focus()");},10)	}

  if (bCenten==true){
    return (((sign)?'':'-') + num + ',' + centen);
  }else{
    return (((sign)?'':'-') + num);
  }
}

function checkDag(oDag) {
  iDag = oDag.value;
  if(iDag == "") {
    alert("U hebt nog geen 'dag' ingevuld.");
    setTimeout("document.getElementById('gebdat_dag').select()",10);
    return false;
  } else if(!isNummer(iDag)) {
    alert("Een dag mag alleen uit cijfers bestaan.");
    document.getElementById('gebdat_dag').value = verwijderKarakters(iDag,false);
    setTimeout("document.getElementById('gebdat_dag').select()",10);
    return false;
  } else if(iDag < 1 || iDag > 31) {
    if (iDag != 0) {
      alert("Een dag ligt tussen 1 en 31.");
      setTimeout("document.getElementById('gebdat_dag').select()",10);
    }
    return false;
  } else if(!iDag == "") {
    return true;
  }
}

function checkMaand(oMaand) {
  iMaand = oMaand.value;
  if(iMaand == "") {
    alert("U hebt nog geen 'maand' ingevuld.");
    setTimeout("document.getElementById('gebdat_maand').select()",10);
    return false;
  } else if(!isNummer(iMaand)) {
    alert("Een maand mag alleen uit cijfers bestaan.");
    document.getElementById('gebdat_maand').value = verwijderKarakters(iMaand,false);
    setTimeout("document.getElementById('gebdat_maand').select()",10);
    return false;
  } else if(iMaand < 1 || iMaand > 12) {
    if (iMaand != 0) {
      alert("Een maand ligt tussen 1 en 12.");
      setTimeout("document.getElementById('gebdat_maand').select()",10);
    }
    return false;
  } else {
    return true;
  }
}

function checkJaar(oJaar) {
  iJaar = oJaar.value;
  if(iJaar == "") {
    alert("U hebt nog geen 'jaar' ingevuld.");
    setTimeout("document.getElementById('gebdat_jaar').select()",10);
    return false;
  } else if(!isNummer(iJaar)) {
    alert("Een jaar mag alleen uit cijfers bestaan.");
    document.getElementById('gebdat_jaar').value = verwijderKarakters(iJaar,false);
    setTimeout("document.getElementById('gebdat_jaar').select()",10);
    return false;
  } else {
    var dHuidigJaar = new Date();
    var dGeboorteJaar = new Date();
    dHuidigJaar.getYear();
    dGeboorteJaar.setFullYear(iJaar,0,1);
    iJaarVerschil = parseInt(dHuidigJaar.getYear()-dGeboorteJaar.getYear());
    if(iJaarVerschil < 0) {
      alert("Jaar kan niet in de toekomst liggen.");
      setTimeout("document.getElementById('gebdat_jaar').select()",10);
      return false;
    } else {
      return true;
    }
  }
}

