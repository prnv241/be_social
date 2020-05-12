import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getScream, clearErrors } from "../redux/actions/dataActions";
import MyButton from "../util/button";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
  seperator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 30,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinner: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeperator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
};

const mapDispatchToProps = {
  getScream,
  clearErrors,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props;
    const newPath = `users/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={4}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="ProfilePic"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            varient="h5"
            to={`/user/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.seperator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
          </Typography>
          <hr className={classes.seperator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeperator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamDialog));
