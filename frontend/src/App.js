import { Grid, makeStyles } from "@material-ui/core";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Applications from "./component/Applications";
import Feedback from "./component/Feedback";
import Home from "./component/Home";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Navbar from "./component/Navbar";
import Profile from "./component/Profile";
import Signup from "./component/Signup";
import Welcome, { ErrorPage } from "./component/Welcome";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import CreateJobs from "./component/recruiter/CreateJobs";
import JobApplications from "./component/recruiter/JobApplications";
import MyJobs from "./component/recruiter/MyJobs";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import { userType } from "./lib/isAuth";

// Styles for the app layout
const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

// Creating a context for Popup messages
export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();

  // Popup state management for alerts and notifications
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          {/* Navbar at the top */}
          <Grid item xs>
            <Navbar />
          </Grid>

          {/* Main content */}
          <Grid item className={classes.body}>
            <Switch>
              {/* Define your routes for each page */}
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/feedback">
                <Feedback />
              </Route>
              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              {/* Catch-all route for 404 pages */}
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>

        {/* Popup component for showing messages */}
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
