package com.github.ohubert90.oauthgithublogin.oauth;

import com.github.ohubert90.oauthgithublogin.user.User;
import com.github.ohubert90.oauthgithublogin.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.ServletException; // Import korrigiert
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@RestController
public class OAuth2Controller {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public User getUser(@AuthenticationPrincipal OAuth2User principal) {
        String githubId = principal.getAttribute("id");
        User user = userRepository.findByGithubId(githubId);
        if (user == null) {
            user = new User();
            user.setGithubId(githubId);
            user.setUsername(principal.getAttribute("login"));
            user.setEmail(principal.getAttribute("email"));
            userRepository.save(user);
        }
        return user;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.logout();
        response.sendRedirect("/");
    }
}
