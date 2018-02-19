import { combineReducers } from 'redux';

import * as actions from 'actions/uploadActions';

const uploadState = () => {
  const file = (state = {}, action) => {
    switch (action.type) {
      case actions.SET_FILE: {
        return {
          ...action.file,
        };
      }
      default:
        return state;
    }
  };

  const uploadedFilesState = (state = {}, action) => {
    switch (action.type) {
      case actions.GET_FILE_REQUEST: {
        return {
          isFetching: true,
          files: [],
        };
      }
      case actions.GET_FILE_SUCCESS: {
        return {
          isFetching: false,
          files: action.files,
        };
      }
      default:
        return state;
    }
  };

  const uploadingFileState = (state = {}, action) => {
    switch (action.type) {
      case actions.UPLOAD_FILE_REQUEST: {
        return {
          isUploading: true,
          txnHash: null,
        };
      }
      case actions.UPLOAD_FILE_SUCCESS: {
        return {
          isUploading: false,
          txnHash: action.txnHash,
        };
      }
      case actions.SET_FILE:
      case actions.RESET_UPLOAD_FILE_STATE: {
        return {
          isUploading: false,
          txnHash: null,
        };
      }
      default:
        return state;
    }
  };

  return combineReducers({
    file,
    uploadedFilesState,
    uploadingFileState,
  });
};

export default uploadState();
