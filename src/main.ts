import DxConfig from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';
import { messages } from './devextreme-pt';

// stylesheets
import 'devextreme/dist/css/dx.light.css';
import './style.css';

import { AppComponent } from './app/app.component';

// bootstrap
function bootstrap() {
  loadMessages(messages);
  locale('pt-BR');
  DxConfig({
    forceIsoDateParsing: false, // TODO: verificar se false é o correto
  });
  const aplicacao = new AppComponent(document.getElementById('app'));
}

bootstrap();
