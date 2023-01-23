import {Component, Input} from '@angular/core';
import {FileUploadService} from "../../../services/file-upload.service";
import {NotificationMessageType} from "../../../models/notification-message";
import {BaseComponent} from "../../../core/abstract-base/base.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent extends BaseComponent {
  selectedFiles?: FileList;
  @Input() currentPlace!: number;
  currentFile?: File;

  constructor(private uploadService: FileUploadService) {
    super();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, "src/main/resources/booking-angular/src/assets/images/Places/Place" + this.currentPlace).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              this.sendMessage("Dodano obrazek", NotificationMessageType.SUCCESS)
            }
          },
          error: (err: any) => {
            this.sendMessage("Dodawanie obrazka nie powiodło się", NotificationMessageType.ERROR)
            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

  ngOnInit(): void {
  }
}
