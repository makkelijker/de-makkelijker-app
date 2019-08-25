function findPos(obj,iWelke) {
  // Functie geeft de x & y coordinaten terug van een object.
  // para1: het object waarop geklikt is; para 2: 1=alleen x 2=alleen y 3=beide
  var curleft = 0;
  var curtop = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft;
    curtop = obj.offsetTop;
    // obj == obj.offsetParent?
    while (obj = obj.offsetParent) {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
  }
  if (iWelke == 1) {return [curleft]}
  else if (iWelke==2) {return [curtop]}
  else {return [curleft,curtop];}
}
// mdb: toegevoegd op 21-11-2010 (09-03-2011: vervangen door nieuwe functie BerekenOffset)
function PosCorrectie(iPos) {
  sBrowser = navigator.userAgent.toString().toLowerCase();
  iPos = iPos.replace("px","");
  if (sBrowser.indexOf("opera") != -1) {
    return (iPos-11+"px");
  } else if (sBrowser.indexOf("msie 7") != -1) {
    return (iPos-23+"px");
  } else if (sBrowser.indexOf("msie") != -1) {
    return (iPos-12+"px");
  } else {
    return (iPos+"px");
  }
}
function AlleDagen() {
  var i=0;
  for (i=1; i <= 31; i++) {
    document.write("<option value='" + i + "'>" + i + "</option>");
  }
}
function AlleMaanden() {
  var i=0;
  for (i=1; i <= 12; i++) {
    document.write("<option value='" + i + "'>" + i + "</option>");
  }
}
function AlleJaren(start, plus ,eind) {
  //para1 : Het beginjaar dat bovenaan in de selectiebox wordt getoond
  //para2 : Het aantal jaren dat bij het beginjaar moet worden opgeteld 
  //para3 : Het laatste jaar dat in de selectiebox moet worden getoond
  var i=0;
  if (start == "now") {
    var temp = new Date();
    start = temp.getFullYear();
    if (plus != "") { 
      start = start + plus;
    }	
  }
  if (eind == "now"){
    var temp = new Date();
    start = temp.getFullYear();
  }
  document.write("<option value='-1'>		</option>");
  for (i=start; i >= eind; i--) {
    document.write("<option value='" + i + "'>" + i + "</option>");
  }
}
function WisWaarden() {
  window.location.reload(false);
}
/* mdb toegevoegd op 19-11-2010 */
function GetDivProperties(sDiv) {
  // let op: top,left,right,bottom zijn t.o.v. viewport (rand van browser)
  var $doc = $(document);
  var $win = $(window);
  var $this = $("#"+sDiv);
  offset = $this.offset();
  iTop = offset.top - $doc.scrollTop();
  iBottom = $win.height() - iTop - $this.height();
  iLeft = offset.left - $doc.scrollLeft();
  iRight = $win.width() - iLeft - $this.width();
  oPos = new Object;
  oPos._left = iLeft;
  oPos._right = iRight;
  oPos._top = iTop;
  oPos._bottom = iBottom;
  oPos._width = $this.width();
  oPos._height = $this.height();
  return oPos
}
/* mdb toegevoegd op 29-10-2010 */
var oVraagteken = "";
function WisselVraagteken(oImage) {
  if (oVraagteken != "") {
    oVraagteken.src = "../images/bttn_help_normal.gif";
  }
  if (oImage != "") {
    oImage.src = "../images/bttn_help_ro.gif";
    oVraagteken = oImage;
  }
}
function NieuwVenster(strURL, strTarget) {
  var iWidth = 1024;
  if (screen.width <= iWidth) {
    if (screen.width >= 500) {
      iWidth = screen.width - 100;
    } else {
      iWidth = screen.width;
    }	
  }
  var iHeight=786;
  if (screen.height <= iHeight) {
    if (screen.height >= 500) {
      iHeight = screen.height - 200;
    } else {
      iHeight = screen.height;
    }	
  }	

  var strVensterEigenschappen = 'toolbar, location, statusbar, menubar, resizable, scrollbars, width=' + iWidth + ', height=' + iHeight;
  var objNieuwVenster = window.open(strURL, strTarget, strVensterEigenschappen);
  objNieuwVenster.focus();
  return objNieuwVenster;
}
function raw_popup(url, target, features) {
  var theWindow = window.open(url, target, features);
  theWindow.focus();
  return theWindow;
}
function doPrnRadio(id, sSpanText){
  try {
    document.getElementById(id).innerHTML = sSpanText; 
  } catch(err){
    return;
  }
}

