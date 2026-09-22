
First Prompt:
    Record the following in `genAI_usage.md`, even if you did not use GenAI:
    1) The error you introduced
        Error.js
    2) Your prediction about what would happen
        Not entirely sure since I've never used JS before but I will guess a GET error by the page when it tries to load it.
    3) The browser's error message
        GET
    http://127.0.0.1:5500/favicon.ico
    [HTTP/1.1 404 Not Found 0ms]

	
    GET
	http://127.0.0.1:5500/favicon.ico
    Status
    404
    Not Found
    VersionHTTP/1.1
    Transferred150 B (150 B size)
    Referrer Policystrict-origin-when-cross-origin
    DNS ResolutionSystem

    4) How you located and repaired the problem
        Since I introduced the error, I know exactly where it is. The error that I introduced was "let error = import('./error.js'); console.log(error);" I repaired the problem by removing that line from my test.js file so the webpage no longer calls the error.


Second Prompt:
    Three examples that should pass:
    https://www.google.com
    https://www.colorado.edu
    https://www.googleMeet.com/meet

    Three examples that should fail:
    www$google/search.com
    <www.handshake.com>
    www>outlook.com/mail


Third Prompt:
    data-bs-toggle="modal" data-bs-target="#event_modal"
    This line tells boostrap which modal to open by its id.


Fourth Prompt:

    Table:

                        
    Selected Modality           Location Visible        Remote URL visible          Location required           Remote URL Required
    
    In Person:                      Yes                     No                          Yes                         No

    Remote:                         No                      Yes                         No                          Yes


Fifth Prompt:
    I used AI to help me with the structure of the saveEvent() function. It outlined the steps for the 9 bullet points listed.