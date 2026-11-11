import { DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Estado, ProjetoSocial } from '../../models';
import { ApiService } from '../../services/api.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { ProjetoCardComponent } from '../../shared/projeto-card/projeto-card.component';
import { StateMessageComponent } from '../../shared/state-message/state-message.component';

@Component({
  selector: 'gp-projetos-sociais',
  imports: [
    DecimalPipe,
    PageHeroComponent,
    ProjetoCardComponent,
    StateMessageComponent,
    CtaBannerComponent,
  ],
  templateUrl: './projetos-sociais.component.html',
})
export class ProjetosSociaisComponent implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly projetos = signal<ProjetoSocial[]>([]);
  protected readonly estado = signal<Estado>('carregando');
  protected readonly totalBeneficiados = computed(() =>
    this.projetos().reduce((soma, p) => soma + p.beneficiados, 0),
  );

  ngOnInit(): void {
    this.carregar();
  }

  protected carregar(): void {
    this.estado.set('carregando');
    this.api.listarProjetosSociais().subscribe({
      next: (projetos) => {
        this.projetos.set(projetos);
        this.estado.set('ok');
      },
      error: () => this.estado.set('erro'),
    });
  }
}
