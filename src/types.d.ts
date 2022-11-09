interface ICampo {
  tipo: 'numerico' | 'texto' | 'selecao-multipla' | 'agrupador';
}

interface ICampoNumero extends ICampo {
  tipo: 'numerico';
  propriedade: string;
  etiqueta: string;
  valorMinimo: number;
  obrigatorio: boolean;
  valorMaximo: number;
}

interface ICampoTexto extends ICampo {
  tipo: 'texto';
  propriedade: string;
  etiqueta: string;
  obrigatorio: boolean;
  comprimentoMin: number;
  comprimentoMax: number;
}

interface ICampoAgrupador {
  tipo: 'agrupador';
  titulo: string;
  campos: Campo[];
}

interface ICampoSelecaoMultipla<T = any> extends ICampo {
  tipo: 'selecao-multipla';
  propriedade: string;
  etiqueta: string;
  obrigatorio: boolean;
  fonteDados: T[];
  identificador: keyof T;
  descricao: keyof T | ((item: T) => string);
  modelo?: (dados: T, elemento: HTMLElement) => void;
}

type Campo =
  | ICampoNumero
  | ICampoTexto
  | ICampoAgrupador
  | ICampoSelecaoMultipla;
