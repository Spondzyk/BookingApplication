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
public class DeletePlaceFunctionalTest {
    @LocalServerPort
    private int port;

    @Test
    void shouldDeletePlace() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\mikol\\Desktop\\Booking\\chromedriver\\chromedriver.exe");
        String user = "rk@o2.pl";
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

        var plcResBtn = driver.findElement(By.id("place"));
        plcResBtn.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var cards = driver.findElements(By.tagName("app-single-place-card"));
        cards.get(0).click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var delete = driver.findElement(By.id("delete"));
        delete.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var cancelConfirmBtn = driver.findElement(By.id("yes"));
        cancelConfirmBtn.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        var alert = driver.findElement(By.className("single-notification"));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10L));

        Assertions.assertTrue(alert.getText().contains("Usunięto obiekt\n"));
        driver.close();
    }
}
