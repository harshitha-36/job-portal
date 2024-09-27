import { Grid, Typography } from "@material-ui/core";
import videobg from '../play/video2.mp4'

const Welcome =() => {
  return (
    <div className='welcome'>
      <video src ={videobg} autoPlay loop muted type="video/mp4" />
    </div>
  )
}
export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;