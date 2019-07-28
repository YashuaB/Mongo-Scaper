
# Mongo-Scaper
Mongo scrapes articles from The Ny Times and displays them the information on the page. 

## Demo

Demo of app: [Mongo-Scraper](https://immense-dawn-88488.herokuapp.com/)

## Built With
*Node.js
*CSS
*Bootstrap
### Prerequisites
Things you need to install the software and how to install them

```
Node.js
Mongo
```
### Installing
To run the application locally, first clone this repository with the following command.
```
git clone https://github.com/YashuaB/Mongo-Scaper.git
```
Next, install the application dependencies.

```
cd Mongo-Scraper
npm install
```

Start the Mongo server 
```
mongod
mongo
```
Then run command
```
node server.js
```
Now, open the local application on port 3000 at the URL: http://localhost:3000/.

Congrats! The app is now ready to use!

How does it work?

User can save articles or add a comment to the aricle. Articles and comments are being saved at mongo database and queried and updated with mongoose. To scrape new articles user will click on SCRAPE NEW button and to remove all click on CLEAR ALL.