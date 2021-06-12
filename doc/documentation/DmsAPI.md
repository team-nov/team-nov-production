# Dms

## GET
- Returns an array of all DMs in the DB


## GET/:dmId
- Returns a single dm with _id of dmId
- Params
    - `dmId`
        - type : String
        - The _id of a User

## GET/byUserId/:userId
- Returns all dms that contain userId in members
- Params
    - `userId`
        - type : String
        - The _id of a User

## POST
- Creates a new Dm
- Body
    - `members`
        - type : Array of string
        - The _ids of the users in this dm
    - `messages`
        - type: Array of messages
        - messages sent by users (optional)

## PATCH/:dmId
- Updates the specified dm with new valus
- Params
    - `dmId`
        - type : String
        - The _id of a User
- Body
    - Key value pair of fields to be updated

## POST/messages/
- Adds a new message to dm with _id of dmId
- Body
    - `dmId`
        - type : String
        - The _id of the dm to add the message to
    - `from`
        - type : String
        - The _id of the user sending the message
    - `message`
        - type : String
        - The message send by the user

## DELETE/messages/
- Deletes a message from dm with _id of dmId
- Body
    - `dmId`
        - type : String
        - The _id of the dm to delete the message from

## DELETE
- Deletes a dm with _id of dmId
- Body
    - `dmId`
        - type : String
        - The _id of the dm to delete


