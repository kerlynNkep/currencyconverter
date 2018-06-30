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
const currency_url = "https://free.currencyconverterapi.com/api/v5/currencies";

fetch(currency_url).then(response =>{
    if (response.status !== 200){
        console.log("wrong request" +  response.status);
        return;
    }
    
    response.json().then(currencyNames =>{
        console.log(currencyNames);
        let from_currency = document.getElementById('sel1');
        let to_currency = document.getElementById('sel2');
        for (const currency in currencyNames){
            for (const id in currencyNames[currency]){
                from_currency.innerHTML += "<option value = '${currencyNames[currency][id].id}'> ${currencyNames[currency][id].id} "
                to_currency.innerHTML += "<option value = '${currencyNames[currency][id].id}'> ${currencyNames[currency][id].id} "

            }
        }
    })
})