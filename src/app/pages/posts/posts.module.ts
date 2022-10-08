import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PostsComponent } from './posts.component';
import { SearchComponent } from '../../components/search/search.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PostsComponent,
    SearchComponent,
    PostListComponent,
    PaginationComponent,
  ],
})
export class PostsPageModule {}
