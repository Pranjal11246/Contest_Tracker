package com.contestracker.backend.controller;

import com.contestracker.backend.dto.ForgotPasswordRequest;
import com.contestracker.backend.dto.JwtResponse;
import com.contestracker.backend.dto.LoginRequest;
import com.contestracker.backend.dto.RegisterRequest;
import com.contestracker.backend.dto.ResetPasswordRequest;
import com.contestracker.backend.dto.VerifyOtpRequest;
import com.contestracker.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {
        System.out.println("REGISTER CONTROLLER HIT");
        return authService.register(request);
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {
        return authService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return authService.forgotPassword(
                request.getEmail()
        );
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(
                request.getEmail(),
                request.getOtp(),
                request.getNewPassword()
        );
    }

    @PostMapping("/resend-otp")
        public String resendOtp(@RequestParam String email) {
            return authService.resendOtp(email);
        }

}