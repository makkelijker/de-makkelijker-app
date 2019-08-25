var arGewichten = new Array(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10);
var strHuidigJaarFull = ((new Date()).getFullYear()).toString();
var strHuidigJaar = strHuidigJaarFull.substr(strHuidigJaarFull.length - 1, 1);
var sSofinummer;
var sMiddelCode;
var sSubnr;

function Bereken(iWelkeBerekening) {
  SluitHelp();
  if (iWelkeBerekening == 0) { // Van aanslagnummer naar betalingskenmerk
    var strTemp = "";
    var strSofi = document.getElementById("frmBerekening").inputSofi.value;

    while (strSofi.length != 9) {
      strSofi = "0" + strSofi
    }
    var strMiddelcode = document.getElementById("Middelcode").value;
    //var strMiddelcode = document.getElementById("frmBerekening").selectMiddelcode.value;
    var strUitvoer1 = "";
    var strBetalingskenmerk = "";

    if ((strMiddelcode == "a") || (strMiddelcode == "b") || (strMiddelcode == "d") || (strMiddelcode == "e") || (strMiddelcode == "f") || (strMiddelcode == "l")) {
      strBetalingskenmerk = strBetalingskenmerk + strSofi.substring(0, 8);
      var strSubnummer = document.getElementById("frmBerekening").A.value.substring(0, 2);
      var strJaar = document.getElementById("frmBerekening").A.value.substring(2, 3);
      var strTijdvak = document.getElementById("frmBerekening").A.value.substring(3, 5);
      var strTijdvak2 = document.getElementById("frmBerekening").A.value.substring(3);
      var strVolgbob = document.getElementById("frmBerekening").A.value.substring(5);
      if (strMiddelcode == "a") {
        strBetalingskenmerk = strBetalingskenmerk + "0"
      }
      if (strMiddelcode == "b") {
        strBetalingskenmerk = strBetalingskenmerk + "1"
      }
      if (strMiddelcode == "d") {
        strBetalingskenmerk = strBetalingskenmerk + "3"
      }
      if (strMiddelcode == "e") {
        strBetalingskenmerk = strBetalingskenmerk + "4"
      }
      if (strMiddelcode == "f") {
        strBetalingskenmerk = strBetalingskenmerk + "5"
      }
      if (strMiddelcode == "l") {
        strBetalingskenmerk = strBetalingskenmerk + "6"
      }
      strBetalingskenmerk = strBetalingskenmerk + strJaar + strSubnummer + strTijdvak + strVolgbob;
      strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strSubnummer + "." + strJaar + strTijdvak2;
    }
    if ((strMiddelcode == "h") || (strMiddelcode == "n") || (strMiddelcode == "s")) {
      strBetalingskenmerk = strBetalingskenmerk + strSofi.substring(0, 8);
      if (strMiddelcode == "h") {
        strBetalingskenmerk = strBetalingskenmerk + "70"
      }
      if (strMiddelcode == "n") {
        strBetalingskenmerk = strBetalingskenmerk + "73"
      }
      if (strMiddelcode == "s") {
        strBetalingskenmerk = strBetalingskenmerk + "72"
      }
      var strJaar = document.getElementById("frmBerekening").H.value.substring(0, 1);
      var strSoort = document.getElementById("frmBerekening").H.value.substring(1, 2);
      if (strJaar == "") {
        strJaar = "x"
      }
      if (strSoort == "") {
        strSoort = "x"
      }
      var strVolgnummer = BelastingjaarIs2011ofLater(strJaar) ? document.getElementById("frmBerekening").H.value.substring(2) : "00"; //vanaf belastingjaar 2011 volgnummer
      strBetalingskenmerk = strBetalingskenmerk + strJaar + strSoort + "0" + strVolgnummer;
      var strVolgnummer = BelastingjaarIs2011ofLater(strJaar) ? "." + (document.getElementById("frmBerekening").H.value.substring(2)) : ""; //vanaf belastingjaar 2011 volgnummer
      strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar + strSoort + strVolgnummer;
    }
    if (strMiddelcode == "v") {
      if (strSofi.substring(0, 2) == "00") {
        strBetalingskenmerk = stripString(strSofi, "0").substring(0, stripString(strSofi, "0").length - 1)
      }
      if (strSofi.substring(0, 1) == "8") {
        strBetalingskenmerk = strSofi.substring(2, 8)
      }
      var strJaar = document.getElementById("frmBerekening").V.value.substring(0, 1);
      var strSoort = document.getElementById("frmBerekening").V.value.substring(1, 2);
      if (strSofi.substring(0, 2) == "00") {
        strMiddel = "74"
      }
      else if (strSofi.substring(0, 2) == "80" || strSofi.substring(0, 2) == "81" || strSofi.substring(0, 2) == "82" || strSofi.substring(0, 2) == "83" || strSofi.substring(0, 2) == "84") {
        strMiddel = strSofi.substring(0, 2);
      }
      else if (strSofi.substring(0, 2) == "85") {
        strMiddel = "92";
      }
      else if (strSofi.substring(0, 2) == "86") {
        strMiddel = "93";
      }
      else if (strSofi.substring(0, 2) == "87") {
        strMiddel = "94";
      }
      else if (strSofi.substring(0, 2) == "88") {
        strMiddel = "95";
      }
      else if (strSofi.substring(0, 2) == "89") {
        strMiddel = "96";
      }

      var strTijdvak = document.getElementById("frmBerekening").V.value.substring(2);
      strBetalingskenmerk = strBetalingskenmerk + strJaar + strSoort + strMiddel + strTijdvak + "0";
      strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar + strSoort + "." + strTijdvak;
    }
    if (strMiddelcode == "t") {
      strBetalingskenmerk = strBetalingskenmerk + strSofi.substring(0, 8);
      strTemp = document.getElementById("frmBerekening").T.value;
      var strJaar2 = strTemp.substr(0, (strTemp.length) - 5);
      if (strTemp.length == 6) {
        strTemp = berekenDecennium(strTemp.substring(0, 1)) + strTemp;
      }
      var strJaar = strTemp.substring(1, 2);
      var strSoort = strTemp.substring(2, 3);
      var strVolgnummer = strTemp.substring(3, 6);
      var strVolgnummer2 = strTemp.substring(3);
      var strMiddelherkenning = "x";
      if (strTemp.substring(6) == "1") {
        var strMiddelherkenning = "23"
      }
      if (strTemp.substring(6) == "2") {
        var strMiddelherkenning = "24"
      }
      if (strTemp.substring(6) == "3") {
        var strMiddelherkenning = "25"
      }
      if (strTemp.substring(6) == "4") {
        var strMiddelherkenning = "26"
      }
      strBetalingskenmerk = strBetalingskenmerk + strMiddelherkenning + strJaar + strSoort + strVolgnummer;
      strUitvoer1 = MaakSofiOp(strSofi) + "." + strMiddelcode.toUpperCase() + "." + strJaar2 + "." + strSoort + strVolgnummer2;
    }
    if (strMiddelcode == "w") {
      strBetalingskenmerk = strBetalingskenmerk + strSofi.substring(0, 8);
      var strSlotcijfers = document.getElementById('frmBerekening').W.value;
      //jaar
      var strJaar = strSlotcijfers.charAt(0);
      //soort
      var strSoort = strSlotcijfers.charAt(1);
      if ((strSoort == "1" || strSoort == "2" || strSoort == "3" || strSoort == "4" || strSoort == "5" || strSoort == "9") && BelastingjaarIs2011ofLater(strJaar)) {
        strSoort = "x";
      }
      //volgnummer
      var strVolgnummer = (strSlotcijfers.length == 5) ? strSlotcijfers.substring(2, 4) : "00";
      //middelherkenning
      if (strSlotcijfers.length == 2) {
        strMiddelherkenning = "4";
      }
      else if (strSlotcijfers.length == 3) {
        strMiddelherkenning = strSlotcijfers.charAt(2);
      }
      else if (strSlotcijfers.length == 5) {
        strMiddelherkenning = strSlotcijfers.charAt(4);
      }
      if (strMiddelherkenning == "8" || strMiddelherkenning == "9") {
        strMiddelherkenning = "x"
      }
      strBetalingskenmerk = strBetalingskenmerk + "75" + strJaar + strSoort + strVolgnummer + strMiddelherkenning;
      // uitvoer op scherm
      strMiddelherkenning = (strSlotcijfers.length == 2) ? "" : ("." + strMiddelherkenning);  // weergeven zoals ingevoerd.
      strVolgnummer = (strSlotcijfers.length == 5) ? ("." + strVolgnummer) : "";
      strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar + strSoort + strVolgnummer + strMiddelherkenning;
    }

    if (strMiddelcode == "m") {
      var strSofinummer = strSofi.substring(0, 8);
      var strJaar = document.getElementById("frmBerekening").M.value.substring(0, 1);
      var strMiddelcodeNummer = ""
      var strVolgnummer = document.getElementById("frmBerekening").M.value.substring(1); //Minus jaar dus
      if (strVolgnummer == "") {
        strVolgnummer = "0001"
      }
      ;

      if ((parseInt(strVolgnummer) >= 1 && parseInt(strVolgnummer) <= 9999) || (parseInt(strVolgnummer) >= 90001 && parseInt(strVolgnummer) <= 99999)) {
        if (parseInt(strVolgnummer) <= 9999) { // HSB
          strMiddelcodeNummer = "78";
        } else {
          strMiddelcodeNummer = "87";
        }
        if (strVolgnummer.length == 5) {
          var strVolgnummerTemp = strVolgnummer
        }
        if (strVolgnummer.length == 4) {
          var strVolgnummerTemp = "0" + strVolgnummer
        }
        if (strVolgnummer.length == 3) {
          var strVolgnummerTemp = "00" + strVolgnummer
        }
        if (strVolgnummer.length == 2) {
          var strVolgnummerTemp = "000" + strVolgnummer
        }
        if (strVolgnummer.length == 1) {
          var strVolgnummerTemp = "0000" + strVolgnummer
        }
        strBetalingskenmerk = strSofinummer + strMiddelcodeNummer + strJaar + strVolgnummerTemp.substring(1);
        if (strVolgnummer == "0001") {
          strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar;
        } else {
          strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar + "." + strVolgnummer;
        }
      }
    }

    if (strMiddelcode == "y") {
      if (strSofi.substring(0, 1) != "9") {
        strBetalingskenmerk = strSofi.substring(0, 8)
        var strJaar = document.getElementById("frmBerekening").Y.value.substring(0, 1);
        var strVolgnummer1 = "";
        if (document.getElementById("frmBerekening").Y.value.length > 1) {
          strVolgnummer1 = document.getElementById("frmBerekening").Y.value.substring(1)
        }
        if (parseInt(strVolgnummer1) <= 9999 || strVolgnummer1 == "") {
          var strMiddel = "76"
        }  //HSB
        if (parseInt(strVolgnummer1) > 9999) {
          var strMiddel = "88"
        }  // MOA
        if (strVolgnummer1.length == 0) {
          var strVolgnummer = "0001"
        }
        if (strVolgnummer1.length == 1) {
          var strVolgnummer = "000" + strVolgnummer1
        }
        if (strVolgnummer1.length == 2) {
          var strVolgnummer = "00" + strVolgnummer1
        }
        if (strVolgnummer1.length == 3) {
          var strVolgnummer = "0" + strVolgnummer1
        }
        if (strVolgnummer1.length == 4) {
          var strVolgnummer = strVolgnummer1
        }
        if (strVolgnummer1.length == 5) {
          var strVolgnummer = strVolgnummer1.substring(1)
        }
        strBetalingskenmerk = "" + strBetalingskenmerk + strMiddel + strJaar + strVolgnummer;
        strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + strJaar + "." + document.getElementById("frmBerekening").Y.value.substring(1);
      }
    }
    if (strMiddelcode == "z") {
      strBetalingskenmerk = strBetalingskenmerk + strSofi.substring(0, 8);
      var strJaar = document.getElementById("frmBerekening").Z.value.substring(0, 1);
      var strMiddelherkenning = "x";
      if ((document.getElementById("frmBerekening").Z.value.substring(5) == "1") || (document.getElementById("frmBerekening").Z.value.substring(5) == "2")) {
        var strMiddel = "97";
        var strJaar = document.getElementById("frmBerekening").Z.value.substring(0, 1);
        var strSoort = document.getElementById("frmBerekening").Z.value.substring(1, 2);
        var strVolgnummer = document.getElementById("frmBerekening").Z.value.substring(2, 4);
        var strMiddelherkenning = document.getElementById("frmBerekening").Z.value.substring(5);
        strBetalingskenmerk = strBetalingskenmerk + strMiddel + strJaar + strSoort + strVolgnummer + strMiddelherkenning;
        strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + document.getElementById("frmBerekening").Z.value.substring(0, 2) + "." + document.getElementById("frmBerekening").Z.value.substring(2);
      }
      if ((document.getElementById("frmBerekening").Z.value.substring(5) == "7") || (document.getElementById("frmBerekening").Z.value.substring(5) == "8")) {
        if (document.getElementById("frmBerekening").Z.value.substring(5) == "7") {
          var strMiddel = "85"
        }
        ;
        if (document.getElementById("frmBerekening").Z.value.substring(5) == "8") {
          var strMiddel = "86"
        }
        ;
        var strVolgnummer = document.getElementById("frmBerekening").Z.value.substring(1, 5);
        strBetalingskenmerk = strBetalingskenmerk + strMiddel + strJaar + strVolgnummer;
        strUitvoer1 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode.toUpperCase() + "." + document.getElementById("frmBerekening").Z.value.substring(0, 5) + "." + document.getElementById("frmBerekening").Z.value.substring(5);
      }
    }
    var iControlegetal = 0;
    for (i = 0; i <= 14; i++) {
      iControlegetal = iControlegetal + parseInt(strBetalingskenmerk.charAt(14 - i)) * arGewichten[i]
    }

    iControlegetal = 11 - (iControlegetal % 11);
    if (iControlegetal == 10) {
      iControlegetal = 1
    }
    if (iControlegetal == 11) {
      iControlegetal = 0
    }
    strTemp = iControlegetal + strBetalingskenmerk;
    if (strTemp.indexOf("NaN") > -1 || strTemp.length != 16) {
      //doTel('bld.reken.betalingskenmerk.aanslagnummer_naar_betalingskenmerk_false');
      doUitvoerResult("divResultGeenAanslagnummer");
      //document.getElementById("fsUitvoer").style.display = 'none';
    } else {
      //doTel('bld.reken.betalingskenmerk.aanslagnummer_naar_betalingskenmerk_true');
      strTemp = iControlegetal + strBetalingskenmerk;
      strUitvoer2 = strTemp.substring(0, 4) + " " + strTemp.substring(4, 8) + " " + strTemp.substring(8, 12) + " " + strTemp.substring(12);
      document.getElementById("spanAanslagnummer").innerHTML = "<h2>Aangifte-, aanslag- of beschikkingsnummer</h2><p>" + strUitvoer1 + "</p>";
      document.getElementById("spanBetalingsKenmerk").innerHTML = "<h2>Betalingskenmerk</h2><p>" + strUitvoer2 + "</p>";
      doUitvoerResult("divResult");
    }
    // Einde aanslagnummer naar betalingskenmerk
  } else if (iWelkeBerekening == 1) {

    // Betalingskenmerk naar aangifte/aanslagnummer
    var strAlleInput = document.getElementById("frmBerekening").bkVeld0.value + document.getElementById("frmBerekening").bkVeld1.value + document.getElementById("frmBerekening").bkVeld2.value + document.getElementById("frmBerekening").bkVeld3.value;
    if (CheckBetalingskenmerk(strAlleInput) == true) { // Van betalingskenmerk naar aanslagnummer
      var strTemp = "";
      var strMiddelcode = "";
      var iTemp = 0;
      var strMiddelcode1 = document.getElementById("frmBerekening").bkVeld2.value.substring(1, 3);
      var strMiddelcode2 = document.getElementById("frmBerekening").bkVeld2.value.substring(1, 2);
      var strSofi = document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value + document.getElementById("frmBerekening").bkVeld2.value.substring(0, 1);

      // Afwijkende sofi-grab bij middel V
      if (strMiddelcode1 == "74") {
        strSofi = "00" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "80" || strMiddelcode1 == "81" || strMiddelcode1 == "82" || strMiddelcode1 == "83" || strMiddelcode1 == "84") {
        strSofi = strMiddelcode1 + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "92") {
        strSofi = "85" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "93") {
        strSofi = "86" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "94") {
        strSofi = "87" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "95") {
        strSofi = "88" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      else if (strMiddelcode1 == "96") {
        strSofi = "89" + document.getElementById("frmBerekening").bkVeld0.value.substring(1) + document.getElementById("frmBerekening").bkVeld1.value.substring(0, 3)
      }
      // Einde afwijkende sofi-grab bij middel V

      // Sofi completeren
      for (i = 0; i <= 7; i++) {
        iTemp = iTemp + (parseInt(strSofi.substring(i, i + 1)) * (9 - i))
      }
      strSofi = strSofi + "" + iTemp % 11;

      if ((strMiddelcode2 == "0") || (strMiddelcode2 == "1") || (strMiddelcode2 == "3") || (strMiddelcode2 == "4") || (strMiddelcode2 == "5") || (strMiddelcode2 == "6")) {
        if (strMiddelcode2 == "0") {
          strMiddelcode = "A"
        }
        ;
        if (strMiddelcode2 == "1") {
          strMiddelcode = "B"
        }
        ;
        if (strMiddelcode2 == "3") {
          strMiddelcode = "D"
        }
        ;
        if (strMiddelcode2 == "4") {
          strMiddelcode = "E"
        }
        ;
        if (strMiddelcode2 == "5") {
          strMiddelcode = "F"
        }
        ;
        if (strMiddelcode2 == "6") {
          strMiddelcode = "L"
        }
        ;
      }
      if (strMiddelcode1 == "23" || strMiddelcode1 == "24" || strMiddelcode1 == "25" || strMiddelcode1 == "26") {
        strMiddelcode = "T"
      }
      if (strMiddelcode1 == "70") {
        strMiddelcode = "H"
      }
      ;
      if (strMiddelcode1 == "72") {
        strMiddelcode = "S"
      }
      ;
      if (strMiddelcode1 == "73") {
        strMiddelcode = "N"
      }
      ;
      if (strMiddelcode1 == "75") {
        strMiddelcode = "W"
      }
      ;
      if (strMiddelcode1 == "76") {
        strMiddelcode = "Y"
      }
      ;
      if (strMiddelcode1 == "78" || strMiddelcode1 == "87") {
        strMiddelcode = "M"
      }
      ;
      if (strMiddelcode1 == "76" || strMiddelcode1 == "88") {
        strMiddelcode = "Y"
      }
      ;
      if (strMiddelcode1 == "97" || strMiddelcode1 == "85" || strMiddelcode1 == "86") {
        strMiddelcode = "Z"
      }
      ;
      if (strMiddelcode1 == "74" || strMiddelcode1 == "80" || strMiddelcode1 == "81" || strMiddelcode1 == "82" || strMiddelcode1 == "83" || strMiddelcode1 == "84" || strMiddelcode1 == "92" || strMiddelcode1 == "93" || strMiddelcode1 == "94" || strMiddelcode1 == "95" || strMiddelcode1 == "96") {
        strMiddelcode = "V"
      }
      ;

      if ((strMiddelcode == "A") || (strMiddelcode == "B") || (strMiddelcode == "D") || (strMiddelcode == "E") || (strMiddelcode == "F") || (strMiddelcode == "L")) {
        var strSubnummer = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(2, 3);
        var strTijdvak = document.getElementById("frmBerekening").bkVeld3.value.substring(1, 3);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(3);
        var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strSubnummer + "." + strJaar + strTijdvak + strVolgnummer;
      }
      if ((strMiddelcode == "H") || (strMiddelcode == "N") || (strMiddelcode == "S")) {
        var strSubnummer = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        var strSoort = document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(1);
        if (!BelastingjaarIs2011ofLater(strJaar)) {
          if (strVolgnummer == "000") {
            strVolgnummer = ""; // Volgnummer 000 in betalingskenmerk van voor 2011 niet weergeven in aanslagnummer.
          }
          else {
            strMiddelcode = "";  // Volgnummer in betalingskenmerk van voor 2011 is altijd 000, anders betalingskenmerk onjuist.
          }
        } else {
          strVolgnummer = "." + strVolgnummer.substring(1); // Volgenummer in betalingskenmerk laatste 2 posities (15-16)
        }
        var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strSoort + strVolgnummer;
      }
      if (strMiddelcode == "T") {
        var strSubnummer = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strJaar = berekenDecennium(document.getElementById("frmBerekening").bkVeld2.value.substring(3)) + document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        var strSoort = document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(1);
        if (strMiddelcode1 == "23") {
          var strMiddelherkenning = "1"
        }
        if (strMiddelcode1 == "24") {
          var strMiddelherkenning = "2"
        }
        if (strMiddelcode1 == "25") {
          var strMiddelherkenning = "3"
        }
        if (strMiddelcode1 == "26") {
          var strMiddelherkenning = "4"
        }
        var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + "." + strSoort + strVolgnummer + strMiddelherkenning;
      }

      if (strMiddelcode == "M") {
        //				var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        //				var strVolgnummer = "";
        //				if (strMiddelcode1 == "78") { strVolgnummer += "0"; }
        //				if (strMiddelcode1 == "87") { strVolgnummer += "9"; }
        //				strVolgnummer += document.getElementById("frmBerekening").bkVeld3.value;
        //				if ( strVolgnummer=="0000" || strVolgnummer=="0001" ) { strVolgnummer="" }
        //				var strUitvoer3 = MaakSofiOp(stripString(strSofi,"0")) + "." + strMiddelcode + "." + strJaar + "." + stripString(strVolgnummer,"0");
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(0);
        if (strMiddelcode1 == "78") {
          strVolgnummer = "0" + strVolgnummer
        }
        if (strMiddelcode1 == "87") {
          strVolgnummer = "9" + strVolgnummer
        }
        if (strVolgnummer == "00001") {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar;
        } else {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + "." + stripString(strVolgnummer, "0");
        }
      }

      if (strMiddelcode == "V") {
        var strJaar = document.getElementById("frmBerekening").bkVeld1.value.substring(3);
        var strSoort = document.getElementById("frmBerekening").bkVeld2.value.substring(0, 1);
        var strTijdvak = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 3);
        var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strSoort + "." + strTijdvak;
      }

      if (strMiddelcode == "W") {
        var strSubnummer = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        var strSoort = document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(1, 3);
        if (!BelastingjaarIs2011ofLater(strJaar)) {
          if (strVolgnummer == "00") {
            strVolgnummer = "";
          }
          else {
            strMiddelcode = "";  // Volgnummer in betalingskenmerk van voor 2011 is altijd 00, anders betalingskenmerk onjuist.
          }
        } else {
          strVolgnummer = "." + strVolgnummer;
        }
        var strMiddelherkenning = document.getElementById("frmBerekening").bkVeld3.value.substring(3);
        if ((strMiddelherkenning == "4" || strMiddelherkenning == "5") && !(BelastingjaarIs2011ofLater(strJaar))) {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strSoort + strVolgnummer;
        } else {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strSoort + strVolgnummer + "." + strMiddelherkenning;
        }
      }
      if (strMiddelcode == "Y") {
        var strSubnummer = document.getElementById("frmBerekening").bkVeld2.value.substring(3) + document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(0);
        if (strMiddelcode1 == "76") {
          strVolgnummer = "0" + strVolgnummer
        }
        if (strMiddelcode1 == "88") {
          strVolgnummer = "9" + strVolgnummer
        }
        if (strVolgnummer == "00001") {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar;
        } else {
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + "." + stripString(strVolgnummer, "0");
        }
      }
      if (strMiddelcode == "Z") {
        var strJaar = document.getElementById("frmBerekening").bkVeld2.value.substring(3);
        if (strMiddelcode1 == "97") {
          var strSoort = document.getElementById("frmBerekening").bkVeld3.value.substring(0, 1);
          var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(1, 3);
          var strMiddelherkenning = document.getElementById("frmBerekening").bkVeld3.value.substring(3);
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strSoort + "." + strVolgnummer + "0" + strMiddelherkenning;
        }
        if (strMiddelcode1 == "85") {
          var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(0);
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strVolgnummer + "." + "7";
        }
        if (strMiddelcode1 == "86") {
          var strVolgnummer = document.getElementById("frmBerekening").bkVeld3.value.substring(0);
          var strUitvoer3 = MaakSofiOp(stripString(strSofi, "0")) + "." + strMiddelcode + "." + strJaar + strVolgnummer + "." + "8";
        }
      }
      if (strMiddelcode == "") {
        //doTel('bld.reken.betalingskenmerk.betalingskenmerk_naar_aanslagnummer_false');
        doUitvoerResult("divResultGeenAanslagnummer");
      } else {
        //doTel('bld.reken.betalingskenmerk.betalingskenmerk_naar_aanslagnummer_true');
        document.getElementById("spanAanslagnummer").innerHTML = "<h2>Aangifte-, aanslag- of beschikkingsnummer</h2><p>" + strUitvoer3 + "</p>";
        document.getElementById("spanBetalingsKenmerk").innerHTML = "";
        doUitvoerResult("divResult");
      }
    } else {
      //doTel('bld.reken.betalingskenmerk.betalingskenmerk_naar_aanslagnummer_false');
      alert("Betalingskenmerk onjuist");
    }
  } else if (iWelkeBerekening == 2) {
    // Van btw-nummer of loonheffingennummer naar betalingskenmerk
    if (sMiddelCode == "B") {
      sMidddelBetalingskenmerk = 1
    } else if (sMiddelCode == "L") {
      sMidddelBetalingskenmerk = 6
    }
    var aTijdvak = new Array();

    if (document.getElementById("selectBtwLhAangiftetijdvak").value == "alle") {
      $("#selectBtwLhAangiftetijdvak > option").each(function () {
        if ($(this).val() != "" && $(this).val() != "alle") {
          var temp = $(this).text() + " " + $(this).val();
          aTijdvak[aTijdvak.length] = new Array(2);
          aTijdvak[aTijdvak.length - 1][0] = $(this).text();
          aTijdvak[aTijdvak.length - 1][1] = $(this).val();
          //i++;
        }
      });
    } else {
      aTijdvak[aTijdvak.length] = new Array(2);
      aTijdvak[aTijdvak.length - 1][0] = $("#selectBtwLhAangiftetijdvak option:selected").text();
      aTijdvak[aTijdvak.length - 1][1] = $("#selectBtwLhAangiftetijdvak").val();
      //i++;
    }

    if (aTijdvak.length > 1) {
      var sHTML = '<table id="tblResultMeerdereTijdvakken"><caption>Overzicht betalingskenmerken</caption><tr><th scope="col">Jaar</th><th scope="col">Aangiftetijdvak</th><th scope="col">Aangiftenummer</th><th scope="col">Betalingskenmerk</th></tr>';
      var sTag = "tr";
      var sHTMLEnd = "</table>";
      var sTagSub = "<td>";
      var sTagSubEnd = "</td>";

    } else {
      var sTag = "p";
      var sHTML = "<h2>Aangifte-, aanslag- of beschikkingsnummer</h2><p>";
      var sTagSub = "";
      var sTagSubEnd = "";
      var sHTMLEnd = "";
    }
    for (var i = 0; i < aTijdvak.length; i++) {
      //sAanslagnummer += sTagSub;
      var sAanslagnummer = sTagSub + MaakSofiOp(sSofinummer) + "." + sMiddelCode + "." + sSubnr + "." + document.getElementById("selectBtwLhJaar").value + aTijdvak[i][1] + "0" + sTagSubEnd;

      var tmpBetalingskenmerk = sSofinummer.substr(0, 8) + sMidddelBetalingskenmerk + document.getElementById("selectBtwLhJaar").value + sSubnr + aTijdvak[i][1] + 0;
      var iControlegetal = 0;
      for (ii = 0; ii <= 14; ii++) {
        iControlegetal = iControlegetal + parseInt(tmpBetalingskenmerk.charAt(14 - ii)) * arGewichten[ii]
      }
      iControlegetal = 11 - (iControlegetal % 11);
      if (iControlegetal == 10) {
        iControlegetal = 1
      }
      if (iControlegetal == 11) {
        iControlegetal = 0
      }
      tmpBetalingskenmerk = iControlegetal + tmpBetalingskenmerk.substring(0, 3) + " " + tmpBetalingskenmerk.substring(3, 7) + " " + tmpBetalingskenmerk.substring(7, 11) + " " + tmpBetalingskenmerk.substring(11);
      var sBetalingskenmerk = sTagSub + tmpBetalingskenmerk + sTagSubEnd;

      if (aTijdvak.length > 1) {
        sHTML += "<tr><td>" + $("#selectBtwLhJaar option:selected").text() + "</td><td>" + aTijdvak[i][0] + "</td>" + sAanslagnummer + sBetalingskenmerk + "</" + sTag + ">";
      } else {
        sHTML += sAanslagnummer + "</" + sTag + "><h2>Betalingskenmerk</h2><" + sTag + ">" + sBetalingskenmerk + "</" + sTag + ">";
      }
    }

    document.getElementById("spanAanslagnummer").innerHTML = sHTML;
    document.getElementById("spanBetalingsKenmerk").innerHTML = "";
    doUitvoerResult("divResult");

  }
}

