package com.example.booking.controlers;

import com.example.booking.message.ResponseMessage;
import com.example.booking.services.FilesStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
@Controller
@RequestMapping("/api")
public class FilesController {

    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("folderPath") String folderPath) {
        String message = "";
        try {
            storageService.save(file, folderPath);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseMessage> deleteFile(@RequestParam("filename") String filename,
                                                      @RequestParam("directory") String dir) {
        String message = "";

        try {
            boolean existed = storageService.delete(dir, filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage(message));
        }
    }

}
