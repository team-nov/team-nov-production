# VideoPage

## state

- userId [`String`]
    - id of user logged in
- userName [`String`]
    - _name of user logged in
- videoId  [`String`]
    - id of video
- message [`String`]
    - text in comment box
- comments [Array of `String`]
    - all comments of the video
- title [`String`]
    - title of video

## postComment

- submits the userId and message (via post request) to add a comment to the video

## updateComment

- updates the state's message
- params
  - e [Event]
    - Event object that holds user's text input