function RegExpNumeric(strWaarde, strWelkVeld) {
  if (!isNummer(strWaarde)) {
    alert("Veld kan alleen cijfers bevatten");
    SetFocus(strWelkVeld);
  }
}

function ChechBetKenm(strWaarde, iPosities, strVolgendVeld, e) {
  if (strWaarde.length == iPosities && RegExpAllNumeric(strWaarde, iPosities) == true) {
    if (e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 33 && e.keyCode != 34 && e.keyCode != 35 && e.keyCode != 36 && e.keyCode != 37 && e.keyCode != 39) {
      if (strVolgendVeld !== "ok_but")
        SetFocus(strVolgendVeld);
    }
  }
}

function RegExpAllNumeric(strWaarde, iPosities) {
  var bOk = true;
  if (strWaarde.length < iPosities) {
    alert("U heeft onvoldoende cijfers ingevuld.");
    bOk = false;
  } else if (!isNummer(strWaarde)) {
    alert("U kunt alleen cijfers invullen.");
    bOk = false;
  } else {
    checkRestant(strWaarde, iPosities);
  }
  return bOk;
}



function BelastingjaarIs2011ofLater(strBelJaar) {
  if (parseInt(strHuidigJaarFull) <= 2019) {  // na 2019 geen oude aanslagnummers meer in gebruik.
    if (parseInt(strBelJaar) > parseInt(strHuidigJaar) || strBelJaar == "0") {  // beljaar 6 in huidigjaar 2015 is belastingjaar 2006. Beljaar 4 in 2015 is belastingjaar 2014.
      return false;
    }
  }
  return true;
}

