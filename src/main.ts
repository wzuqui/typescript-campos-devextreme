// stylesheets
import 'devextreme/dist/css/dx.light.css';
import './style.css';

import { AppComponent } from './app.component';

// bootstrap
function bootstrap() {
  const aplicacao = new AppComponent(document.getElementById('app'));
}

bootstrap();
