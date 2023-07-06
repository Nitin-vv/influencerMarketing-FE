import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { Profile } from 'src/app/shared/models';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userDetails: any = null;
  userFeeds: any = null;
  userContacts: any = null;
  private onDestroy$ = new Subject<void>();
  isloading: boolean = false;
  constructor(public commonService: CommonService, private userSevice: UserProfileService, private sanitize: DomSanitizer) {

  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    return false;
  }

  ngOnInit(){
    this.commonService.userDetails.subscribe(res => {
      if(res) {
        this.userDetails = res;
        this.isloading = true;
        this.getUserContacts(this.userDetails?.username);
        this.getUserFeeds(this.userDetails?.username, '')
      }
    })
  }

  formatNumber(value: number): string {
    if(value) {
     return this.commonService.formatNumber(value);
    }
    return '';
  }


  getUserFeeds(username: string, after: string) {
    this.userSevice.getUserFeed(username, after).pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(({ items }) => {   
        this.userFeeds = items;
        this.isloading = false;
      });
  }


  getUserContacts(username: string) {
    this.userSevice.getUserContacts(username).pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(({ user_profile }) => {   
        this.userContacts = user_profile?.contacts;
      });
  }

  sanitizevalue(url: string) {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }
}
