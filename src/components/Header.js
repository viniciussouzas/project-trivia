import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  createImgUrl = () => {
    const { gravatarEmail } = this.props;
    const emailConverted = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${emailConverted}`;
    return url;
  };

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img
          src={ this.createImgUrl() }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
