# Company

## GET

- Returns an array of all companies in the DB

## GET/:companyId
- Returns a single company with _id of companyId
- Params
    - `companyId`
        - type : String
        - The _id of a Company

## POST

- Creates a new company
- Body
  - `companyId`
    - type : String
    - The \_id of the company
  - `company`
    - type : String
    - The name of the company
  - `companyLogo`
    - type : String
    - The logo of the company
  - `companyLocation`
    - type : String
    - The location of the company
  - `companyDescription`
    - type : String
    - The description of the company