function berekenDecennium(strBelJaar) {
  var iBelJaar = parseInt(strBelJaar);
  var iSysJaar = parseInt(strHuidigJaar);
  var iSysDecennium = parseInt(strHuidigJaarFull.substr(2, 1));
  var iDecennium = iBelJaar <= iSysJaar ? iSysDecennium : iSysDecennium - 1;
  return iDecennium.toString();
}

function checkRestant(strWaarde, iPosities) {
  var strMiddelcode = document.getElementById("frmBerekening").selectMiddelcode.value;

  if ((strMiddelcode == "h") || (strMiddelcode == "n") || (strMiddelcode == "s")) {
    var strJaar = document.getElementById("frmBerekening").H.value.substring(0, 1);
    if (BelastingjaarIs2011ofLater(strJaar)) {
      var iPosities = document.getElementById('H').maxLength = 4;
    }
    else {
      var iPosities = document.getElementById('H').maxLength = 2;
    }
  }
  if (strMiddelcode == "w") {
    var strJaar = strWaarde.charAt(0);
    var strMiddelherkenning = strWaarde.charAt(2);
    if (BelastingjaarIs2011ofLater(strJaar) && (strMiddelherkenning != '6' && strMiddelherkenning != '7')) {
      var iPosities = document.getElementById('W').maxLength = 5;
    }
    else {
      document.getElementById('W').maxLength = 3;
    }
  }


  // alert (isNummer(strWaarde) + " - " + strWaarde.length +  " - " + iPosities)

  if (isNummer(strWaarde) && strWaarde.length >= iPosities) {
    document.getElementById("genereer").style.display = "block";	// Toon buttons
  }
  //	else if (strWaarde == "" && iPosities == -1) {
  // M
  //		document.getElementById("genereer").style.display = "block";	// Toon buttons
  //	}
  else {
    document.getElementById("genereer").style.display = "none";		// Verberg buttons
  }
}

