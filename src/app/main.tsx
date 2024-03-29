import { createRoot } from 'react-dom/client';

import App from 'app/App';
import 'app/main.scss';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<App />);
