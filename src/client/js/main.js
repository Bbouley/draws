// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  var drawObject = {};

  $('#submitDrawAmount').on('click', function(e) {
    e.preventDefault();
    var cashValue = $('#cashAmount').val();
    drawObject.date = $('#drawDate').val();
    drawObject.gameType = $('#gameType').val();
    drawObject.cashValue = parseInt(cashValue);
    var afterTaxValue = takeOutTaxes(+cashValue);
    drawObject.totalRecieved = afterTaxValue;
    drawObject.cashKept = takeHome(afterTaxValue);
    var afterTakeHome = drawObject.totalRecieved - drawObject.cashKept
    drawObject.stocks = getStocks(afterTakeHome);
    drawObject.bonds = afterTakeHome - drawObject.stocks;
    var bondReturn = getBondReturn(drawObject.bonds);
    drawObject.bondsDailyReceived = bondReturn.dailyValue;
    drawObject.bondsMonthlyReceived = parseInt(bondReturn.monthlyValue.toFixed(2));

    var commafiedObject = commafyObject(drawObject);

    $.ajax({
        type : 'POST',
        url : '/newDraw',
        data : commafiedObject
    }).done(function(returnData) {
        $('#cashAmount').val('');
        $('#gameType').val('');
        $('#cashAmount').val('');
        location.reload();
    });

  });

  $('.deleteDraw').on('click', function(e) {
    e.preventDefault;
    $.ajax({
        type : "DELETE",
        url : '/delete/' + e.target.id
    }).done(function(returnData) {
        location.reload();
    })
  })

});

function takeOutTaxes (cashValue)
{
    var federalTax = 39.6;
    var stateTaxCO = 4;
    return ((cashValue/100) * (federalTax + stateTaxCO));
}

function takeHome (cash)
{
    if (cash < 100000000)
    {
        while (cash - 10000000 > 0)
        {
            cash -= 10000000
        }
        if (cash > 5000000)
        {
            return cash
        }
        else
        {
            return cash + 5000000
        }
    }
    else
    {
        while ((cash - 10000000) > 10000000)
        {
            cash -= 20000000
        }
        if (cash > 10000000)
        {
            return cash
        }
        else
        {
            return cash + 10000000
        }
    }
}

function getStocks (cash)
{
    return ((cash/100) * 70)
}

function getBondReturn (cash)
{
    var yearReturn = ((cash/100) * 3)
    var returnObject = {};
    returnObject.dailyValue = 0;
    while ((yearReturn - 365000) > 450000)
    {
        if (returnObject.dailyValue < 5000)
        {
            yearReturn -= 365000;
            returnObject.dailyValue += 1000;
        }
        else
        {
            break
        }
    }
    returnObject.monthlyValue = (yearReturn/12);
    if (returnObject.monthlyValue > 40000 && returnObject.dailyValue < 2000)
    {
        yearReturn -= 365000;
        returnObject.dailyValue += 1000;
        returnObject.monthlyValue = (yearReturn/12);
    }
    return returnObject;
}

function commafyObject (obj)
{
    var commaObject = {}
    for (var key in obj)
    {
        if (key !== 'date')
        {
            commaObject[key] = commafyNumber(obj[key]);
        }
        else
        {
            commaObject['date'] = obj[key];
        }
    }
    return commaObject;
}

function commafyNumber (num)
{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
