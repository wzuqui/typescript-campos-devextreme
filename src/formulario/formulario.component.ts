import dxDataSource from 'devextreme/data/data_source';
import dxTextBox from 'devextreme/ui/text_box';
import dxNumberBox from 'devextreme/ui/number_box';
import dxTagBox, { dxTagBoxOptions } from 'devextreme/ui/tag_box';
import { Subject } from 'rxjs';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxTextEditor from 'devextreme/ui/text_box/ui.text_editor.base';

type DadosEvento = [string, unknown];

import './formulario.component.scss';

export class FormularioComponent {
  public componentes: dxTextEditor[] = [];
  private _debug: HTMLPreElement;

  constructor(
    campos: Campo[],
    container: HTMLElement,
    public dados: object = {},
    public dados$ = new Subject<DadosEvento>(),
    public debug = false
  ) {
    campos.forEach((campo) => {
      switch (campo.tipo) {
        case 'agrupador':
          {
            const element = document.createElement('fieldset');
            element.classList.add('campo');
            container.appendChild(element);

            const legend = document.createElement('legend');
            legend.innerText = campo.titulo;
            element.appendChild(legend);

            const dados$ = new Subject<DadosEvento>();
            const formulario = new FormularioComponent(
              campo.campos,
              element,
              dados,
              dados$
            );
            dados$.subscribe((evento) => this._atualizarDados(evento));
            this.componentes.push(...formulario.componentes);
          }
          break;
        case 'texto':
          {
            const element = document.createElement('div');
            element.classList.add('campo');
            const component = new dxTextBox(element, {
              maxLength: campo.comprimentoMax,
              label: campo.etiqueta,
              value: dados[campo.propriedade],
              showClearButton: true,
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
            });
            container.appendChild(element);
            this.componentes.push(component);
          }
          break;
        case 'numerico':
          {
            const element = document.createElement('div');
            element.classList.add('campo');
            container.appendChild(element);
            const component = new dxNumberBox(element, {
              label: campo.etiqueta,
              min: campo.valorMinimo,
              max: campo.valorMaximo,
              value: dados[campo.propriedade],
              showSpinButtons: true,
              showClearButton: true,
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
            });
            this.componentes.push(component as dxTextEditor);
          }
          break;
        case 'selecao-multipla':
          {
            const element = document.createElement('div');
            element.classList.add('campo');
            container.appendChild(element);

            const options: dxTagBoxOptions = {
              dataSource: new dxDataSource({
                store: campo.fonteDados,
                paginate: true,
                pageSize: 10,
              }),
              label: campo.etiqueta,
              valueExpr: campo.identificador as string,
              value: dados[campo.propriedade],
              showClearButton: true,
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
              showSelectionControls: true,
              showDropDownButton: true,
              applyValueMode: 'useButtons',
              searchEnabled: true,
            };

            if (campo.descricao) {
              switch (typeof campo.descricao) {
                case 'string':
                  options.displayExpr = campo.descricao;
                  break;
                case 'function':
                  options.displayExpr = (evento) =>
                    (campo.descricao as (item: unknown) => string)(evento);
                  break;
                default:
                  break;
              }
            }
            if (campo.modelo) {
              switch (typeof campo.modelo) {
                case 'string':
                  options.itemTemplate = campo.modelo;
                  break;
                case 'function':
                  options.itemTemplate = (evento) => {
                    const retorno = document.createElement('div');
                    campo.modelo(evento, retorno);
                    return retorno;
                  };
                  break;
                default:
                  break;
              }
            }

            const component = new dxTagBox(element, options);
            this.componentes.push(component as dxTextEditor);
          }
          break;
      }
    });
    this._debug = document.createElement('pre');
    container.appendChild(this._debug);
    this.dados$.subscribe((evento) => this._atualizarDados(evento));

    const primeiro = this.componentes.find((p) => p);
    primeiro.focus();
  }

  private _atualizarDados(evento: DadosEvento): void {
    const [propriedade, valor] = evento;
    this.dados = { ...this.dados, [propriedade]: valor };
    if (this.debug) {
      this._debug.innerText = JSON.stringify(this.dados, null, 2);
    }
  }
}
