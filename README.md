# Tech Blog

Developing a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

# Port Piece README Info

* I WANT a CMS-style blog site SO I can publish articles, blog posts, and my thoughts and opinions
* WHEN the site is visited for the first time, THEN the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in are presented
* WHEN the homepage option is clicked on, THEN user is taken to the homepage
* WHEN any other links in the navigation are clicked on THEN a prompt to either sign up or sign in are given
* WHEN sign up is chosen, THEN a prompt to create a username and password is given
* WHEN the sign-up button is clicked, THEN user credentials are saved and user is logged into the site
* WHEN the site is revisited at a later time and sign in is chosen, THEN a prompt to enter username and password is given
* WHEN signed in to the site, THEN navigation links for the homepage, the dashboard, and the option to log out are seen
* WHEN the homepage option in the navigation is clicked, THEN the user is taken to the homepage and presented with existing blog posts that include the post title and the date created
* WHEN an existing blog post is clicked on, THEN the post title, contents, post creator’s username, and date created for that post as well as the option to leave a comment are presented
* WHEN a comment is entered and the submit button is clicked on while signed in, THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
* WHEN the dashboard option in the navigation is clicked on, THEN the user is taken to the dashboard and presented with any blog posts they have already created and the option to add a new blog post
* WHEN the button to add a new blog post is clicked on, THEN a prompt to enter both a title and contents for the blog post are presented
* WHEN the button to create a new blog post is clicked on, THEN the title and contents of the post are saved and the user is taken back to an updated dashboard with the new blog post
* WHEN an existing post in the dashboard is clicked on, THEN the user is able to delete or update the post and taken back to an updated dashboard
* WHEN the logout option in the navigation is clicked on, THEN the us is signed out of the site
* WHEN idled on the site for more than a set time THEN the user is able to view comments but prompted to log in again before they can add, update, or delete comments