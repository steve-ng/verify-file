import * as HashContract from 'utils/hashContract';

export const SET_ETH_ADDRESS_REQUEST = 'SET_ETH_ADDRESS_REQUEST';
export const SET_ETH_ADDRESS = 'SET_ETH_ADDRESS';

export const setEthAddressRequest = (requesting) => ({
  type: SET_ETH_ADDRESS_REQUEST,
  requesting,
});

export const setEthAddress = (address) => ({
  type: SET_ETH_ADDRESS,
  address,
});

export const initialize = () => (dispatch) => {
  if (typeof web3 === 'undefined') {
    dispatch(setEthAddressRequest(false));
    return;
  }

  const myWeb3 = HashContract.getOrInitializeWeb3(web3); /* eslint-disable-line */

  if (myWeb3 != null) {
    myWeb3.eth.getCoinbase().then(address => {
      dispatch(setEthAddressRequest(true));
      dispatch(setEthAddress(address));
    });
  } else {
    dispatch(setEthAddressRequest(false));
  }
};

