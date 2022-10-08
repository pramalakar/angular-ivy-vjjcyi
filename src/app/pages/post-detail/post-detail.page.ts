import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Model
import { PostModel } from '../../models/post.model';
import { UserModel } from '../../models/user.model';

// Service
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.css'],
})
export class PostDetailPage implements OnInit {
  id: number;
  post: PostModel;
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getPost(this.id);
  }

  getPost(id) {
    this.postsService.getPost(id).subscribe((post) => {
      this.post = post;
      this.getUser(post.userId);
      console.log(post);
    });
  }

  getUser(id) {
    this.usersService.getUser(id).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
