import {Component, Input} from '@angular/core';
import {FileUploadService} from "../../../services/file-upload.service";
import {BaseComponent} from "../../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../../models/notification-message";

@Component({
  selector: 'app-image-to-delete',
  templateUrl: './image-to-delete.component.html',
  styleUrls: ['./image-to-delete.component.scss']
})
export class ImageToDeleteComponent extends BaseComponent {

  @Input() photoSrc!: string;
  @Input() photoName!: string;
  @Input() photoDirectory!: string;
  display: boolean = true;
  message = '';

  constructor(private uploadService: FileUploadService) {
    super();
  }

  deletePhoto() {
    this.display = false
    console.log(this.photoName);
    console.log(this.photoDirectory)

    this.uploadService.delete(this.photoName, this.photoDirectory).subscribe({
        error: (err: any) => {
          this.sendMessage("Usuwanie obrazka nie powiodło się", NotificationMessageType.ERROR)
        }
      }
    )
    this.sendMessage("Usunięto obrazek", NotificationMessageType.SUCCESS)
  }
}
