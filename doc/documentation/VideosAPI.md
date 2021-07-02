# Videos

## GET
- Returns an array of all videos in the DB


## GET/:videoId
- Returns a single video with _id of videoId
- Params
    - `videoId`
        - type : String
        - The _id of the video

## GET/Search/:query
- Return video whose titles match query
- Params
    - `query`
        - type : String
        - The search query

## POST
- Creates a new video
- Params
    - `videoId`
        - type : String
        - The _id of the video
- Body
    - `title`
        - type : String
        - The title of the video
    - `messages`
        - type: Array of messages
        - messages sent by users (optional)
        
## POST/:videoId
- Creates a new comment in a video with _id of videoId
- Body
    - `userId`
        - type : String
        - The _id of the user
    - `userName`
        - type: String
        - The user's username
    - `message`
        - type: String
        - The user's message

## DELETE/
- Deletes a video with _id of videoId
- Body
    - `videoId`
        - type : String
        - The _id of the video to delete
        
## DELETE/:videoId
- Deletes a comment from a video with _id of videoId
- Params
    - `videoId`
        - type : String
        - The _id of the video
- Body
    - `commentId`
        - type : String
        - The _id of the comment to delete

## PATCH/
- Updates the specified video with a new title
- Body
    - `videoId`
        - type : String
        - The _id of the video
    - `title`
        - type : String
        - The title of the video to be updated

## PATCH/:videoId
- Updates the specified video with a new title
- Params
    - `videoId`
        - type : String
        - The _id of the video
- Body
    - `commentId`
        - type : String
        - The _id of the comment
    - `message`
        - type : String
        - The comment of the video to be updated
