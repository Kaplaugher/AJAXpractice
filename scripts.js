// console.log("Test");

// 1. Make getJson into a function so you can call it whenver oyu need to.
// 2. Instead of auto saving their symbols, you give them a save button
// 3. Retreive button?
// 4. Put bookmarks on the side of teh page2
// 5. Automatically refresh all stocks every X seconds
// 6. Keep the watchlist stocks in a separate table from searched stocks
// 7. Keep a "Recent" localStorage var, and a "saved" localStorage var
// 8. Pair up with BlackJack

// WAIT FOR THE DOM!!!
$(document).ready(function () {

    $('#arrow1').click(function () {
        $('#page1,#page2').css({
            'right': '100vw'
        });
    });
    $('#arrow2').click(function () {
        $('#page1,#page2').css({
            'right': '0vw'
        });
    })


    $('#save').click(function(){
         var symbol = $('#symbol').val();
        localStorage.setItem("userStocks", symbol);

    });
    
    $('#retrieve').click(function(){
        var userStocksSaved = localStorage.getItem('userStocks');
        grabJSON(symbol);

    });
    // See if the user has any stored stocks. If so, then load them
    // we ran split on userStocks localstorage var and it became an array!/
    // for(let i = 0; i < userStocksSaved.length; i++){
    // 	var htmlToPlot = buildStockRow(userStocksSaved[i]);
    // 	$('#stock-body').append(htmlToPlot);
    // }

    

    $('#send').submit(function () {
        // Stop the form from submitting (default action)
        event.preventDefault();
        // Get whatever the user typed out of the input and store it in symbol
        var symbol = $('#symbol').val();
        
        grabJSON(symbol);
        
    });
});


function grabJSON(query) {

    var symbol = query

    var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${symbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;

    $.getJSON(url, function (dataJSGotIfAny) {
        var stockInfo = dataJSGotIfAny.query.results.quote;
        if (dataJSGotIfAny.query.count == 1) {
            // we know this is a single object becaues theres only 1
            var htmlToPlot = buildStockRow(stockInfo);
            $('#stock-body').append(htmlToPlot);
        } else {
            // we know this is an array, because the count isnt 1
            for (let i = 0; i < stockInfo.length; i++) {
                var htmlToPlot = buildStockRow(stockInfo[i]);
                $('#stock-body').append(htmlToPlot);
            }
        }


    });


}




function buildStockRow(stock) {
    // check to see if change is + or -
    console.log(stock);
    if (stock.Change.indexOf('+') > -1) {
        // if > -1, there is a + somewhere in this string
        var classChange = "success";
    } else {
        var classChange = "danger";
    }
    var newHTML = '';
    newHTML += '<tr>';
    newHTML += '<td>' + stock.Symbol + '</td>';
    newHTML += '<td>' + stock.Name + '</td>';
    newHTML += '<td>' + stock.Ask + '</td>';
    newHTML += '<td>' + stock.Bid + '</td>';
    newHTML += '<td class="' + classChange + '">' + stock.Change + '</td>';
    newHTML += '</tr>';
    // console.log(newHTML);
    // $('#stock-body').append(newHTML);
    return newHTML;
}