import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import ScreamHolder from "../util/ScreamHolder";

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getScreams,
};

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreams = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamHolder />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreams}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(home);
