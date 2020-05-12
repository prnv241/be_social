import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../util/button';


const styles = (theme) => ({
  button: {
    float: 'right'
  }
})

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

const mapDispatchToProps = {
  editUserDetails
}

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  stateUserDetails = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    });
  }

  componentDidMount() {
    const { credentials } = this.props;
    this.stateUserDetails(credentials)
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.stateUserDetails(this.props.credentials);
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color="primary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="A short bio about yourself" className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth />
              <TextField name="website" type="text" label="Website" placeholder="Your Personal/Professional website" className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth />
              <TextField name="location" type="text" label="Location" placeholder="Your current location" className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails));
