package com.example.booking.util;

import lombok.NoArgsConstructor;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class FilesUtil {
    private static final String ANGULAR_DIR = "src/main/resources/booking-angular/src";

    public static List<String> listFilesUsingDirectoryStream(String imageFolderPath) throws IOException {
        List<String> listOfFiles = new ArrayList<>();
        String path_to_files = ANGULAR_DIR + imageFolderPath.substring(8);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(path_to_files))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path)) {
                    listOfFiles.add(imageFolderPath + "/" + path.getFileName().toString());
                }
            }
        }
        return listOfFiles;
    }
}
