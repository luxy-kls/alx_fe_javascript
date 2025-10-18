// creating an array of quotes and their categories
 let quotes = [
   { text: "The only way to do great work is to love what you do" , category : "Inspirational"},
    { text: "Life is what happens when you are busy making other plans" , category : "Life"}, 
    { text: "Be yourself; everyone else is already taken", category : "Inspirational"},
     { text: "The future belongs to those who believe in the beauty of their dreams" , category : "Inspirational"},
     { text: "Life isn't about finding yourself, it's about creating yourself" , category : "Life"},
     { text: "Success is not final, failure is not fatal: it is the courage to continue that counts" , category : "Motivational"}
 ]

 // declaring a function that displays random Quotes
 let showRandomQuote = function (){
    //selecting a quote randomly
    let arr = quotes.length * Math.random();
    let randomQuote = Math.floor(arr);
    let selectedQuote = quotes[randomQuote];

    // displaying the generated quote on the page
    let display = document.getElementById("quoteDisplay");
    display.innerHTML =`<p> <em> ${selectedQuote.text} </em> - ${selectedQuote.category}`;
 }
    //adding event listener
    let btn = document.getElementById("newQuote");
    btn.addEventListener("click", showRandomQuote);


 // declaring a function that adds qoutes to the array
 let addQuote = function() {
    let newText = document.getElementById("newQuoteText").value;
    let newCategory = document.getElementById("newQuoteCategory").value;

    //checking status 
    if (newText !=="" && newCategory !==""){
        quotes.push({text: newText , category: newCategory});

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        showRandomQuote();
    }
 }
