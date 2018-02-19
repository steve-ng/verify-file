import * as actions from 'actions/ethActions';

const defaultState = {
  address: null,
  requestingAddress: true,
};

const ethState = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_ETH_ADDRESS: {
      return {
        ...state,
        address: action.address,
      };
    }
    case actions.SET_ETH_ADDRESS_REQUEST: {
      return {
        ...state,
        requestingAddress: action.requesting,
      };
    }
    default:
      return state;
  }
};

export default ethState;
