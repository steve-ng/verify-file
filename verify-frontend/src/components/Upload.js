import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const Upload = (props) => {
  const { dropMessage = '', onDrop } = props;

  return (
    <Dropzone onDrop={onDrop} accept=".pdf" className="dropzone" multiple={false}>
      <div className="flex flex-wrap flex-center p-10">
        <div className=""> {dropMessage} </div>
        <div className="pt-20 bold"> We only accept .pdf for now </div>
      </div>
    </Dropzone>
  );
};

Upload.propTypes = {
  onDrop: PropTypes.func.isRequired,
  dropMessage: PropTypes.string,
};

Upload.defaultProps = {
  dropMessage: '',
};

export default Upload;
