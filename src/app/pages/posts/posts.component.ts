import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  data: number[];
  constructor() {}

  ngOnInit() {}

  filter(data) {
    this.data = Object.assign([], data);
  }
}
