import Typography from '@mui/material/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { Object } from 'common/types/common.types';
import { Component, ErrorInfo, PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<PropsWithChildren<Object>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<Object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // empty
  }

  render() {
    return this.state.hasError ? (
      <PageContainer>
        <div className='ag-flexbox ag-flexColumn ag-alignItems_center'>
          <Typography variant='h4'>Something went wrong</Typography>
        </div>
      </PageContainer>
    ) : (
      this.props.children
    );
  }
}
