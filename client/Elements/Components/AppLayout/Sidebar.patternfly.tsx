/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import { Nav, NavItem, NavList, PageSidebar } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

export const SideBar: React.FC = () => {

  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    setActiveItem(
      routeToId[window.location.hash.split("#")[1] || "/"]
    )
  }, []);

  const routeToId = {
    "/": 0,
    "/topics": 1
  };

  const onSelect = (result) => {
    setActiveItem(result.itemId)
  }

  const PageNav = (
    <Nav aria-label='side-navigation-bar' onSelect={onSelect}>
      <NavList>
        <NavItem
          itemId={0}
          isActive={activeItem === 0}
          to='/#/'> Home
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to='/#/topics'> Topics </NavItem>
        <NavItem itemId={2} isActive={false}> Consumer groups </NavItem>
        <NavItem itemId={3} isActive={false}> Cluster configuration </NavItem>
      </NavList>
    </Nav>
  );

  return <PageSidebar isNavOpen={false} nav={PageNav} />;
};
