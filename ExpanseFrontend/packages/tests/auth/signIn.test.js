import { createRoot } from "react-dom/client"
import { beforeEach, afterEach } from "jest"
let container = null
let root = null

beforeEach(() => {
  if (typeof window !== "undefined") {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
    let root = createRoot(container) // createRoot(container!) if you use TypeScript
    root.render(<div>hello</div>)
  }
})

afterEach(() => {
  // cleanup on exiting
  root.unmount()
  container.remove()
  container = null
})

// Test Validations
// Reject invalid formats

// Test Process Flow / Integration Tests
// See errors when an input is input improperly after submit has been pressed
// Able to switch screens when pushing reset and forgot password
// on value change: submit is re-enabled if it was disabled
// on successful submit press without validation error: loading spinner process id added
// on successful submit press without validation error: submit sign in is called
// on backend success: See snackbar success message
// on backend success: exitAuth handler is called
// on backend success: password is cleared
// on backend success: Redirect to home page
// on backend error: Snackbar error message
// on backend error: screen does not change
// on backend error: input becomes disabled

// UI Element presence

// UI Element State
// on submit button press with error: submit button becomes disabled
// on form values fixed and resubmit with valid data: submit button becomes enabled

// THE SCREEN APPEARS AS EXPECTED. UI ELEMENTS ARE PRESENT
// See Username field
// See Password field
// See Submit Button
// See title

// USERS ARE ABLE TO SUCCESSFULLY SIGN IN
// USERS ARE PREVENTED FROM LOGGING IN WITH ERRORS

// (future/additional options)
// Layout/Elements fit in their container
// Analytics events registered
