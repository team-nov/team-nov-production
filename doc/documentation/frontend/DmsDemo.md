# DMsDemo

## state
- message [`String`]
    - message to be sent
- userId [`String`]
    - _id of sender
- toId  [`String`]
    - _id of the recipient
- profilePic [`String`]
    - url for the user's profile pic
- name [`String`]
    - user's name
- dmId [`String`]
    - selected dmId
- recipient [`String`]
    - User object of the recipient
- messages [Array of `String`]
    - messages of the current Dm
- dms [Array of `DM` objects]
    - all dms of the user
- showNewDM [`Boolean`]
    - default value: `false`
    - shows new dm interface when true
- createDMSuccess [`Boolean`]
    - default value: `true`
    - will display error message if false
- DMerrorMessage [`String`]
    - error message to display


## updateInput
- updates specified input field state
- params
    - property [String]
        - The string property to update
    - e [Event]
        - Event object to extract value from

## login
- fetches dms from backend using userId


## submitMessage
- Send message to server via socket


## getOldMessages
- Get mesages saved in the DB for a Dm

## createDM
- Create a new DM with a user

## selectDm
- Update dmId with the dm that the user selects
- params
    - id [`String`]
        - id of the selected dm

## scrollToBottom
- Scrolls to bottom of messages

## handleUserSuggestion
- validates if dm has been created already