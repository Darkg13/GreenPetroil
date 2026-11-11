import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Estado, Post, ProjetoSocial } from '../../models';
import { ApiService } from '../../services/api.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { PostCardComponent } from '../../shared/post-card/post-card.component';
import { ProjetoCardComponent } from '../../shared/projeto-card/projeto-card.component';
import { StateMessageComponent } from '../../shared/state-message/state-message.component';

@Component({
  selector: 'gp-home',
  imports: [
    RouterLink,
    PostCardComponent,
    ProjetoCardComponent,
    StateMessageComponent,
    CtaBannerComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly posts = signal<Post[]>([]);
  protected readonly estadoPosts = signal<Estado>('carregando');

  protected readonly projetos = signal<ProjetoSocial[]>([]);
  protected readonly estadoProjetos = signal<Estado>('carregando');

  ngOnInit(): void {
    this.carregarPosts();
    this.carregarProjetos();
  }

  protected carregarPosts(): void {
    this.estadoPosts.set('carregando');
    // O feed da página inicial mostra apenas os 3 últimos posts.
    this.api.listarPosts(3).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.estadoPosts.set('ok');
      },
      error: () => this.estadoPosts.set('erro'),
    });
  }

  protected carregarProjetos(): void {
    this.estadoProjetos.set('carregando');
    this.api.listarProjetosSociais().subscribe({
      next: (projetos) => {
        this.projetos.set(projetos.slice(0, 3));
        this.estadoProjetos.set('ok');
      },
      error: () => this.estadoProjetos.set('erro'),
    });
  }
}
