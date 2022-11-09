import { AppService } from './app.service';
import { FormularioComponent } from '../formulario/formulario.component';

import './app.component.scss';

export class AppComponent {
  constructor(container: HTMLElement, public service = new AppService()) {
    container.classList.add('app');
    const formularioDiv = document.createElement('div');
    formularioDiv.classList.add('formulario');
    container.appendChild(formularioDiv);

    new FormularioComponent(
      this._obterCampos(),
      formularioDiv,
      {
        Nome: 'Willian',
        SobreNome: 'Zuqui',
        Idade: 32,
        Permissoes: [1],
        FuzoHorario: [Intl.DateTimeFormat().resolvedOptions().timeZone],
      },
      undefined,
      true
    );
  }

  private _obterCampos() {
    const retorno: Campo[] = [
      {
        tipo: 'agrupador',
        titulo: 'Dados pessoais',
        campos: [
          {
            tipo: 'texto',
            etiqueta: 'Nome',
            propriedade: 'Nome',
            comprimentoMin: 3,
            comprimentoMax: 150,
          },
          {
            tipo: 'texto',
            etiqueta: 'SobreNome',
            propriedade: 'SobreNome',
            comprimentoMin: 3,
            comprimentoMax: 150,
          },
          {
            tipo: 'numerico',
            propriedade: 'Idade',
            etiqueta: 'Idade',
            valorMinimo: 1,
            valorMaximo: 150,
          },
        ],
      },
      {
        tipo: 'agrupador',
        titulo: 'Configurações',
        campos: [
          {
            tipo: 'selecao-multipla',
            propriedade: 'FuzoHorario',
            etiqueta: 'Fuzo horário',
            descricao: 'nome',
            identificador: 'id',
            fonteDados: this.service.fuzoHorarios,
          },
          {
            tipo: 'selecao-multipla',
            propriedade: 'Permissoes',
            etiqueta: 'Permissões',
            fonteDados: this.service.permissoes,
            descricao: 'nome',
            identificador: 'id',
          } as ICampoSelecaoMultipla<{
            id: number;
            nome: string;
          }> as Campo,
        ],
      },
    ];
    return retorno;
  }
}
