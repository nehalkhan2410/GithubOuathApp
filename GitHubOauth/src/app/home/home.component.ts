import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  color: string = "#ffaa33";
  white: string = "#FFFFFF";
  data: any;

  constructor(public router:Router) { }

  ngOnInit() {
    this.data = Cookies.get('userData').substring(2);
    if(this.data===undefined){
      
    }
    this.data = JSON.parse(this.data);
  }

  Login(){

    //this.router.navigate(['/welcome']);
    return '/welcome';
    //return "https://github.com/login/oauth/authorize?client_id=<client_id>&scope=user";
    // if(this.data.logged_in){
    //   //go to server and verify validity

    //   //if valid go to dashboard
    //   //return "/welcome"

    //   //if expired go to db take access_token ad generate new jwt token and then redirect to dashboard

    // }else if(!this.data.logged_in){
    //   //got to server delete jwt and set logged_in to false
    // }else{
    //   //start whole process from start
    //   return "https://github.com/login/oauth/authorize?client_id=<client_id>&scope=user";
    // }

    
    
  }

}
