package com.contestracker.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class EmailService {

        @Value("${resend.api.key}")
        private String apiKey;

        public void sendVerificationOtp(
                        String email,
                        String otp) {

                String body = """
                                {
                                  "from": "onboarding@resend.dev",
                                  "to": ["%s"],
                                  "subject": "Contest Tracker Verification OTP",
                                  "html": "<h2>Your verification OTP is: %s</h2>"
                                }
                                """.formatted(email, otp);

                sendEmail(body);
        }

        public void sendResetPasswordOtp(
                        String email,
                        String otp) {

                String body = """
                                {
                                  "from": "onboarding@resend.dev",
                                  "to": ["%s"],
                                  "subject": "Contest Tracker Password Reset OTP",
                                  "html": "<h2>Your password reset OTP is: %s</h2>"
                                }
                                """.formatted(email, otp);

                sendEmail(body);
        }

        private void sendEmail(String body) {

                HttpRequest request = HttpRequest.newBuilder()
                                .uri(
                                                URI.create(
                                                                "https://api.resend.com/emails"))
                                .header(
                                                "Authorization",
                                                "Bearer " + apiKey)
                                .header(
                                                "Content-Type",
                                                "application/json")
                                .POST(
                                                HttpRequest.BodyPublishers
                                                                .ofString(body))
                                .build();

                try {

                        HttpResponse<String> response = HttpClient.newHttpClient()
                                        .send(request, HttpResponse.BodyHandlers.ofString());

                        System.out.println("Status: " + response.statusCode());
                        System.out.println("Response: " + response.body());

                        if (response.statusCode() >= 400) {
                                throw new RuntimeException(
                                                "Resend API Error: " + response.statusCode() + " - " + response.body());
                        }

                } catch (
                                IOException | InterruptedException e) {
                        throw new RuntimeException(e);
                }
        }
}