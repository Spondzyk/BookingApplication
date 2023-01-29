package com.example.booking;

import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Place;
import com.example.booking.models.User;
import com.example.booking.repositories.PlaceRepository;
import com.example.booking.repositories.UserRepository;
import com.example.booking.services.PlaceService;
import com.example.booking.services.UserService;
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
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;
    private User expectedUser;
    private static final Long TEST_ID = 1L;

    @BeforeEach
    public void setUp() {
        expectedUser = new User.UserBuilder()
                .Id(TEST_ID)
                .build();
    }

    @Test
    public void findUserById() {
        //when
        when(userRepository.findById(any(Long.class))).thenReturn(Optional.of(expectedUser));
        //then
        User user = userService.getUserById(TEST_ID);
        Assertions.assertEquals(expectedUser, user);
    }

    @Test
    public void findUserByIdNoUser() {
        //when
        when(userRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        //then
        Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userService.getUserById(TEST_ID));
    }
}