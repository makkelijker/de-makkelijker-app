function foutMelding(bericht){
  alert(bericht);
}

$( document ).ready(function() {

  $("#toon-debug").change(function(){
    if ( $("#toon-debug").is(":checked")){
      console.log('Hal.l;');
      $(".debug").show();
    }
    else{
      $(".debug").hide();
    }
  });

  $("#zoekkenmerk").click(function(){

    let invoer = $("#invoerkenmerk").val().replace(/[\W_]+/g,'');
    console.log(invoer);
    var result = invoer.match(/[ABDEFHLMNSTVWYZ]/g);

    console.log(result);
    if(!result){
      //invoer was mogelijk een kenmerk
      let kenmerk = invoer.replace(/\D/g,'');

      if( kenmerk.length == 16 ){

        $("#bkVeld0").val(kenmerk.substring(0, 4));
        $("#bkVeld1").val(kenmerk.substring(4, 8));
        $("#bkVeld2").val(kenmerk.substring(8, 12));
        $("#bkVeld3").val(kenmerk.substring(12, 16));
        Bereken(1);
      } else {
        foutMelding("Het kenmerk is niet correct")
      }
    }
    else if(result.length == 1)  {
      //invoer was mogelijk een aanslagnummer
      let letter = result[0];
      let bsn = invoer.split(letter)[0];
      let slotcijfers = invoer.split(letter)[1];

      $("#Middelcode").val(letter.toLowerCase());
      $("#inputSofi").val(bsn);
      console.log(bsn, slotcijfers);

      let letterveld ="";
      if ( (letter=="A") || (letter=="B") || (letter=="D") || (letter=="E") || (letter=="F") || (letter=="L") ){
        letterveld ="A";
      } else if ( (letter=="H") || (letter=="N") || (letter=="S")){
        letterveld ="H";
      }
      else{
        letterveld = letter;
      }

      $("#"+letterveld).val(slotcijfers);
      Bereken(0)
    }
    else{
      foutMelding("Invoer is geen geldig kenmerk of aanslagnummer.")
    }
  });
});


