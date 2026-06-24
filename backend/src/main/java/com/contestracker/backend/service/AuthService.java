package com.contestracker.backend.service;

import com.contestracker.backend.dto.JwtResponse;
import com.contestracker.backend.dto.LoginRequest;
import com.contestracker.backend.dto.RegisterRequest;
import com.contestracker.backend.model.User;
import com.contestracker.backend.repository.UserRepository;
import com.contestracker.backend.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public String register(RegisterRequest request) {

        User existingUser = userRepository.findByEmail(
                request.getEmail()).orElse(null);

        if (existingUser != null) {

            if (existingUser.isVerified()) {
                return "Email already registered";
            }

            String otp = String.valueOf(
                    100000 + new Random().nextInt(900000));

            existingUser.setOtp(otp);
            existingUser.setOtpExpiry(
                    LocalDateTime.now().plusMinutes(5));

            userRepository.save(existingUser);

            emailService.sendVerificationOtp(
                    existingUser.getEmail(),
                    otp);

            return "Unverified account found. OTP resent.";
        }

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .verified(false)
                .otp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(5))
                .build();

        userRepository.save(user);

        emailService.sendVerificationOtp(
                user.getEmail(),
                otp);

        return "User registered successfully. Verify OTP.";
    }

    public String verifyOtp(String email, String otp) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()) {
            return "User already verified";
        }

        if (user.getOtp() == null || user.getOtpExpiry() == null) {
            return "No active OTP found";
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return "OTP expired";
        }

        if (!otp.equals(user.getOtp())) {
            return "Invalid OTP";
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Email verified successfully";
    }

    public JwtResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email first");
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new JwtResponse(token);
    }
    
    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = String.valueOf(
                100000 + new java.util.Random().nextInt(900000));

        user.setOtp(otp);
        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        emailService.sendResetPasswordOtp(
                user.getEmail(),
                otp);

        return "Password reset OTP sent";
    }

    public String resetPassword(
            String email,
            String otp,
            String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!otp.equals(user.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Password reset successful";
    }

    public String resendOtp(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        user.setOtp(otp);
        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        System.out.println("NEW OTP = " + otp);

        return "OTP resent successfully";
    }
}