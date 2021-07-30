# Discussions

## GET
- Returns an array of all Discussions stored in the database.

## GET/:discussionId
- Returns a single discussion with _id of discussionId
- Params
    - `discussionId`
        - type : String
        - The _id of the discussion

## POST
- Creates a new Discussion post
- Body
    - `message`
        - type : String
        - The message to be posted
    - `userId`
        - type: String
        - The _id of the user creating the post
    - `imageURL`
        - The URL of an image uploaded to discussion

## POST/:discussionId
- Creates a new comment in the discussion with _id of discussionId
- Params
    - `discussionId`
        - type: String
        - The _id of the discussion
- Body
    - `userId`
        - type: String
        - The _id of the user commenting
    - `message`
        - type: String
        - The comment message to be posted

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
        - The userId of the user who created the discussion post

## PATCH/:discussionId
- Updates the message of the specified comment in the discussion with _id of discussionId
- Params
    - `discussionId`
        - type: String
        - The _id of the discussion
- Body
    - `commentId`
        - type: String
        - The _id of the comment to update
    - `message`
        - type: String
        - The new comment message
        
## DELETE
- Deletes a discussion with _id of discussionId, if userId matches
- Body
    - `discussionId`
        - type : String
        - The _id of the discussion to delete
    - `userId`
        - type: String
        - The userId of the user who created the discussion post

## DELETE/:discussionId
- Deletes a comment from the discussion with _id of discussionId
- Params
    - `discussionId`
        - type: String
        - The _id of the discussion
- Body
    - `commentId`
        - type: String
        - The _id of the comment to delete
