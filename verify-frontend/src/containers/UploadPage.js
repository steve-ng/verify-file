import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';

import * as uploadActions from 'actions/uploadActions';
import Upload from 'components/Upload';

class UploadPage extends React.Component {
  componentDidMount() {
    this.onDrop = this.onDrop.bind(this);
    this.uploadFilesToChain = this.uploadFilesToChain.bind(this);
  }

  componentWillUpdate() {
    const { ethState = {} } = this.props;
    const { address, requestingAddress } = ethState;
    if (!requestingAddress && !address) {
      this.props.history.replace('/');
    }
  }

  componentWillUnmount() {
    this.props.uploadActions.setFile(null);
    this.props.uploadActions.resetUploadFileState();
  }

  onDrop(acceptedFiles) {
    this.props.uploadActions.onDropFiles(acceptedFiles);
  }

  uploadFilesToChain() {
    const { uploadState } = this.props;
    const { file = {} } = uploadState;
    this.props.uploadActions.uploadFile(file);
  }

  render() {
    const { uploadState } = this.props;
    const { file = {}, uploadingFileState = {} } = uploadState;
    const { isUploading = false, txnHash } = uploadingFileState;

    const message = `Click here or drop the file you wish to upload here. Tile will not be uploaded to
                    the block chain, we are only generating the hash and upload the file to the chain.
                    If the file name is more than 16 characters long, we will truncate it.`;
    return (
      <div className="mh-200">
        <div>
          <Upload onDrop={(files) => this.onDrop(files)} dropMessage={message} />
        </div>
        {file.name && (
          <div className="flex flex-wrap flex-center p-10">
            <div className="flex flex-center bold">
              File name: {file.name}
            </div>
            {isUploading && (
              <div className="flex flex-center center pt-10">
                <CircularProgress /> <span className="pl"> Waiting for meta mask transaction.</span>
              </div>
            )}
            {txnHash && (
              <div>
                Transaction created! Please check <a href={`https://etherscan.io/tx/${txnHash}`} target="_blank"> here  </a> for the progress. You may go
                <Link to="/files"> here </Link> to view your upload once the block is mined.
              </div>
            )}

            {!txnHash && !isUploading && (
              <div className="flex flex-center pt-10">
                <Button onClick={this.uploadFilesToChain} variant="raised" color="primary">
                  Upload to ethereum block chain
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

UploadPage.propTypes = {
  ethState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  uploadActions: PropTypes.object.isRequired,
  uploadState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    uploadState: state.uploadState,
    ethState: state.ethState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadActions: bindActionCreators(uploadActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadPage);

