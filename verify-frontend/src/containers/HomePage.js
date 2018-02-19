import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';

class HomePage extends React.Component {
  componentWillMount() {
  }

  render() {
    const { ethState = {} } = this.props;
    const { address } = ethState;
    const metaMaskUp = address !== null;

    return (
      <div className="pt-20">
        <div className="flex">

          <Card className="flex flex-wrap m-20 flex-center">
            <CardHeader title="Upload File Hash" subheader="Your file will not be uploaded" />
            <CardContent>
              <div className="flex flex-wrap flex-center">
                <div className="p-10">
                  Select a file and we will generate and upload the hash to the ethereum network.
                  It will be a proof that this file exist at the time you upload.
                  <span className="bold"> Your file will not be uploaded. </span>
                </div>
                {metaMaskUp ? (
                  <div className="cursor-pointer blue pt-20">
                    <Button onClick={() => this.props.history.push('/upload')} variant="raised" color="primary">
                      Start now
                    </Button>
                  </div>
                ) : (
                  <div className="red"> Login to metamask to get started. </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-wrap  m-20 flex-center">
            <CardHeader title="View Uploads" subheader="View your uploaded file hashes" />
            <CardContent>
              <div className="flex flex-wrap flex-center">
                <div className="p-10">
                  If you have uploaded any file hash, you can view the list of uploaded files. Or you can select your own file
                  and compare against the file hash you have uploaded previously (coming soon).
                </div>
                {metaMaskUp ? (
                  <div className="cursor-pointer blue pt-20">
                    <Button onClick={() => this.props.history.push('/files')} variant="raised" color="primary">
                      View uploaded file hash
                    </Button>
                  </div>
                ) : (
                  <div className="red"> Login to metamask to get started. </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  ethState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ethState: state.ethState,
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
