import {Component, Input} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";
import {User} from "../../services/dto/user";

@Component({
  selector: 'app-user-image-upload',
  templateUrl: './user-image-upload.component.html',
  styleUrls: ['./user-image-upload.component.scss']
})
export class UserImageUploadComponent extends BaseComponent{

  selectedFiles?: FileList;
  currentUserId?: string;
  currentFile?: File;
  user?: User;

  constructor(private uploadService: FileUploadService, private userService: UserService) {
    super();
    this.retrieveLoggedUser();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  retrieveLoggedUser(): void {
    this.userService.getAccountDate()
      .subscribe({
        next: (data) => {
          this.user = data;
          this.currentUserId = data.id;
          console.log(data)
        },
        error: (e) => console.log(e)
      });
  }

  upload(): void {

    let path = "src/main/resources/booking-angular/src/assets/images/Account/Account" + this.currentUserId;
    console.log(path)
    this.uploadService.delete('1.jpg', path).subscribe({
        error: (err: any) => {
        }
      }
    )

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, "src/main/resources/booking-angular/src/assets/images/Account/Account" + this.currentUserId).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              this.sendMessage("Zmieniono zdjęcie profilowe", NotificationMessageType.SUCCESS)
            }
          },
          error: (err: any) => {
            this.sendMessage("Dodawanie obrazka nie powiodło się", NotificationMessageType.ERROR);
            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

}
