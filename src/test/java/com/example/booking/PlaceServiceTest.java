package com.example.booking;

import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Place;
import com.example.booking.repositories.PlaceRepository;
import com.example.booking.services.PlaceService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class PlaceServiceTest {

    @Mock
    private PlaceRepository placeRepository;

    @InjectMocks
    private PlaceService placeService;
    private Place expectedPlace;
    private static final Long TEST_ID = 1L;

    @BeforeEach
    public void setUp() {
        expectedPlace = new Place.PlaceBuilder()
                .id(TEST_ID)
                .build();
    }

    @Test
    public void findPlaceById() {
        //when
        when(placeRepository.findById(any(Long.class))).thenReturn(Optional.of(expectedPlace));
        //then
        Place place = placeService.getPlaceById(TEST_ID);
        Assertions.assertEquals(expectedPlace, place);
    }

    @Test
    public void findPlaceByIdNoReservation() {
        //when
        when(placeRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        //then
        Assertions.assertThrows(ResourceNotFoundException.class,
                () -> placeService.getPlaceById(TEST_ID));
    }
}
