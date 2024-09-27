import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Feedback = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [feedbackDetails, setFeedbackDetails] = useState({
    filteringProcessFeedback: "",
    improvementSuggestions: "",
    jobPostingNotifications: "",
    personalRecommendations: "",
    userInterfaceExperience: "",
  });

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted

    const getFeedback = async () => {
      try {
        const response = await axios.get(apiList.feedback, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (isMounted) {
          setFeedbackDetails(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setPopup({
            open: true,
            severity: "error",
            message: "Error fetching feedback details",
          });
        }
      }
    };

    getFeedback();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [setPopup]);

  const handleInput = (key, value) => {
    setFeedbackDetails({
      ...feedbackDetails,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedFeedbackDetails = {};
      for (const key in feedbackDetails) {
        if (feedbackDetails[key]) {
          updatedFeedbackDetails[key] = feedbackDetails[key];
        }
      }

      if (Object.keys(updatedFeedbackDetails).length === 0) {
        setPopup({
          open: true,
          severity: "error",
          message: "No feedback fields provided for update",
        });
        return;
      }

      await axios.put(apiList.feedback, updatedFeedbackDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPopup({
        open: true,
        severity: "success",
        message: "Feedback updated successfully!",
      });
    } catch (err) {
      setPopup({
        open: true,
        severity: "error",
        message: "Error updating feedback",
      });
    }
  };

  return (
    <Grid container item direction="column" alignItems="center" style={{ padding: "30px", minHeight: "93vh" }}>
      <Grid item>
        <Typography variant="h2">Feedback</Typography>
      </Grid>
      <Grid item xs style={{ width: "100%" }}>
        <Paper style={{ padding: "20px", outline: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Grid container direction="column" alignItems="stretch" spacing={3}>
            {Object.keys(feedbackDetails).map((key) => (
              <Grid item key={key}>
                <TextField
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  value={feedbackDetails[key]}
                  onChange={(event) => handleInput(key, event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px", marginTop: "30px" }}
            onClick={handleUpdate}
          >
            Update Feedback
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Feedback;
