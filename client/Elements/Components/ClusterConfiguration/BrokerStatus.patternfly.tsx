/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React from "react";
import { Label } from "@patternfly/react-core";
import InfoCircleIcon from "@patternfly/react-icons/dist/js/icons/info-circle-icon";

interface IBrokerStatusProps {
  isController?: boolean;
  status?: string;
}

export const BrokerStatus: React.FC<IBrokerStatusProps> = ({ status }) => {
  return (
    <Label variant="outline" icon={<InfoCircleIcon />}>
      {status}
    </Label>
  );
};
