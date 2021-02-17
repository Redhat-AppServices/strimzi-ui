/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import { Avatar, Dropdown, DropdownItem, DropdownToggle, PageHeader, PageHeaderTools,} from '@patternfly/react-core';
import React, { useState } from 'react';
import { CaretDownIcon } from '@patternfly/react-icons';
import avatarImg from 'Images/img_avatar.svg';

export const MastHead: React.FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const handleUserDropDownSelect = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleUserDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const userDropDownItems = [
    <DropdownItem key='logout'>Logout</DropdownItem>
  ];

  // TODO: Get user name from user context
  const userDropDownToggle = (
    <DropdownToggle
      id='user-dropdown-toggle'
      onToggle={handleUserDropDownToggle}
      toggleIndicator={CaretDownIcon}
    >
      Ned Username
    </DropdownToggle> 
  );

  const userDropDown = (
    <Dropdown
      onSelect={handleUserDropDownSelect}
      toggle={userDropDownToggle}
      isOpen={isDropDownOpen}
      isPlain
      dropdownItems={userDropDownItems}
    />
  );

  const avatar = (
    <React.Fragment>
      <Avatar src={avatarImg} className='app-avatar' alt='avatar' />
    </React.Fragment>
  );

  const HeaderTools = (
    <PageHeaderTools>
      {userDropDown}
      {avatar}
    </PageHeaderTools>
  );

  return (
    <PageHeader
      logo='STRIMZI'
      logoComponent='h1'
      headerTools={HeaderTools}
      showNavToggle
    /> 
  );
};
