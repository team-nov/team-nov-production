# DMsDemo

## state
- _id [`String`]
    - the id of the current user
- name [`String`]
    - the name of the current user
- email [`String`]
    - the email of the current user
- picture [`String`]
    - the url containing the current user's profile picture
- username [`String`]
    - the username of the current user
- typeOfUser [`String`]
    - the type of the current user
- aboutMe [`String`]
    - the description about the current user
- interests [Array of `String`]
    - the interests of the current user
- team [`String`]
    - the organization to which the current user belongs.
- allInterests [Array of `String`]
    - all the interests stored on the database
- allCompanies [Array of `String`]
    - all the companies stored on the database

## addInterest
- updates the interests state
- params
    - event [Event]
        - Event object that holds the users check input

## handleChange
- updates specified input field state
- params
  - event [Event]
    - Event object that holds user's text input

## handleSubmit
- submits the users profile information (via patch request)
- params
  - e [Event]
    - Event method that is used to prevent default action