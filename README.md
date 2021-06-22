# moneyLion
Technical Assessment
User story:
As Product Manager, I would like to manage users’ accesses to new features via feature switches,
i.e. enabling/disabling certain feature based on a user’s email and feature names).
Requirements:
GET /feature?email=XXX&featureName=XXX
This endpoint receives email (user’s email) and featureName as request parameters and
returns the following response in JSON format.
Example Response:
POST /feature
This endpoint receives the following request in JSON format and returns an empty
response with HTTP Status OK (200) when the database is updated successfully, otherwise
returns H
