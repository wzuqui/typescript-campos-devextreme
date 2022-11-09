import { FormularioComponent } from './formulario.component';

export class AppComponent {
  constructor(container: HTMLElement) {
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
      },
      undefined,
      true
    );
  }

  private _obterCampos() {
    let retorno: Campo[] = [
      {
        tipo: 'agrupador',
        colunas: 2,
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
        ],
      },
      {
        tipo: 'numerico',
        propriedade: 'Idade',
        etiqueta: 'Idade',
        valorMinimo: 1,
        valorMaximo: 150,
      },
      {
        tipo: 'selecao-multipla',
        propriedade: 'Permissoes',
        etiqueta: 'Permissões',
        fonteDados: [
          {
            id: 1,
            nome: 'Administrador',
          },
          {
            id: 2,
            nome: 'Editor',
          },
          {
            id: 3,
            nome: 'Visualizador',
          },
        ],
        descricao: (item) => `${item.nome} (${item.id})`,
        modelo: (item, elemento) => {
          elemento.innerHTML = item.nome;
        },
        identificador: 'id',
      } as ICampoSelecaoMultipla<{
        id: number;
        nome: string;
      }> as Campo,
    ];
    return retorno;
  }
}
