//registering service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('currency-converter/sw.js')
    .then(function(reg){
        console.log("Registration successful");
    }).catch(function(error){
        console.log("Registration unsuccessful");
    });
}

//
const current_url = "https://free.currencyconverterapi.com/api/v5/";


fetch(current_url+'currencies')
.then(response => {
    return response.json();
})
.then(data => {
    for (let currency of Object.keys(data.results)){
        document.getElementById("baseCurrency").innerHTML += 
                                        "<option value=\""+data.results[currency].id+"\">"+
                                                data.results[currency].currencyName+" ("+
                                                data.results[currency].currencySymbol+") "
                                        "</option>";

        document.getElementById("toCurrency").innerHTML += 
                                        "<option value=\""+data.results[currency].id+"\">"+
                                                    data.results[currency].currencyName+" ("+
                                                    data.results[currency].currencySymbol+") "
                                        "</option>";
    }
});


function convert(){
    let currentCurrency = document.getElementById("baseCurrency").value;
    let destinationCurrency = document.getElementById("toCurrency").value;
    let value = document.getElementById("value").value;

    let query = currentCurrency+"_"+destinationCurrency

    fetch(baseUrl+'convert?q='+query+'&compact=y&')
    .then(response => {
        return response.json();
    }).then(response => {
        document.getElementById("displayPoint").innerHTML = value * response[query].val ;
    })
}