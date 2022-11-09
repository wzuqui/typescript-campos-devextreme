import dxTextBox from 'devextreme/ui/text_box';
import dxNumberBox from 'devextreme/ui/number_box';
import dxTagBox from 'devextreme/ui/tag_box';
import { Subject } from 'rxjs';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';

export class FormularioComponent {
  constructor(
    campos: Campo[],
    container: HTMLElement,
    public dados: object = {},
    public dados$ = new Subject<[string, unknown]>()
  ) {
    campos.forEach((campo) => {
      switch (campo.tipo) {
        case 'texto':
          {
            const element = document.createElement('div');
            new dxTextBox(element, {
              maxLength: campo.comprimentoMax,
              label: campo.etiqueta,
              value: dados[campo.propriedade],
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
            });
            container.appendChild(element);
          }
          break;
        case 'numerico':
          {
            const element = document.createElement('div');
            container.appendChild(element);
            new dxNumberBox(element, {
              label: campo.etiqueta,
              min: campo.valorMinimo,
              max: campo.valorMaximo,
              value: dados[campo.propriedade],
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
            });
          }
          break;
        case 'selecao-multipla':
          {
            const element = document.createElement('div');
            container.appendChild(element);
            new dxTagBox(element, {
              items: campo.fonteDados,
              label: campo.etiqueta,
              valueExpr: campo.identificador as string,
              value: dados[campo.propriedade],
              displayExpr:
                typeof campo.descricao === 'string'
                  ? campo.descricao
                  : typeof campo.descricao === 'function'
                  ? (evento) =>
                      (campo.descricao as (item: unknown) => string)(evento)
                  : undefined,
              itemTemplate:
                typeof campo.modelo === 'string'
                  ? campo.modelo
                  : typeof campo.modelo === 'function'
                  ? (evento) => {
                      const retorno = document.createElement('div');
                      campo.modelo(evento, retorno);
                      return retorno;
                    }
                  : undefined,
              onValueChanged: (evento: ValueChangedInfo) =>
                this.dados$.next([campo.propriedade, evento.value]),
            });
          }
          break;
      }
    });

    const camposPre = document.createElement('pre');
    camposPre.innerText = JSON.stringify(campos, null, 2);
    container.appendChild(camposPre);

    const dadosPre = document.createElement('pre');
    camposPre.innerText = JSON.stringify(dados, null, 2);
    container.appendChild(dadosPre);

    this.dados$.subscribe(([propriedade, valor]) => {
      this.dados = { ...this.dados, [propriedade]: valor };
      camposPre.innerText = JSON.stringify(this.dados, null, 2);
    });
  }
}
