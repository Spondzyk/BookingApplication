package com.example.booking;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CancelReservationFunctionalTest {
    @LocalServerPort
    private int port;


    @Test
    void shouldCancelReservation() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Konrad\\IdeaProjects\\BookingApplication\\chromedriver\\chromedriver.exe");
        String user = "orzel@gmail.com";
        String password = "pass";
        WebDriver driver = new ChromeDriver();
        driver.get(String.format("http://localhost:%d", port));

        var usernameInput = driver.findElement(By.id("username"));
        var passwordInput = driver.findElement(By.id("password"));

        usernameInput.sendKeys(user);
        passwordInput.sendKeys(password);

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));
        var signButton = driver.findElement(By.className("btn"));
        signButton.click();

        var navResBtn = driver.findElement(By.id("res-nav-btn"));
        navResBtn.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var cards = driver.findElements(By.tagName("mat-card"));
        cards.get(0).click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var cancelBtn = driver.findElement(By.id("cancel-btn"));
        cancelBtn.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var cancelConfirmBtn = driver.findElement(By.id("cancel-yes"));
        cancelConfirmBtn.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var alert = driver.findElement(By.className("single-notification"));
        var status = driver.findElement(By.className("container__status"));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        Assertions.assertTrue(alert.getText().contains("Booking cnaceled succesfully\n"));
        Assertions.assertTrue(status.getText().contains("CANCELED"));
        driver.close();
    }

}
