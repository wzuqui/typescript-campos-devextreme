import DxConfig from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from './devextreme-pt.json';

// stylesheets
import 'devextreme/dist/css/dx.light.css';
import './style.css';

import { AppComponent } from './app.component';

// bootstrap
function bootstrap() {
  loadMessages(ptMessages);
  locale('pt-BR');
  DxConfig({
    forceIsoDateParsing: false, // TODO: verificar se false é o correto
  });
  const aplicacao = new AppComponent(document.getElementById('app'));
}

bootstrap();
