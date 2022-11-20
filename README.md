# WHP SCRAPER
 
## About
 
This website scraper uses an Express JS server and Cheerio to scrape The Warehouse Project events page taking information such as event names, dates and lineups then pushes the information to a Firestore database.
 
## Usage
 
To run the code for console logs:
```
npm start
```
 
To connect to Firebase, a Service Account Key will need to be downloaded from the Firestore console and added into the file system with the file name in a .gitignore file.
 
To make a GET request from Firestore, please use the following format:
 
```
GET REQUEST FROM DATABASE
 
let dates = db.collection("dates");
dates.get().then((querySnapshot) => {
  querySnapshot.forEach((document) => {
    console.log(document.data());
  });
});
```