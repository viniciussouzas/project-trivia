import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  createImgUrl = () => {
    const { email } = this.props;
    const emailConverted = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${emailConverted}`;
    return url;
  };

  render() {
    const { name } = this.props;
    return (
      <div>
        <img
          src={ this.createImgUrl() }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.gameReducer.name,
  email: state.gameReducer.email,
});

export default connect(mapStateToProps)(Header);
