/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React from 'react';

export type IConfiguration = {
  basePath: string;
  getToken: () => Promise<string>;
};

export const ConfigContext = React.createContext<IConfiguration | undefined>(
  undefined
);
