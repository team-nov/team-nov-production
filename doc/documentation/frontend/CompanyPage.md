# CompanyPage

## state

- company [`String`]
  - the name of the company
- companyLogo [`String`]
  - the logo of the company
- companyLocation [`String`]
  - the location of the company
- companyDescription [`String`]
  - the description of the company

## onChange

- updates specified input field state
- params
  - event [Event]
    - Event object that holds user's text input

## onSubmit

- submits the users company information (via post request)
- params
  - e [Event]
    - Event method that is used to prevent default action
