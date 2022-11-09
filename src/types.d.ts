interface ICampo {
  propriedade: string;
  etiqueta: string;
  tipo: 'numerico' | 'texto' | 'selecao-multipla';
}

interface ICampoNumero extends ICampo {
  tipo: 'numerico';
  valorMinimo: number;
  valorMaximo: number;
}

interface ICampoTexto extends ICampo {
  tipo: 'texto';
  comprimentoMin: number;
  comprimentoMax: number;
}

interface ICampoSelecaoMultipla<T = any> extends ICampo {
  tipo: 'selecao-multipla';
  fonteDados: T[];
  identificador: keyof T;
  descricao: keyof T | ((item: T) => string);
  modelo?: (dados: T, elemento: HTMLElement) => void;
}

type Campo = ICampoNumero | ICampoTexto | ICampoSelecaoMultipla;
