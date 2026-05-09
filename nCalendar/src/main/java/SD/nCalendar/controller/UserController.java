package SD.nCalendar.controller;

import SD.nCalendar.DTO.LoginRequest;
import SD.nCalendar.DTO.SignupRequest;
import SD.nCalendar.DTO.UserResponse;
import SD.nCalendar.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/email-exists")
    public boolean emailExists(@RequestParam String email) {
        return userService.emailExists(email);
    }

    @PostMapping("/signup")
    public UserResponse signup(@RequestBody SignupRequest request) {
        return userService.signup(request);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PutMapping("/{id}/username")
    public UserResponse updateUsername(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        return userService.updateUsername(id, body.get("username"));
    }

    @PutMapping("/{id}/day-bounds")
    public UserResponse updateDayBounds(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        LocalTime start = LocalTime.parse(body.get("userDayStart"));
        LocalTime end = LocalTime.parse(body.get("userDayEnd"));

        return userService.updateDayBounds(id, start, end);
    }
}
