import { render, screen } from '@testing-library/react';
import PageTitle from 'common/components/PageTitle';
import { expect } from 'vitest';

describe('PageTitle', () => {
  const title = 'test title';
  const icon = () => <span>icon-mock</span>;

  it('Should render title without icon', () => {
    render(<PageTitle title={title} />);
    expect(screen.getByText(title)).toBeVisible();
    expect(screen.queryByText('icon-mock')).toBeNull();
  });

  it('Should render title with icon', () => {
    render(<PageTitle title={title} icon={icon} />);
    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText('icon-mock')).toBeVisible();
  });
});
