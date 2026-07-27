import 'react-native-gesture-handler';

import { ensureMobileSupabaseConfigured } from '@darkmat/shared/services/mobile';
import { registerRootComponent } from 'expo';

import App from './App';

ensureMobileSupabaseConfigured();

registerRootComponent(App);
