import { render, screen } from '@testing-library/react';
import PageTitle from 'common/components/PageTitle';
import { expect, vi } from 'vitest';

describe('PageTitle', () => {
  const title = 'test title';

  it('Should render title', () => {
    render(<PageTitle title={title} icon={vi.fn()} />);
    expect(screen.getByText(title)).toBeVisible();
  });

  it('Should render icon', () => {
    const icon = () => <span>icon-mock</span>;
    render(<PageTitle title={title} icon={icon} />);
    expect(screen.getByText('icon-mock')).toBeVisible();
  });
});
