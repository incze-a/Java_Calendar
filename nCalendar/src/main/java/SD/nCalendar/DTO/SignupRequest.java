package SD.nCalendar.DTO;

import java.time.LocalTime;

public class SignupRequest {

    private String username;
    private String email;
    private String password;
    private LocalTime userDayStart;
    private LocalTime userDayEnd;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public LocalTime getUserDayStart() {
        return userDayStart;
    }

    public LocalTime getUserDayEnd() {
        return userDayEnd;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserDayStart(LocalTime userDayStart) {
        this.userDayStart = userDayStart;
    }

    public void setUserDayEnd(LocalTime userDayEnd) {
        this.userDayEnd = userDayEnd;
    }
}
