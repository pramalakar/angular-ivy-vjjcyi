import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

// Model
import { UserModel } from '../../models/user.model';

// Service
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  users: UserModel[];
  query: string;
  searchResult: UserModel[];
  @Output() searchcriteria = new EventEmitter<number[]>();

  constructor(private usersService: UsersService, private router: Router) {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.assignCopy();
      console.log(this.users);
    });
  }

  ngOnInit() {}

  assignCopy() {
    this.searchResult = Object.assign([], this.users);
  }

  search(query): void {
    // if nothing has typed
    console.log('query: ' + query.target.value);
    if (
      !query.target.value ||
      query.target.value == 'undefined' ||
      query.target.value == null ||
      query.target.value == ''
    ) {
      this.searchResult = Object.assign([], this.users);
    }
    // if something has typed
    this.searchResult = Object.assign([], this.users).filter(
      (item) =>
        item.username.toLowerCase().indexOf(query.target.value.toLowerCase()) >
        -1
    );
    console.log('search result: ' + this.searchResult);
    const ids = this.searchResult.map((user) => user.id);

    this.searchcriteria.emit(ids);
  }
}
