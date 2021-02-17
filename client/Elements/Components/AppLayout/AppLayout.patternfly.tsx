/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import { Page } from "@patternfly/react-core";
import { MastHead } from "Elements/Components/AppLayout/MasthHead.patternfly";
import { SideBar } from "Elements/Components/AppLayout/Sidebar.patternfly";
import React from "react"

export type AppLayoutProps = {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  return (
    <Page mainContainerId='main-container' sidebar={<SideBar />} header={<MastHead />} isManagedSidebar >
      {children}
    </Page>
  );
};
