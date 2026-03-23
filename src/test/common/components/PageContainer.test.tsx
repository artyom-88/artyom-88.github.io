import { act, render, screen } from '@testing-library/react';
import PageContainer from 'common/components/PageContainer';
import { afterEach, beforeEach, expect, vi } from 'vitest';

const notification = {
  destroy: vi.fn(),
  warning: vi.fn(),
};

vi.mock('antd/es/app', () => ({
  default: {
    useApp: () => ({ notification }),
  },
}));

describe('PageContainer', () => {
  const title = 'test title';
  const icon = () => <span>icon-mock</span>;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('Should render page content when loading is disabled', () => {
    render(
      <PageContainer title={title} icon={icon}>
        <span>page-content</span>
      </PageContainer>,
    );

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText('icon-mock')).toBeVisible();
    expect(screen.getByText('page-content')).toBeVisible();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(notification.warning).not.toHaveBeenCalled();
    expect(notification.destroy).not.toHaveBeenCalled();
  });

  it('Should show loading state and notify after the timeout', () => {
    const { unmount } = render(
      <PageContainer title={title} isLoading>
        <span>page-content</span>
      </PageContainer>,
    );

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.queryByText('page-content')).toBeNull();
    expect(notification.warning).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(notification.warning).toHaveBeenCalledTimes(1);

    unmount();

    expect(notification.destroy).toHaveBeenCalledTimes(1);
  });
});
