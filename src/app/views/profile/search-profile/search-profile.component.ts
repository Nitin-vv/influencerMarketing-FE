import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, catchError, debounceTime, map, of, startWith, takeUntil } from 'rxjs';
import { Profile } from 'src/app/shared/models';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit, OnDestroy {

  profileCtrl = new FormControl('');
  filteredProfile: Array<Profile> = [];
  private onDestroy$ = new Subject<void>();
  profile: Profile[] = [];

  constructor(private userService$: UserProfileService, private commonServcie: CommonService) {

  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    return false;
  }


  ngOnInit() {
    this.profileCtrl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.getListOfUsers(this.profileCtrl.value || '', 20);
    });
  }

  getListOfUsers(searchText: string, limit: number) {
    this.userService$.getUsers(searchText, limit).pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(({ data }) => {
        this.filteredProfile = data;
      });
  }

  formatNumber(value: number): string {
    if(value) {
     return this.commonServcie.formatNumber(value);
    }
    return '';
  }

  onOptionSelected(profile: Profile) {
    this.commonServcie.userDetails.next(profile);
  }
}
