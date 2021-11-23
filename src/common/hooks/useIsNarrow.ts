import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const QUERY = '@media (min-width:960px)';

const useIsNarrow = (): boolean => !useMediaQuery<Theme>(QUERY);

export default useIsNarrow;
