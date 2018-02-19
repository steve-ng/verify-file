import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import * as uploadActions from 'actions/uploadActions';

class UploadedFilePage extends React.Component {
  componentDidMount() {
    this.props.uploadActions.getUploadedFile();

    const { ethState = {} } = this.props;
    const { address } = ethState;
    if (address == null) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { uploadState = {} } = this.props;
    const { uploadedFilesState = {} } = uploadState;
    const { files = [] } = uploadedFilesState;

    return (
      <div className="flex flex-center flex-wrap">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Uploaded Date</TableCell>
                <TableCell>File Name</TableCell>
                <TableCell>File Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => {
                const uploadDate = moment(file.uploadDate).format('MMMM Do YYYY, h:mm:ss a');
                return (
                  <TableRow key={`${file.hash}-${file.uploadDate}`}>
                    <TableCell> {uploadDate} </TableCell>
                    <TableCell> {file.name} </TableCell>
                    <TableCell> {file.hash} </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        {files.length === 0 && (
          <div className="flex flex-center flex-wrap pt-10">
            You have not uploaded any file hash yet. Go&nbsp;
            <Link to="/upload">here</Link> &nbsp;to upload.
          </div>
        )}
      </div>
    );
  }
}

UploadedFilePage.propTypes = {
  ethState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  uploadActions: PropTypes.object.isRequired,
  uploadState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ethState: state.ethState,
    uploadState: state.uploadState,
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
)(UploadedFilePage);
