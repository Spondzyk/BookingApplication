package com.example.booking.Dto;

import com.example.booking.models.Amenities;
import com.example.booking.models.TypeOfPlace;
import lombok.Data;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

@Data
public class PlaceDto {

    private long id;
    private String name;
    private String description;
    private String city;
    private String street;
    private String house_nr;
    private String image_folder_path;
    private TypeOfPlace type_of_place;
    private Set<Amenities> amenities;

    private Set<String> image_name_table;

    public void listFilesUsingDirectoryStream() throws IOException {
        Set<String> fileSet = new HashSet<>();
        String path_to_files = "src/main/resources/booking-angular/src" + image_folder_path.substring(8);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(path_to_files))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path)) {
                    fileSet.add(path.getFileName().toString());
                }
            }
        }
        this.setImage_name_table(fileSet);
    }

}
