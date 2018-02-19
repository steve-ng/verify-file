/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Route, withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';

import HomePage from 'containers/HomePage';
import UploadPage from 'containers/UploadPage';
import UploadedFilePage from 'containers/UploadedFilePage';
import * as ethActions from 'actions/ethActions';

class Routes extends React.Component {
  componentWillMount() {
    this.props.ethActions.initialize();
  }

  render() {
    const { ethState } = this.props;
    const { address } = ethState;

    return (
      <div>

        <div className="flex flex-center flex-wrap">
          <div className="flex flex-wrap flex-center pv-20">
            <div className="flex flex-wrap flex-center">

              <Typography variant="display4"> Verify File </Typography>
              <div className="flex flex-center">
                <Typography variant="subheading">
                  Upload your file hash on the ethereum block chain as a proof that this file exist at this timestamp.
                </Typography>
              </div>
            </div>
          </div>

          {address && (
            <div className="flex flex-center">
              <NavLink exact to="/" activeClassName="blue">Home</NavLink>
              <span className="ph-10"> {' | '} </span>
              <NavLink to="/upload" activeClassName="blue">Upload</NavLink>
              <span className="ph-10"> {' | '} </span>
              <NavLink to="/files" activeClassName="blue">My Uploads</NavLink>
            </div>
          )}

          <div className="flex flex-center pt10 pb-40">
            {address ? (
              <div>
                <Typography variant="caption"> Metamask connected, address: {address} </Typography>
              </div>
            ) : (
              <div className="red">
                Metamask not connected, this website requires metamask to be set-up.
              </div>
            )}
          </div>
        </div>

        <Route exact path="/" component={HomePage} />
        <Route exact path="/upload" component={UploadPage} />
        <Route path="/files" component={UploadedFilePage} />

      </div>
    );
  }
}


Routes.propTypes = {
  ethActions: PropTypes.object.isRequired,
  ethState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ethState: state.ethState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ethActions: bindActionCreators(ethActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes));
