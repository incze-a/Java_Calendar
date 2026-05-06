package SD.nCalendar.service;

import SD.nCalendar.DTO.LoginRequest;
import SD.nCalendar.DTO.SignupRequest;
import SD.nCalendar.DTO.UserResponse;
import SD.nCalendar.model.User;
import SD.nCalendar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse signup(SignupRequest request) {
        validateSignup(request);

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(request.getPassword());

        user.setUserDayStart(
                request.getUserDayStart() != null
                        ? request.getUserDayStart()
                        : LocalTime.of(7, 0)
        );

        user.setUserDayEnd(
                request.getUserDayEnd() != null
                        ? request.getUserDayEnd()
                        : LocalTime.of(22, 0)
        );

        User saved = userRepository.save(user);

        return toResponse(saved);
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return toResponse(user);
    }

    public UserResponse getUser(Long id) {
        User user = findUserById(id);
        return toResponse(user);
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public UserResponse updateUsername(Long id, String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        User user = findUserById(id);
        user.setUsername(username.trim());

        return toResponse(userRepository.save(user));
    }

    public UserResponse updateDayBounds(Long id, LocalTime start, LocalTime end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Start and end times are required");
        }

        if (!start.isBefore(end)) {
            throw new IllegalArgumentException("Day start must be before day end");
        }

        User user = findUserById(id);
        user.setUserDayStart(start);
        user.setUserDayEnd(end);

        return toResponse(userRepository.save(user));
    }

    private void validateSignup(SignupRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (!EMAIL_PATTERN.matcher(request.getEmail().trim()).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (request.getUserDayStart() != null && request.getUserDayEnd() != null) {
            if (!request.getUserDayStart().isBefore(request.getUserDayEnd())) {
                throw new IllegalArgumentException("Day start must be before day end");
            }
        }
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getUserDayStart(),
                user.getUserDayEnd()
        );
    }
}