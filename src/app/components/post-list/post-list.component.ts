import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Model
import { PostModel } from '../../models/post.model';
import { UserModel } from '../../models/user.model';

// Service
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  filteredPost: PostModel[];
  posts: PostModel[];
  users: UserModel[];

  @Input('data') data;

  // pagination
  total: number;
  perPage: number = 10;
  current: number = 1;

  public itemsToDisplay: string[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.getPosts();
  }

  ngOnInit() {}

  getPosts() {
    this.postsService
      .getPosts(this.current, this.perPage)
      .subscribe((response) => {
        const count = response.headers.get('x-total-count');
        this.total = Math.ceil(count / this.perPage);
        this.posts = Object.assign([], response.body);
        this.setUserName();
      });

    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.setUserName();
    });
  }

  setUserName() {
    if (this.posts && this.users) {
      for (const post of this.posts) {
        for (const user of this.users) {
          if (post.userId === user.id) {
            post.name = user.name;
            post.username = user.username;
          }
        }
      }
    }
  }

  goPostDetail(id) {
    console.log('post id: ' + id);
    this.router.navigateByUrl(`/tabs/posts/post-detail/` + id);
  }

  ngDoCheck() {
    console.log(this.data);
    if (!this.data) {
      this.filteredPost = Object.assign([], this.posts);
    } else {
      this.filteredPost = Object.assign([], this.posts).filter(
        (item) => this.data.indexOf(item.userId) > -1
      );
    }
  }

  public onGoTo(page: any): void {
    console.log('goto page: ' + page);
    this.current = page;
    this.paginate(this.current, this.perPage);
  }

  public onNext(page: any): void {
    this.current = page + 1;
    this.paginate(this.current, this.perPage);
  }

  public onPrevious(page: any): void {
    this.current = page - 1;
    console.log(this.current);
    this.paginate(this.current, this.perPage);
  }

  public paginate(current: number, perPage: number): void {
    console.log('Page: ' + current + '/' + perPage);
    this.getPosts();
  }
}
