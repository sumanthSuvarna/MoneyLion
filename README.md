
**Technical Assesment**

**User Story:**

As Product Manager, I would like to manage users’ accesses to new features via feature switches,
i.e. enabling/disabling certain feature based on a user’s email and feature names).

**Requirements**
  _GET /feature?email=XXX&featureName=XXX_
  
  This endpoint receives email (user’s email) and featureName as request parameters and returns the following response in JSON format.


Example Response
_  {
  "canAccess": true|false (will be true if the user has access to the featureName
  }_
