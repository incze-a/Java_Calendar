package SD.nCalendar.DTO;

import java.time.LocalTime;

public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private LocalTime userDayStart;
    private LocalTime userDayEnd;

    public UserResponse(Long id, String username, String email,
                        LocalTime userDayStart, LocalTime userDayEnd) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.userDayStart = userDayStart;
        this.userDayEnd = userDayEnd;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public LocalTime getUserDayStart() {
        return userDayStart;
    }

    public LocalTime getUserDayEnd() {
        return userDayEnd;
    }
}