function clearPrn(){
  // Het leegmaken van de spans t.b.v. het printen van radio's
  var arrAllSpans = document.getElementsByTagName("span");
  for (i=0; i <= arrAllSpans.length - 1; i++) {
    if(arrAllSpans[i].className == 'clPrinten') {
      document.getElementById(arrAllSpans[i].id).innerHTML = "";
    }
  }
}

function isRadio(arrVelden, strVeld) {
  // Deze functie behoort bij function doBeslis.
  // De functie geeft het type terug van een inputveld waarbij het exacte id van het input-veld niet bekend is.
  // Para1: De array met alle id's van de in het document aanwezige input-velden
  // Para2: Het eerste unieke deel van de te onderzoeken vraag
  for (var i = arrVelden.length-1 ; i>0; i--) {
    if (arrVelden[i].id.substr(0 ,strVeld.length) == strVeld) {
      return(document.getElementById(arrVelden[i].id).type)
    }
  }
  return('');
}
function isVisible(sDiv) {
  return document.getElementById(sDiv).style.display == "block";	// return true/false
}
function isChecked(sDiv) {
  return document.getElementById(sDiv).checked;	// return true/false
}
function toonDivs(strWelkeDiv, tmpSub, tmpFieldsetOff, tmpFieldsetOn, obj, bInlineAan, bOnlyHide) {
  // Doel: Met deze functie is het mogelijk om divs te tonen danwel te verbergen.
  // Werking: M.b.v van parameters is het mogelijk een div (para1) te tonen én tegelijkertijd:
  //						- divs (para2) met een specifieke naam of allen beginnend met een bepaalde tekst te verbergen;
  //											- een fieldset (para3) te verbergen;
  //											- een fieldset (para3) te tonen.
  // 									Als een bepaalde actie niet uitgevoerd hoeft te worden is het voldoende om een lege parameter ("") mee te geven. 
  // para1: de div welke wordt getoond
  // para2: het eerste deel van de div-naam welke worden uitgezet alvorens de bij para1 opgegeven div wordt getoond.
  // para3: de naam van de fieldset welke verborgen moet worden
  // para4: de naam van de fieldset welke getoond moet worden
  // para5: A.d.h.v. dit object kunnen de x en y coordinaten worden bepaald om de help naast de vraag te plaatsen. 
  // para6: Met deze instelling is het mogelijk om divs inLine te tonen, True = inline, False = NIET inline
  // Para7: Met deze instelling is het mogelijk een veld ALLEEN te verbergen (visibility = 'hidden') 
  //				Hiermee blijft de ruimte welke gereserveerd is voor het object gereserveerd. 
  //				True = object alleen hidden maken. False = Hidden maken en ruimte vrijgeven.
  // voorbeeld: toonDivs("divWoonEnWerk", "divResult", "uitvoer", "");
  // hier worden alle div's welke beginnen met divResult inclusief de fieldset uitvoer verborgen waarna divWoonEnWerk wordt getoond 
  var arrAllDIVs = document.getElementsByTagName("div");
  var i=0;
  var	tmpYoffset;
  //Eerst alles uitzetten (incl. de bijbehorende Fieldset i.g.v. tonen resultaat)
  for (i=0; i <= arrAllDIVs.length - 1; i++) {
    if ((arrAllDIVs[i].id.substr(0, tmpSub.length) == tmpSub) && tmpSub != "") {
      if (bOnlyHide != true) {
        document.getElementById(arrAllDIVs[i].id).style.display = 'none';
      }		
      document.getElementById(arrAllDIVs[i].id).style.visibility = 'hidden';
    }
  }
  if (tmpFieldsetOff != "") {
    if (bOnlyHide != true){
      document.getElementById(tmpFieldsetOff).style.display = 'none';	
    }
    document.getElementById(tmpFieldsetOff).style.visibility = 'hidden';
  }
  // En nu het juiste weer aanzetten	
  if (strWelkeDiv != "") {
    if (tmpFieldsetOn != "") {
      document.getElementById(tmpFieldsetOn).style.visibility = 'visible';
      document.getElementById(tmpFieldsetOn).style.display = 'block';
    }
    document.getElementById(strWelkeDiv).style.visibility = 'visible';
    document.getElementById(strWelkeDiv).style.display = 'block';
    if (bInlineAan==true) { 
      document.getElementById(strWelkeDiv).style.visibility = 'visible';
      document.getElementById(strWelkeDiv).style.display = 'inline'
    }	
    // Nu de helptekst naast het geklikte ? positioneren...
    if (obj!=undefined) {
      if(navigator.userAgent.indexOf("Firefox")!=-1){
        var topSpace=220;//86;
      } else {
        var topSpace=220;//86;
      }
      tmpYoffset="" + (findPos(obj,2) - topSpace) + "px";
      //			alert(tmpYoffset);
      //			alert(navigator.userAgent);
      /* mdb 03-11-2010 (help-div's zijn niet meer absoluut, positioneren met margin */
      /* mdb positioneren kan ook met top/left bij relative divs echter, dan nog steeds clipping */
      if (tmpSub == "divHelp" || tmpSub == "divTiHelp") {
        //				tmpYoffset = PosCorrectie(tmpYoffset);
        tmpYoffset = BerekenOffset(obj);
        document.getElementById(strWelkeDiv).style.marginTop = tmpYoffset;
      } else {
        document.getElementById(strWelkeDiv).style.top = tmpYoffset;
      }
    }	
  }
}
// mdb: nieuw 09-03-2011
function BerekenOffset(oThis) {

  iCorrectie = 7;
  iTop = $(oThis).offset().top;
  iTopMain = $(".size34").offset().top;
  if (navigator.userAgent.match("MSIE") && parseInt(navigator.userAgent.match("MSIE").substr(0,1)) < 8) {
    iPaddingContentMain = 0;
  } else {
    iPaddingContentMain = parseInt($(".size14").css("padding-top"));
  }
  margin_top = iTop - (iTopMain + iPaddingContentMain + iCorrectie);
  return margin_top +"px";
}
function doHelp(strWelkeDiv, strX) {
  //para1 : Welke helpDiv moet getoond worden
  //para2 : object waarmee de x en y coordinaten worden bepaald om de help naast de vraag te plaatsen. 
  toonDivs(strWelkeDiv, "divHelp", "", "", strX);
  if (document.getElementById("divHelpToetsingsinkomen")) {
    toonDivs(strWelkeDiv, "divTiHelp", "", "divHelpToetsingsinkomen", strX);	// alleen rood
  }
  /* mdb toegevoegd op 29-10-2010 */
  WisselVraagteken(strX);

  /* mdb toegevoegd op 19-11-2010 */
  var $this = $("#"+strWelkeDiv);
  var iAanwijzerHoogte = 21;
  var oDiv = GetDivProperties(strWelkeDiv);
  var iOffset = 4; // kleine offset aan onderzijde scherm

  if (oDiv._bottom < 0) {
    // help-venster past niet in scherm, dus venster naar boven verplaatsen
    iCurrentMarginTop = parseInt(ConvertToObject(strWelkeDiv).style.marginTop);
    iNewMarginTop = iCurrentMarginTop + oDiv._bottom - iOffset;
    iMarginVerschil = iCurrentMarginTop - iNewMarginTop;

    $this.css('marginTop', iNewMarginTop);
    // verplaatsing compenseren voor aanwijzer
    $(".clHelpAanwijzer:visible").css('marginTop', iMarginVerschil);
    iVerschil = iMarginVerschil - ($this.height()-iAanwijzerHoogte);
    // aanwijzer uit scherm? dan help-venster ook iets buiten beeld plaatsen
    if (iVerschil > 0) {
      $this.css('marginTop', iNewMarginTop+iVerschil);
      $(".clHelpAanwijzer:visible").css('marginTop', iMarginVerschil-iVerschil);
    }
    // help-venster te hoog? dan venster bovenaan scherm plaatsen
    if (iNewMarginTop < 0) {
      $this.css('marginTop', 0);
      $(".clHelpAanwijzer:visible").css('marginTop', iCurrentMarginTop);
    }
  } else {
    // help-venster past in scherm, dus aanwijzer bovenaan
    $(".clHelpAanwijzer:visible").css('marginTop', 0);
  }
}
function SluitHelp() {
  // - TI - Sluit zowel de divHelp... als de divTiHelp... divs (toetsingsinkomen)
  toonDivs('','divHelp','','','','','')
  toonDivs('','divTiHelp','','','','','');	// alleen rood
  /* mdb toegevoegd op 29-10-2010 */
  WisselVraagteken("");
}
function DisableBerekenButton(buttonId, bDisabled) {
  iOpacity = bDisabled ? 0.5 : 1;
  $("#"+buttonId).fadeTo("fast",iOpacity);
  /*	if (iOpacity == 1 && $("#"+buttonId).css("opacity") < 1) {
    DisableBerekenButton(buttonId, bDisabled);
  }*/
}
