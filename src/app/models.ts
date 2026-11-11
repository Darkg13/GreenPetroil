export type Estado = 'carregando' | 'erro' | 'ok';

export interface Post {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string; // AAAA-MM-DD
  autor: string;
  conteudo?: string[]; // só vem no detalhe (GET /api/posts/:id)
}

export interface ProjetoSocial {
  id: number;
  nome: string;
  categoria: string;
  local: string;
  descricao: string;
  beneficiados: number;
}
