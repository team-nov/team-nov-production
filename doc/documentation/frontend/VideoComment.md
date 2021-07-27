# VideoComment

## state

- userId [`String`]
    - id of user logged in
- videoId  [`String`]
    - id of video
- commentId  [`String`]
    - id of comment
- username  [`String`]
    - username of user logged in
- picture  [`String`]
    - picture url of user logged in
- currentMessage  [`String`]
    - text message in comment box
- returnMessage  [`String`]
    - comment message after edit/post
- postTime  [`String`]
    - time of post
- edited  [`Boolean`]
    - true if comment has been edited, false o/w
- editing [`Boolean`]
    - true if user is editing comment, false o/w
- isHidden [`Boolean`]
    - true if comment is hidden (after deletion), false o/w

## deleteComment

- submits the commentId (via delete request) to remove a comment from the video

## submitComment

- submits the commentId and message (via patch request) to edit a comment in the video

## editComment

- changes editing state to true

## discardComment

- changes editing state to false and changes currentMessage back to returnMessage

## updateComment

- updates the state's currentMessage
- params
  - e [Event]
    - Event object that holds user's text input