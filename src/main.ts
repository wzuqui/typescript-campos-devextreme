import DxConfig from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';
import { messages } from './devextreme-pt';

// stylesheets
import './style.scss';

import { AppComponent } from './app/app.component';

// bootstrap
function bootstrap() {
  loadMessages(messages);
  locale('pt-BR');
  DxConfig({
    forceIsoDateParsing: false,
  });
  const aplicacao = new AppComponent(document.getElementById('app'));
}

bootstrap();
