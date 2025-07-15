let baseUrl = "https://api.frankfurter.app/latest?amount=1&"
const dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("form button")
let msg = document.querySelector(".msg p")

for (let select of dropdowns) {
    for (const currCode in countryList) {
        const newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.appendChild(newOption)
    }
    select.addEventListener("change",(evnt)=>{
        updateFlag(evnt.target)
    })
        
    
}
window.addEventListener("load",()=>{
    updateExchangeRate()
})
const updateFlag = (element)=>{
    let code = element.value
    let countryCode = countryList[code]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.previousElementSibling
    img.src = newSrc
    
}
const updateExchangeRate = async ()=>{
    let amountInput = document.querySelector(".amountdiv input")
    let amount = amountInput.value
    if(amount === "" || amount <1){
        amount = 1
        amountInput.value = 1

    }
    let fromCurrCode = document.querySelector(".from select").value
    let toCurrCode = document.querySelector(".to select").value

   const URL = `${baseUrl}from=${fromCurrCode}&to=${toCurrCode}`
   let response = await fetch(URL)
   let data = await response.json()
   let rate = data.rates[toCurrCode]
   let finalAmount = amount * rate
   console.log(finalAmount)
   msg.innerText = `${amount} ${fromCurrCode} is equal to ${finalAmount} ${toCurrCode}`

}
btn.addEventListener("click",(evnt)=>{
    evnt.preventDefault()
    updateExchangeRate()
})
