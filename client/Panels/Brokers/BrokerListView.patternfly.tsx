/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React, { FunctionComponent } from 'react';
import { ClusterHeader } from 'Elements/Components/ClusterConfiguration/ClusterHeader.patternfly';

const BrokerListView: FunctionComponent = () => {
  return <ClusterHeader />;
};

export { BrokerListView };

export default BrokerListView;
