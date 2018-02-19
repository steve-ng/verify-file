import SparkMD5 from 'spark-md5';
import moment from 'moment';
import * as HashContract from 'utils/hashContract';
import { push } from 'react-router-redux';

export const SET_FILE = 'SET_FILE';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const RESET_UPLOAD_FILE_STATE = 'RESET_UPLOAD_FILE_STATE';
export const GET_FILE_REQUEST = 'GET_FILE_REQUEST';
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS';

export const setFile = (file) => ({
  type: SET_FILE,
  file,
});

export const onDropFiles = (files) => (dispatch) => {
  const reader = new FileReader(); /* eslint-disable-line */
  const file = files[0];

  reader.onload = (event) => {
    const hash = SparkMD5.hash(event.target.result);
    const formattedFile = {
      lastModified: file.lastModified,
      name: file.name,
      hash,
      type: file.type,
    };

    dispatch(setFile(formattedFile));
  };

  reader.readAsDataURL(file);
};

export const uploadFileRequest = () => ({
  type: UPLOAD_FILE_REQUEST,
});

export const uploadFileSuccess = (txnHash) => ({
  type: UPLOAD_FILE_SUCCESS,
  txnHash,
});

export const resetUploadFileState = () => ({
  type: RESET_UPLOAD_FILE_STATE,
});

export const uploadFile = (file) => (dispatch, getState) => {
  const { ethState } = getState();
  const { address = '' } = ethState;

  dispatch(uploadFileRequest());
  HashContract.addUserFile(file.name, file.hash, address)
    .on('transactionHash', hash => {
      dispatch(uploadFileSuccess(hash));
    })
    .on('receipt', (/* receipt */) => {
      dispatch(push('/files'));
    });
};

export const getFileRequest = () => ({
  type: GET_FILE_REQUEST,
});

export const getFileSuccess = (files) => ({
  type: GET_FILE_SUCCESS,
  files,
});

export const getUploadedFile = () => (dispatch, getState) => {
  const { ethState } = getState();
  const { address = '' } = ethState;

  dispatch(getFileRequest());

  HashContract.getUserHashFile(address).then((result, error) => { /* eslint-disable-line */
    const total = result[0].length;
    const files = [];
    for (let i = 0; i < total; i += 1) {
      const file = {
        uploadDate: moment(parseInt(result[0][i], 10)),
        name: web3.toAscii(result[1][i]), /* eslint-disable-line */
        hash: web3.toAscii(result[2][i]), /* eslint-disable-line */
      };

      files.push(file);
    }

    dispatch(getFileSuccess(files));
  });
};
