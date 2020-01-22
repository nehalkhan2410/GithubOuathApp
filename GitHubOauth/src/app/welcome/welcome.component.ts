import { Component, OnInit } from '@angular/core';

import Cookies from 'js-cookie';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userName: string;
  

  constructor() { }

  ngOnInit() {
    
    let data = Cookies.get('userData').substring(2);
    data = JSON.parse(data);
    console.log(data.user.userid);

    this.userName = data.user.userid;

    localStorage.removeItem('userData');
    localStorage.removeItem('userInfo');
    // localStorage.setItem("userData", data.substring(2,data.length-2));
    // console.log(JSON.parse(localStorage.getItem('userData')).success);

    // this.userName = JSON.parse(localStorage.getItem('userInfo')).user.userid;

  }

}
