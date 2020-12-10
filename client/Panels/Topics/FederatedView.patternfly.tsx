/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { FunctionComponent } from 'react';
import './style.scss';
import { TopicsList } from '../../Elements/Components/Topics/TopicsList.patternfly';
import { LoggingProvider } from '../../Contexts/Logging';
import {
  ConfigFeatureFlagProvider,
  FeatureFlag,
} from '../../Contexts/ConfigFeatureFlag';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../../Bootstrap/GraphQLClient/GraphQLClient';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { setContext } from '@apollo/client/link/context';

export type FederatedTopicsProps = {
  getControlPlaneToken: () => Promise<string>;
  getDataPlaneToken: () => Promise<string>;
  id: string;
};

const FederatedTopics: FunctionComponent<FederatedTopicsProps> = ({
  id,
  getControlPlaneToken,
  getDataPlaneToken,
}) => {
  const authLink = setContext(async () => {
    return {
      headers: {
        authorization: await getDataPlaneToken(),
        'X-API-OpenShift-Com-Token': await getControlPlaneToken(),
        'X-Kafka-ID': id,
      },
    };
  });

  return (
    <ApolloProvider client={getApolloClient([authLink])}>
      <ConfigFeatureFlagProvider>
        <LoggingProvider>
          <FeatureFlag flag={'client.Pages.PlaceholderHome'}>
            <PageSection variant={PageSectionVariants.light}>
              <TopicsList />
            </PageSection>
          </FeatureFlag>
        </LoggingProvider>
      </ConfigFeatureFlagProvider>
    </ApolloProvider>
  );
};

export { FederatedTopics };

export default FederatedTopics;
