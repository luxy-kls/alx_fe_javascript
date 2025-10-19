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
        saveQuote();
        populateCategories();
        showRandomQuote();
    }
 }
 let createAddQuoteForm = function (){
    let formDiv = document.createElement("div");
    //creating input spaces
    let inputText = document.createElement("input");
    inputText.setAttribute("id", "newQuoteText");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Enter a new quote");

    let inputCategory = document.createElement("input");
   inputCategory.setAttribute("id", "newQuoteText");
    inputCategory.setAttribute("type", "text");
   inputCategory.setAttribute("placeholder", "Enter a category");

    //creating button
    let addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    //Appending everything to the div
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);

    //Appending div to body
    document.body.appendChild(formDiv);
    
 }
 createAddQuoteForm();

 // Adding Storage function
 let saveQuotes = function() {
   // converting array to JSON string
      let arraystring = JSON.stringify(quotes);
      
      //storing JSON array Data
      localStorage.setItem("quotes", arraystring);
 }

 //Adding function for getting items
 let loadQuotes = function () {
   //getting item from storage
   let retriever = localStorage.getItem("quotes");

   // adding conditon for retrieval of items 
   if(retriever) {
      //converting retrieved items to JSON parse 
      let arrayRetrieved = JSON.parse(retriever);
      return arrayRetrieved;
   } else{
      return [];
   }
 }

// Modifying quotes initialization
 quotes = loadQuotes();
if(quotes.length ===0){
   quotes = [
   { text: "The only way to do great work is to love what you do" , category : "Inspirational"},
    { text: "Life is what happens when you are busy making other plans" , category : "Life"}, 
    { text: "Be yourself; everyone else is already taken", category : "Inspirational"},
     { text: "The future belongs to those who believe in the beauty of their dreams" , category : "Inspirational"},
     { text: "Life isn't about finding yourself, it's about creating yourself" , category : "Life"},
     { text: "Success is not final, failure is not fatal: it is the courage to continue that counts" , category : "Motivational"}
 ]
}

//Exporting quotes as .json file
let exportToJsonFile = function () {
   //converting quotes to string
   let quoteConverter = JSON.stringify(quotes, null, 2);
   
   //Adding blob
   let blob = new Blob([quoteConverter],
      { type : "application/json"}
   )

   //generating temporary url
   let url = URL.createObjectURL(blob);

   //Adding link 
   let link = document.createElement("a");
   link.href = url;
   link.download = "quotes.json";

   //Appending link to Body, adding click and removing it
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

   //The Export button
   let exportButton = document.getElementById("exportQuotes");
   exportButton.addEventListener("click", exportToJsonFile);

// Importing ...
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  //Populating Categories dynamically 
  let populateCategories = function () {
   let categories = [ ...new Set(quotes.map(quote => quote.category))];

   let filter = document.getElementById("categoryFilter");
   filter.innerHTML =`<option value="all">All Categories</option>`;

   categories.forEach(category => {
      let newOption = document.createElement("option");
      newOption.value = category;
      newOption.textContent = category;
      filter.appendChild(newOption);
   })
  }

let filterQuotes = function() {
   let filter = document.getElementById("categoryFilter");

   let selectedCategory = filter.value;
   let filteredQuotes;
   if(selectedCategory === "all") {
      filteredQuotes = quotes;
   } else {
      filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
   }

   let  filteredArray = filteredQuotes.length*Math.random();
   let filteredDisplay = Math.floor(filteredArray);

   let randomQuotes = filteredQuotes[filteredDisplay];

   let display = document.getElementById("quoteDisplay");
   display.innerHTML = `<p> <em> ${randomQuotes.text}</em> - ${randomQuotes.category}</p>`;

   localStorage.setItem("lastSelectedCategory", selectedCategory);
}
 
let savedCategory = localStorage.getItem("lastSelectedCategory");
let filter = document.getElementById("caategoryFilter");

if(savedCategory) {
   filter.value=savedCategory;
   filterQuotes();
}  else {
   filterQuotes();
}

filter.addEventListener("change", filterQuotes);

//fetching data from server
async function fetchQuotesFromServer(){
   try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const serverPosts = await response.json();

      //Transform posts to quotesformat (take first 5 examples as an example)
      const serverQuotes = serverPosts.slice(0,5).map(post => ({
         text: post.title,
         category : "Server"
      }));
      return serverQuotes ;
   } catch (error) {
      console.error("Error fetching quotes:", error);
      return [];
   }
}

/*Implementing data syncing
async function syncQuotes(){
   try{
      const serverQuotes = await fetchQuotesFromServer();

      if(serverQuotes && serverQuotes.length > 0){
         quotes = serverQuotes;
         saveQuotes();
         populateCategories();
         filterQuotes();

         alert(`Quotes synced with server`);
      }
   }catch (error) {
      console.error(`Error syncing quotes:`, error)
   }
}
setInterval(syncQuotes, 30000);

function showNotification(message){
   let note =document.getElementById("notification");
   let noteText = document.getElementById("notificationText");
   noteText.textContent = message;
   note.style.display = "block";

   setTimeout(() => {
      note.style.display = "none";
   }, 3000);
}*/
// Simulated server interaction using JSONPlaceholder or mock API
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Convert mock data into quote objects (simulate server structure)
    return data.slice(0, 5).map(item => ({
      id: item.id,
      text: item.title,
      author: "Server Author",
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from localStorage
function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  return saved ? JSON.parse(saved) : [];
}

// Function to display notifications
function showNotification(message) {
  const note = document.getElementById("notification");
  const noteText = document.getElementById("notificationText");
  noteText.textContent = message;
  note.style.display = "block";

  setTimeout(() => {
    note.style.display = "none";
  }, 3000);
}

// Implementing data syncing with conflict resolution
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();

    if (serverQuotes && serverQuotes.length > 0) {
      const localQuotes = loadQuotes();
      const mergedQuotes = [];
      const conflicts = [];

      // Merge local and server data
      serverQuotes.forEach(serverQuote => {
        const localMatch = localQuotes.find(q => q.id === serverQuote.id);

        if (localMatch) {
          // Conflict detected — server version takes precedence
          if (localMatch.text !== serverQuote.text) {
            conflicts.push({
              local: localMatch,
              server: serverQuote
            });
          }
          mergedQuotes.push(serverQuote);
        } else {
          // New server quote not in local
          mergedQuotes.push(serverQuote);
        }
      });

      // Add any new local quotes that don't exist on the server
      localQuotes.forEach(localQuote => {
        const existsOnServer = serverQuotes.some(q => q.id === localQuote.id);
        if (!existsOnServer) mergedQuotes.push(localQuote);
      });

      // Save merged data locally
      quotes = mergedQuotes;
      saveQuotes();

      // Update UI (your existing functions)
      populateCategories();
      filterQuotes();

      // Notify user
      if (conflicts.length > 0) {
        showNotification(
          `Sync completed with ${conflicts.length} conflicts resolved (server data used).`
        );
      } else {
        showNotification("Quotes synced successfully with server!");
      }
    }
  } catch (error) {
    console.error("Error syncing quotes:", error);
    showNotification("Error syncing quotes. Please check your connection.");
  }
}

// Periodic syncing every 30 seconds
setInterval(syncQuotes, 30000);
