function voorspelInvoerType(invoer){

  var letterTest = invoer.match(/[ABDEFHLMNSTVWYZ]/g);

  if(!letterTest){
    //invoer was mogelijk een kenmerk
    let kenmerk = invoer.replace(/\D/g,'');

    if( kenmerk.length == 16 ){
      return 'kenmerk';
    }
  }
  else if(letterTest.length == 1)  {
    let letter = letterTest[0];
    let bsn = invoer.split(letter)[0];
    if (bsn.length == 9){
      return 'aanslagnummer';
    }
  }

  return "onbruikbaar";
}

function normaliseerInvoer(invoer){
  return invoer.replace(/[\W_]+/g,'');
}

function formatteerKenmerk(invoer){
  invoer = normaliseerInvoer(invoer);
  return [invoer.substring(0, 4), invoer.substring(4, 8), invoer.substring(8, 12), invoer.substring(12, 16)].join(" ");
}
