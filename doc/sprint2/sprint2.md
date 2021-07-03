**Sprint Goal**

Our goal for this sprint is to complete the following stories:

As a user, I want to be able to search for videos by video title, so that I can find the videos im looking for (TNOV-61)

* COS
    * User can search for videos by video title
    * Users can view search results
    * Users can click on a video result to watch that video
* Subtasks
    * Get videos based on search query
    * Display search results

As a registered user, I want to be able to modify my information so that it better represents me. (TNOV-50)

* COS:
    * A user can modify their profile information that has been stored on the database.
* Subtasks:
    * Allow modification of registration information (i.e. email, username, password, picture url, etc)

As a registered user, I want to be able to login so that the website knows who I am. (TNOV-68) 

* COS:
    * Website knows who the logged in user is.
* Subtasks:
    * Allow user to input their username and password and have the website store it.

As a user, I want to be able to create a profile, so that I can receive personalized recommendations. (TNOV-24)

* COS:
    * Users are able to pick their interest
* Subtasks:
    * Modify backend to store interest tags for users, and allow user to select video tags.

As a user, I want there to be a homepage for videos that I can visit (TNOV-66)

* COS:
    * A homepage for the videos
    * User can view the videos homepage
* Subtasks:
    * I can view the contents of the videos homepage

As a user, I want to be able to modify and delete comments on e-learning videos that I have previously posted. (TNOV-64) 

* COS
    * User can delete a video comment and have it removed from the video comments section permanently
    * User can edit a video comment and have it updated on the video comments section permanently
* Subtasks
    * Create the frontend components to modify and delete the video comments
    * Connect the frontend to the backend of video comments
    * Refactor backend code with async functions and validate database errors

As a user, I want to be able to comment, and view users' comments on discussion posts to interact with them and build relationships (TNOV-57)

* COS
    * User can click a button to add to the comments on a discussion post
    * User can see recent comments as well as their own when they have commented
    * User can find their comment on a discussion post, and edit or delete by clicking a button
    * User can see the update after processing
* Subtasks
    * Create comments field frontend components to enable comments entry
    * Create necessary frontend components to show reasonable number of comments
    * Create necessary backend components to store comments linked to discussions
    * Create appropriate buttons/controls on discussion post to enable editing/deleting of comments on discussion posts
    * Create appropriate backend methods to enable editing/deleting comments on discussion posts

As a user, I want to be able to edit and delete my discussion post so that it may reflect a change of mind. (TNOV-67)

* COS
    * User can edit their own discussion post and instantly show the change globally
    * User can delete their down discussion post and instantly show the change globally
* Create appropriate buttons on a discussion post to enable editing/deleting the discussion post itself
* Create appropriate backend methods to enable editing/deleting the discussion post itself
* Subtasks:
    * Create frontend components to enable editing the post
    * Create frontend component to delete the post
    * Create backend component to edit the message of the discussion post
    * Create backend component to remove the discussion post from the database

**Spikes**

* As a user, I want to be able to search for videos by video title, so that I can find the videos im looking for (TNOV-61)
    * Figuring out how to implement the search functionality
* As a registered user, I want to be able to login so that the website knows who I am. (TNOV-68) 
    * Have to research how to implement login securely 

**Team capacity**

* 140 hours (10 hours per week * 2 weeks * 7 members) 

**Participants**

* Colin Lin
* Mitravasu Prakash
* Shammo Talukder
* Simon Chau
* Ka Fai Yuen
* Brandon Lo
* Jahin Promit