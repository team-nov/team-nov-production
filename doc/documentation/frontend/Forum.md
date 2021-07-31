# Forum

## state

- userId [`String`]
  - the userId of the logged in user
- picture [`String`]
  - the link to the picture of the logged in user
- name [`String`]
  - the name of the logged in user
- message [`String`]
  - the content to be posted in a discussion
- discussions [`Array`]
	- the discussions stored in the database
- image [`Object`]
	- the image to be uploaded to the discussion

## handleChange

- updates the state's image whenever an image is chosen by user
- params
  - None

## updateInput

- updates the state's message
- params
  - e [Event]
    - Event object that holds user's text input

## postDiscussion

- a helper function for posting a discussion via post request to the database along with an image URL if there exists one
- params
  - imageURL
    - The URL of an image uploaded to the discussion
    
## addDiscussion

- creates a discussion post with the users message content and upload an image to Firebase storage if there exists one
- params
  - None
