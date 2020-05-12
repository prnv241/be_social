import React, { Component } from "react";
import MyButton from "../util/button";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBoarder from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBoarder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBoarder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
