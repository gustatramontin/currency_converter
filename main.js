var usd_eur // euro in dollars
var usd_brl
var brl_eur

var currencys = {
    usd_eur: 0,
    usd_brl: 0,

    eur_usd: 0,
    brl_usd: 0,

    brl_eur: 0,
    eur_brl: 0
}

document.querySelector('body').onload = async () => {
    await getValues(mykey)
    convertExample()
}

const mykey = 'd39b97a153f3886c2208'

async function getValues(key) {
    
    const json1 = await fetch(`https://free.currconv.com/api/v7/convert?q=USD_EUR,USD_BRL&compact=ultra&apiKey=${key}`).
    then(res => res.json())

    const json2 = await fetch(`https://free.currconv.com/api/v7/convert?q=BRL_EUR&compact=ultra&apiKey=${key}`).
    then(res => res.json())

    currencys.usd_eur = json1['USD_EUR']
    currencys.usd_brl = json1['USD_BRL']
    currencys.brl_eur = json2['BRL_EUR']
    currencys.eur_usd = 1/json1['USD_EUR']
    currencys.brl_usd = 1/json1['USD_BRL']
    currencys.eur_brl = 1/json2['BRL_EUR']

    console.log(currencys)

}

function convertExample() {
      const inputs = document.querySelectorAll('input')

      inputs[1].value = currencys.usd_brl
}

function convert(witch) {
    const input1 = document.querySelectorAll('input')[0]
    const input2 = document.querySelectorAll('input')[1]

    const select1 = document.querySelectorAll('select')[0].value
    const select2 = document.querySelectorAll('select')[1].value

    if ( witch === 1 ) {
        if (select1 === select2) {
            input2.value = input1.value
        } else {
            input2.value = input1.value * currencys[`${select1.toLowerCase()}_${select2.toLowerCase()}`]
        }
        
    } else {

        if (select1 === select2) {
            input1.value = input2.value
        } else {
            input1.value = input2.value / currencys[`${select1.toLowerCase()}_${select2.toLowerCase()}`]
        }
        
    }


}