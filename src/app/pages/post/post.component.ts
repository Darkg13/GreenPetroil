import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estado, Post } from '../../models';
import { ApiService } from '../../services/api.service';
import { PostCardComponent } from '../../shared/post-card/post-card.component';
import { StateMessageComponent } from '../../shared/state-message/state-message.component';

@Component({
  selector: 'gp-post',
  imports: [DatePipe, RouterLink, PostCardComponent, StateMessageComponent],
  templateUrl: './post.component.html',
})
export class PostComponent {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);

  private idAtual = '';
  private requisicoes = new Subscription();

  protected readonly post = signal<Post | null>(null);
  protected readonly outrosPosts = signal<Post[]>([]);
  protected readonly estado = signal<Estado>('carregando');
  protected readonly mensagemErro = signal('');

  constructor() {
    // Ao sair da página, cancela as requisições que ainda estiverem em andamento.
    inject(DestroyRef).onDestroy(() => this.requisicoes.unsubscribe());

    // Reage à troca do parâmetro :id (ex.: clicar em "Leia também" sem sair da página).
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.idAtual = params.get('id') ?? '';
      this.carregar();
    });
  }

  protected carregar(): void {
    // Cancela a requisição anterior: se o usuário trocar de post rápido, uma resposta
    // antiga não sobrescreve a mais nova.
    this.requisicoes.unsubscribe();
    this.requisicoes = new Subscription();
    this.estado.set('carregando');

    this.requisicoes.add(this.api.obterPost(this.idAtual).subscribe({
      next: (post) => {
        this.post.set(post);
        this.titleService.setTitle(`GreenPetroil | ${post.titulo}`);
        this.estado.set('ok');
        this.carregarOutros(post.id);
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro.set(
          erro.status === 404
            ? 'Esta notícia não foi encontrada.'
            : 'Não foi possível carregar a notícia agora.',
        );
        this.estado.set('erro');
      },
    }));
  }

  private carregarOutros(idAtual: number): void {
    this.requisicoes.add(
      this.api.listarPosts(4).subscribe({
        next: (posts) => this.outrosPosts.set(posts.filter((p) => p.id !== idAtual).slice(0, 3)),
        error: () => this.outrosPosts.set([]),
      }),
    );
  }
}
