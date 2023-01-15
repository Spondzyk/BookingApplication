package com.example.booking.services;

import org.springframework.web.multipart.MultipartFile;

public interface FilesStorageService {

    void init(String additionalPath);

    void save(MultipartFile file, String additionalPath);
}
