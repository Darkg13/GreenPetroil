import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'GreenPetroil | Início' },
  {
    path: 'sobre',
    title: 'GreenPetroil | Quem somos',
    loadComponent: () => import('./pages/sobre/sobre.component').then((m) => m.SobreComponent),
  },
  {
    path: 'noticias/:id',
    title: 'GreenPetroil | Notícia',
    loadComponent: () => import('./pages/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'projetos-sociais',
    title: 'GreenPetroil | Projetos sociais',
    loadComponent: () =>
      import('./pages/projetos-sociais/projetos-sociais.component').then(
        (m) => m.ProjetosSociaisComponent,
      ),
  },
  {
    path: '**',
    title: 'GreenPetroil | Página não encontrada',
    loadComponent: () =>
      import('./pages/nao-encontrado/nao-encontrado.component').then(
        (m) => m.NaoEncontradoComponent,
      ),
  },
];
