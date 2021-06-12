# Discussions

## GET
- Returns an array of all Discussions stored in the database.


## GET/:discussionId
- Returns a single discussion with _id of discussionId
- Params
    - `discussionId`
        - type : String
        - The _id of the Discussion

## POST
- Creates a new Discussion post
- Body
    - `message`
        - type : String
        - The message to be posted
    - `userId`
        - type: String
        - The _id of the person creating the post

## PATCH
- Updates the specified discussion with new message, if userId matches
- Body
    - `discussionId`
        - type : String
        - The _id of the Discussion
    - `message`
        - type: String
        - The new message
    - `userId`
        - type: String
        - The userId of the person who created the discussion post

## DELETE
- Deletes a discussion with _id of discussionId, if userId matches
- Body
    - `discussionId`
        - type : String
        - The _id of the discussion to delete
    - `userId`
        - type: String
        - The userId of the person who created the discussion post
