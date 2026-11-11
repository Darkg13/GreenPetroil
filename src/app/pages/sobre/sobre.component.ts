import { Component } from '@angular/core';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';

interface Marco {
  ano: string;
  texto: string;
}

interface Valor {
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'gp-sobre',
  imports: [PageHeroComponent, CtaBannerComponent],
  templateUrl: './sobre.component.html',
})
export class SobreComponent {
  protected readonly marcos: Marco[] = [
    { ano: '1974', texto: 'Fundação da empresa, com uma pequena equipe de prospecção em terra.' },
    { ano: '1989', texto: 'Entrada em operação da primeira plataforma offshore da companhia.' },
    { ano: '2001', texto: 'Abertura de capital e listagem na bolsa de valores.' },
    { ano: '2012', texto: 'Inauguração da primeira unidade de captura e armazenamento de carbono.' },
    { ano: '2020', texto: 'Lançamento do programa de metas de transição energética até 2040.' },
    { ano: '2026', texto: 'Anúncio do Projeto Aurora, a maior campanha de exploração da nossa história.' },
  ];

  protected readonly valores: Valor[] = [
    {
      titulo: 'Segurança em primeiro lugar',
      descricao: 'Nenhuma meta de produção justifica um risco para pessoas ou para o meio ambiente.',
    },
    {
      titulo: 'Respeito ao meio ambiente',
      descricao: 'Medimos, reduzimos e compensamos o impacto de cada operação.',
    },
    {
      titulo: 'Integridade e transparência',
      descricao: 'Prestamos contas de nossos resultados a investidores, governos e comunidades.',
    },
    {
      titulo: 'Inovação',
      descricao: 'Investimos em tecnologia para produzir energia com mais eficiência e menos emissões.',
    },
    {
      titulo: 'Compromisso com as pessoas',
      descricao: 'Valorizamos nossos profissionais e crescemos junto com as comunidades vizinhas.',
    },
  ];
}