function isNummer(strWaarde) {
  //return True or False
  var objRegExp = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
  return objRegExp.test(strWaarde);
}

function stripString(strWaarde, strTheStrip) {
  // Strip alle voorloop????, hangt van strTheStrip af
  return strWaarde.replace(new RegExp("^" + strTheStrip + "*(.*?)"), "$1");
}

var sVorigSofinummer
function CheckSofi(sSofi) {
  sSofi = verwijderKarakters(sSofi, false);
  if (sSofi != sVorigSofinummer) {
    sVorigSofinummer = sSofi;
    if (sSofi.length >= 7) {
      if (!isNummer(sSofi) || sSofi.indexOf(".") > -1) {
        alert("Sofinummer mag alleen cijfers bevatten");
        return false;
      } else {
        if (CheckSofiControleGetal(sSofi)) {
          // Toon volgende veld.
          document.getElementById("pMiddelCode").style.display = "block";
          document.getElementById("restant").style.display = "none";
          document.getElementById("genereer").style.display = "none";
        } else {
          // Verberg evt. resultaten en andere velden.
          document.getElementById("pMiddelCode").style.display = "none";
          document.getElementById("restant").style.display = "none";
          document.getElementById("genereer").style.display = "none";
          toonDivs("", "divResult", "fsUitvoer", "");
          //					alert("Sofinummer onjuist");
        }
      }
    } else {
      // Verberg evt. resultaten en andere velden.
      document.getElementById("pMiddelCode").style.display = "none";
      document.getElementById("restant").style.display = "none";
      document.getElementById("genereer").style.display = "none";
      toonDivs("", "divResult", "fsUitvoer", "");
    }
  }
  return sSofi;
  //	document.getElementById("inputSofi").value = sSofi;
}

