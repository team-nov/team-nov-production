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

## updateInput

- updates the state's message
- params
  - e [Event]
    - Event object that holds user's text input

## addDiscussion

- creates a discussion post with the users message content (via post request)
- params
  - None
