# Mongo-Scaper

Mongo scrapes articles from The Ny Times and displays them the information on the page. 

Live Site: https://immense-dawn-88488.herokuapp.com/



Technologies Used:
Node.js
Npm
Express
Mongo
CSS
Bootstrap

Install Instructions for local use:
clone repository with SSH using:
git clone https://github.com/YashuaB/Mongo-Scaper.git
Install the dependencies stated in the package.JSON file by:
npm install
Congrats! The app is now ready to use!
How does it work?
User can save articles or add a comment to the aricle. Articles and comments are being saved at mongo database and queried and updated with mongoose. To scrape new articles user will click on SCRAPE NEW button and to remove all click on CLEAR ALL.