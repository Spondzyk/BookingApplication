package com.example.booking.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {

    private Path root;

    public Path getRoot() {
        return root;
    }

    public void setRoot(String additionalPath) {
        String path = "src/main/resources/booking-angular/src/assets/images/Places/" + additionalPath;
        this.root = Paths.get(path);
    }

    @Override
    public void init(String additionalPath) {
        try {
            setRoot(additionalPath);
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile file, String additionalPath) {
        try {
            this.init(additionalPath);
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean delete(String directory, String filename) {
        try {
            setRoot(directory);
            Path file = root.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
