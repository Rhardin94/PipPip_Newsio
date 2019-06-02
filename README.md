# PipPip_Newsio 
## Overview
    PipPip_Newsio is a cheerio-powered news scraping app that interacts with MongoDB to bring the user the latest news. It allows the user to scrape for the latest articles and save articles that they don't wish to be deleted over prolonged use. It also allows the user to leave notes on each article sharing their thoughts and feelings about each story. Each article also contains a link to its site of origin.
## Tech
 This app utilizes:
 * [MongoDB](https://www.mongodb.com/)
 * [Express](https://www.npmjs.com/package/express)
 * [Mongoose](https://www.npmjs.com/package/mongoose)
 * [Cheerio](https://www.npmjs.com/package/cheerio)
 * [Axios](https://www.npmjs.com/package/axios)
 * [Handlebars](https://www.npmjs.com/package/handlebars)
## How to use

Upon first visiting the site, the user is directed to the homepage

![homepage](/assets/images/homepage.jpg)

If no articles are currently saved to mongo, the page with inform the user to scrape for new articles

![articles box telling the user it contains no articles](/assets/images/noarts.jpg)

The user may then scrape for the latest stories via the 'Scrape New Articles Button'

![scrape new articles button](/assets/images/scrape.jpg)

Once the app has completed its scrape, the articles will be displayed in the articles field within individual cards

![article with headline, summary, and save article button](/assets/images/article.jpg)

If the user wishes to save the article from being deleted, they may click the save article button to protect it

![save article button](/assets/images/saveart.jpg)

If the user has finished reading the initial scrape, they can clear the page of all unprotected articles via the clear articles button

![clear articles button](/assets/images/clear.jpg)

Finally, if the user wishes to interact with their saved articles further, they may navigate to the saved articles page via the 'Saved Articles' button

![saved articles button](/assets/images/saved.jpg)
___

Upon initial viewing of the saved articles page, the user will see only the cards containing articles saved on the previous page

![saved articles card with un-save button and notes button](/assets/images/savedart.jpg)

If the user wishes to no longer protect the article, they may click the Un-save article button to allow it to be deleted later.

![un-save article button](/assets/images/unsave.jpg)

The user may also view/leave notes for each article via the 'notes' button

![notes button](/assets/images/getnotes.jpg)

Upon clicking the notes button, the user is presented with a modal that contains previous notes (if any) as well as form to leave new notes

![notes modal](/assets/images/notesmodal.jpg)

If the user wishes to add a new note, they may fill out the required fields and hit the save note button to attach it to the saved article for later viewing

![save note button](/assets/images/savenote.jpg)

Finally, if the user has saved multiple articles and wishes to remove them all at once, they may hit the 'Clear Saved Articles Button to empty the saved articles page of content.

![clear saved articles button](/assets/images/clearsaved.jpg)

Once the user has finished interacting with the saved articles page, they can navigate back to the home page to continue the news cycle if they so chose.

![all articles button](/assets/images/allart.jpg)