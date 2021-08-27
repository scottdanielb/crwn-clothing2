import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionsOverviewContainerHOC = lazy(() =>
  import('../../components/collections-overview/collections-overview.container')
);
const CollectionPageContainerHOC = lazy(() =>
  import('../collection/collection.container')
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className='shop-page'>
      <Suspense fallback={<div>Loading</div>}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainerHOC}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainerHOC}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
