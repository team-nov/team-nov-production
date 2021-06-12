# Dms

## GET
- Returns an array of all Users in the DB


## GET/:userId
- Returns a single user with _id of userId
- Params
    - `userId`
        - type : String
        - The _id of a User

## POST
- Creates a new user
- Body
    - `members`
        - type : Array of string
        - The _ids of the users in this dm
    - `messages`
        - type: Array of messages
        - messages sent by users (optional)


