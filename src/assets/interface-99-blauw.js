function foutMelding(bericht){
  alert(bericht);
}

$( document ).ready(function() {

  $("#toon-debug").change(function(){
    if ( $("#toon-debug").is(":checked")){
      $(".debug").show();
    }
    else{
      $(".debug").hide();
    }
  });

  $("#zoekkenmerk").click(function(){
    lijmcodeBereken($("#invoerkenmerk").val());
  });
});


