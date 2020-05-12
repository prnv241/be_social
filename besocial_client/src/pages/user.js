import React, { Component } from "react";
import axios from "axios";
import Scream from "../components/Scream";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/StaticProfile";
import ScreamHolder from "../util/ScreamHolder";
import ProfileHolder from "../util/ProfileHolder";

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapDispatchToProps = {
  getUserData,
};

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId)
      this.setState({
        screamIdParam: screamId,
      });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screamIdParam } = this.state;
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <ScreamHolder />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileHolder />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(user);
