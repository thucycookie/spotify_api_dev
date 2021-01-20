# spotify_api_dev

cd into the folder and run npm start

The program is run on port 3000, so make sure port 3000 is open.

When configuring the callback URL, make sure to format the link in the same in .env, /callback route in the routes/index.js file and Spotify's allowed URLs list in the developer console. 

For example: if random_url.com/callback is in .env but in Spotify's allowed URLs list is formatted as random_url.com/callback/, then we will get an INVALID_REDIRECT_URI.

Config file:
.env stores credentials that allow the SDK to make API call to an app instance in the Spotify Developer Console.

Entry endpoints:
+ /login -> redirects to Spotify's authorization page.

Some possible issues with view engines:
+ Some files in views are in jade but we set the view engine to be ejs, so when go to some endpoints like /, we will get errors due to the fact that the view file for / endpoint is jade!

Demo Video: https://youtu.be/54L9uSS-cG8
