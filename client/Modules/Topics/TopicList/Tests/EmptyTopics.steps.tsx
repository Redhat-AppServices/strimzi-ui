import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EmptyTopics } from 'Modules/Topics/TopicList/Components/EmptyTopics';
import { MemoryRouter } from 'react-router';

describe('<EmptyTopics />', () => {
  it('should render an empty state if filters return no result', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyTopics />
      </MemoryRouter>
    );

    const titleNode = getByText("You don't have any topics yet");
    const bodyNode = getByText(
      'Create a topic by clicking the button below to get started'
    );
    const clearBtn = getByText('Create Topic');

    expect(titleNode).toBeInTheDocument();
    expect(bodyNode).toBeInTheDocument();
    fireEvent.click(clearBtn);
  });
});