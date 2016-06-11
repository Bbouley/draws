// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  var drawObject = {};

  $('#submitDrawAmount').on('click', function(e) {
    e.preventDefault();
    var cashValue = $('#cashAmount').val();
    // drawObject.date = $('#drawDate').val();
    drawObject.cashValue = parseInt(cashValue);
    var afterTaxValue = takeOutTaxes(+cashValue);
    drawObject.totalRecieved = afterTaxValue;
    drawObject.cashKept = takeHome(afterTaxValue);
    var afterTakeHome = drawObject.totalRecieved - drawObject.cashKept
    drawObject.stocks = getStocks (afterTakeHome);
    drawObject.bonds = afterTakeHome - drawObject.stocks;
    var bondReturn = getBondReturn(drawObject.bonds);
    drawObject.bondsDailyRecieved = bondReturn.dailyValue;
    drawObject.bondsMonthlyRecieved = parseInt(bondReturn.monthlyValue.toFixed(2));

    console.info(drawObject);
  });

});

function takeOutTaxes (cashValue) {
    return ((cashValue/100) * 70)
}

function takeHome (cash) {
    if (cash < 100000000) {
        while (cash - 10000000 > 0) {
            cash -= 10000000
        }
        if (cash > 5000000) {
            return cash
        } else {
            return cash + 5000000
        }
    } else {
        while (cash - 10000000 > 10000000) {
            cash -= 20000000
        }
        if (cash > 5000000) {
            return cash
        } else {
            return cash + 10000000
        }
    }

}

function getStocks (cash) {
    return ((cash/100) * 60)
}

function getBondReturn (cash) {
    var yearReturn = ((cash/100) * 4.5)
    var returnObject = {};
    returnObject.dailyValue = 0;
    while ((yearReturn - 365000) > 450000) {
        yearReturn -= 365000;
        returnObject.dailyValue += 1000;
    }
    returnObject.monthlyValue = (yearReturn/12);
    if (returnObject.monthlyValue > 40000) {
        yearReturn -= 365000;
        returnObject.dailyValue += 1000;
        returnObject.monthlyValue = (yearReturn/12);
    }

    return returnObject;
}

