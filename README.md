
**Technical Assesment**

**User Story:**

As Product Manager, I would like to manage users’ accesses to new features via feature switches,
i.e. enabling/disabling certain feature based on a user’s email and feature names).

**Requirements**
 1) _GET /feature?email=XXX&featureName=XXX_
  
  This endpoint receives email (user’s email) and featureName as request parameters and returns the following response in JSON format.


Example Response

  {  
         "canAccess": true|false (will be true if the user has access to the featureName
         
  }
  
  
  2) POST /feature
  
    This endpoint receives the following request in JSON format and returns an empty response with HTTP Status OK (200) when the database is updated successfully, otherwise returns HTTP status Not modified 304
    
    Example Request
    
    {
      featureName : "xxx",
      email: "xxx",
      enable: Yes|No
    }
