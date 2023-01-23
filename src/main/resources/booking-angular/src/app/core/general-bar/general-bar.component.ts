import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../services/dto/user";

@Component({
  selector: 'app-general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.scss']
})
export class GeneralBarComponent implements OnInit{

  user?: User;
  isPicture: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    if (this.user?.imagePath) {
      this.isPicture = true
    }
  }

  ngOnInit(): void {
    this.retrieveLoggedUser();
  }

  btnClick = () => {
    this.router.navigateByUrl('');
  };

  messageClick() {
    this.router.navigateByUrl('chat');
  }

  accountClick() {
    this.router.navigate(['/account'])
  }

  retrieveLoggedUser(): void {
    this.userService.getAccountDate()
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.log(e)
      });
  }
}
