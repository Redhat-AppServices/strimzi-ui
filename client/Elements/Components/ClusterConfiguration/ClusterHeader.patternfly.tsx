/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { useState } from 'react';
import {
  Button,
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  Title,
  Tabs,
  Tab,
  TabTitleText,
} from '@patternfly/react-core';
import './ClusterHeader.patternfly.css';
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon';
import { BrokerList } from './BrokerList.patternfly';

export const ClusterHeader: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState(0);
  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <>
      <PageSection
        className='page-section-padding'
        variant={PageSectionVariants.light}
      >
        <PageSection variant={PageSectionVariants.light}>
          <Title headingLevel='h1'>Cluster</Title>
          <Flex>
            <FlexItem align={{ default: 'alignRight' }}>
              <Button
                variant='link'
                icon={<CodeBranchIcon />}
                iconPosition='right'
              >
                Connect to this cluster
              </Button>
            </FlexItem>
          </Flex>
        </PageSection>
        <br />
        <PageSection
          variant={PageSectionVariants.light}
          padding={{ default: 'noPadding' }}
        >
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
            <Tab
              title={<TabTitleText>Brokers</TabTitleText>}
              eventKey={0}
              id='brokers-tab-section'
              aria-label='Brokers Tab'
            >
              <BrokerList />
            </Tab>
            <Tab
              title={<TabTitleText>Configuration</TabTitleText>}
              eventKey={1}
              id='configuration-tab-section'
              aria-label='Configuration Tab'
            >
              <Title headingLevel='h4'>Configuration </Title>
            </Tab>
          </Tabs>
        </PageSection>
      </PageSection>
    </>
  );
};
