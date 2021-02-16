/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { useState } from 'react';
import {
  Card,
  Divider,
  Pagination,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {
  Table,
  TableBody,
  TableHeader,
  TableVariant,
} from '@patternfly/react-table';

export interface IBroker {
  brokerId: string;
  rackId: string;
  partitions: number;
  status: string;
}

export interface IBrokerProps {
  rows: IBroker[];
}

export const BrokerList: React.FunctionComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [offset, setOffset] = useState(0);
  const onSetPage = (_event, pageNumber: number) => {
    setPage(pageNumber);
    setOffset(page * perPage);
  };

  const onPerPageSelect = (_event, perPage: number) => {
    setPerPage(perPage);
  };

  const tableColumns = [
    { title: 'Broker Id' },
    { title: 'Partitions' },
    { title: 'Rack ID' },
    { title: 'Status' },
  ];

  //To be removed after the integration.
  const tableRows = [
    { cells: ['Broker-1', 1, 'rack-1', 'ready'] },
    { cells: ['Broker-2', 2, 'rack-2', 'configuring'] },
  ];

  return (
    <>
      <Card>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem variant='pagination'>
              <Pagination
                itemCount={tableRows.length}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                widgetId='pagination-options-menu-top'
                onPerPageSelect={onPerPageSelect}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <Divider />

        <Table
          aria-label='Compact Table'
          variant={TableVariant.compact}
          cells={tableColumns}
          rows={
            page != 1
              ? tableRows.slice(offset, offset + perPage)
              : tableRows.slice(0, perPage)
          }
        >
          <TableHeader />
          <TableBody />
        </Table>
        {tableRows.length > 1 && (
          <Pagination
            itemCount={tableRows.length}
            perPage={perPage}
            page={page}
            onSetPage={onSetPage}
            widgetId='pagination-options-menu-bottom'
            onPerPageSelect={onPerPageSelect}
          />
        )}
      </Card>
    </>
  );
};
