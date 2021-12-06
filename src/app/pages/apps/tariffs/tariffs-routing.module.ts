import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { TariffsComponent } from './tariffs.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: TariffsComponent,
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      {
        path: '',
        redirectTo: 'getting-started'
      },
      {
        path: 'pricing',
        loadChildren: () => import('./components/tariff.module').then(m => m.TariffModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class TariffsRoutingModule {
}
