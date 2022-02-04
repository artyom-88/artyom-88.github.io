import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const QUERY = '@media (min-width:960px)';

const useIsNarrow = (): boolean => !useMediaQuery<Theme>(QUERY);

export default useIsNarrow;
