import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'gp-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly router = inject(Router);

  constructor() {
    // Acessibilidade em SPA: a cada troca de rota, leva o foco para o conteúdo principal
    // (a primeira navegação é ignorada para não atrapalhar o link "Pular para o conteúdo").
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(),
      )
      .subscribe(() => document.getElementById('conteudo')?.focus({ preventScroll: true }));
  }

  /**
   * Link "Pular para o conteúdo". Com <base href="/">, um href="#conteudo" puro levaria o
   * navegador para "/#conteudo" (a home) em vez de ficar na página atual. Por isso o foco é movido aqui.
   */
  protected irParaConteudo(evento: Event): void {
    evento.preventDefault();
    const main = document.getElementById('conteudo');
    main?.focus();
    main?.scrollIntoView();
  }
}