function CheckSofi_onblur(sSofi, bAlert) {
  if (sSofi.length >= 7) {
    if (CheckSofiControleGetal(sSofi)) {
      // Toon volgende veld.
      document.getElementById("pMiddelCode").style.display = "block";
      document.getElementById("restant").style.display = "none";
      document.getElementById("genereer").style.display = "none";
    } else {
      // Verberg evt. resultaten en andere velden.
      document.getElementById("pMiddelCode").style.display = "none";
      document.getElementById("restant").style.display = "none";
      document.getElementById("genereer").style.display = "none";
      toonDivs("", "divResult", "fsUitvoer", "");
      if (bAlert == true) {
        alert("U hebt een BSN of RSIN ingevuld dat ongeldig is. Vul dit nummer opnieuw in.");
        SetFocus("inputSofi");
      }
      return false;
    }
    return true;
  } else {
    // Verberg evt. resultaten en andere velden.
    document.getElementById("pMiddelCode").style.display = "none";
    document.getElementById("restant").style.display = "none";
    document.getElementById("genereer").style.display = "none";
    toonDivs("", "divResult", "fsUitvoer", "");
  }
}

function CheckSofiControleGetal(strWaarde) {
  while (strWaarde.length != 9) {
    strWaarde = "0" + strWaarde
  }
  var iTemp = 0;
  var strControleGetal = strWaarde.substring(8, 9);
  for (i = 0; i <= 7; i++) {
    iTemp = iTemp + (parseInt(strWaarde.substring(i, i + 1)) * (9 - i))
  }
  strWaarde = iTemp % 11;
  if (strWaarde == strControleGetal) {
    iControlegetal = strControleGetal;
    return true;
  } else {
    return false;
  }
}

