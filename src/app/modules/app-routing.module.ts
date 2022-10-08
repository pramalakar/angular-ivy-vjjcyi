import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../tabs/tabs.module').then((mod) => mod.TabsPageModule),
  },
  // {
  //   path: 'posts',
  //   loadChildren: () =>
  //     import('../pages/posts/posts.module').then((mod) => mod.PostsPageModule),
  // },
  // {
  //   path: 'post-detail/:id',
  //   loadChildren: () =>
  //     import('../pages/post-detail/post-detail.module').then(
  //       (mod) => mod.PostDetailPageModule
  //     ),
  // },
  {
    path: 'settings',
    loadChildren: () =>
      import('../pages/settings/settings.module').then(
        (mod) => mod.SettingsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
