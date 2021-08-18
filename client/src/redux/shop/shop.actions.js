import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FECTH_COLLECTIONS_START,
});

export const fecthCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FECTH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fecthCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FECTH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fecthCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fecthCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fecthCollectionsFailure(error.message)));
  };
};