function MaakSofiOp(strWaarde) {
  if (strWaarde.length == 9) {
    strWaarde = strWaarde.substring(0, 4) + "." + strWaarde.substring(4, 6) + "." + strWaarde.substring(6)
  }
  if (strWaarde.length == 8) {
    strWaarde = strWaarde.substring(0, 3) + "." + strWaarde.substring(3, 5) + "." + strWaarde.substring(5)
  }
  if (strWaarde.length == 7) {
    strWaarde = strWaarde.substring(0, 2) + "." + strWaarde.substring(2, 4) + "." + strWaarde.substring(4)
  }
  return strWaarde
}

function CheckBetalingskenmerk(strBetalingskenmerk) {
  if (strBetalingskenmerk.length != 16) {
    return false
  }
  var iControlegetal = 0;
  for (i = 0; i <= 14; i++) {
    iControlegetal = iControlegetal + parseInt(strBetalingskenmerk.charAt(15 - i)) * arGewichten[i]
  }
  iControlegetal = iControlegetal % 11;
  if (iControlegetal > 1) {
    iControlegetal = 11 - iControlegetal
  }
  if (iControlegetal == 1) {
    iControlegetal = 1
  }
  if (iControlegetal == 0) {
    iControlegetal = 0
  }
  if (iControlegetal == strBetalingskenmerk.substring(0, 1)) {
    return true
  }
}


