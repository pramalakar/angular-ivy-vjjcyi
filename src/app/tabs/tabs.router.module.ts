import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/posts/posts.module').then(
                (mod) => mod.PostsPageModule
              ),
          },
          {
            path: 'post-detail/:id',
            loadChildren: () =>
              import('../pages/post-detail/post-detail.module').then(
                (mod) => mod.PostDetailPageModule
              ),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(
                (mod) => mod.SettingsPageModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/posts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