function SetFocus(sInp) {
  // Indien element is disabled >> focus geeft error in IE
  if (!document.getElementById(sInp).disabled) {
    // setTimout is nodig voor FF
    if (document.getElementById(sInp)) {
      setTimeout(function () {
        document.getElementById(sInp).focus()
      }, 10);
    } else if (document.getElementById("frmBerekening").sInp) {
      setTimeout(function () {
        eval("getElementById(\"frmBerekening\")." + sInp + ".focus()")
      }, 10);
    } else if (document.getElementById("frmBerekening").sInp) {
      setTimeout(function () {
        eval("getElementById(\"frmBerekening\")." + sInp + ".focus()")
      }, 10);
    }
  }
}

function doKeuzeHelpRestant(oThis) {
  var strMiddelcode = document.getElementById("frmBerekening").selectMiddelcode.value;
  if ((strMiddelcode == "a") || (strMiddelcode == "b") || (strMiddelcode == "d") || (strMiddelcode == "e") || (strMiddelcode == "f") || (strMiddelcode == "l") || (strMiddelcode == "v") || (strMiddelcode == "z")) {
    return doHelp('divHelpRestantABDEFLVZ',oThis);
  }
  else if ((strMiddelcode == "h") || (strMiddelcode == "n") || (strMiddelcode == "s")) {
    return doHelp('divHelpRestantHNS', oThis);
  }
  else if ((strMiddelcode == "m") || (strMiddelcode == "y")) {
    return doHelp('divHelpRestantMY', oThis);
  }
  else if (strMiddelcode == "t")  {
    return doHelp('divHelpRestantT', oThis);
  }
  else if (strMiddelcode == "w") {
    return doHelp('divHelpRestantW', oThis);
  }
}
