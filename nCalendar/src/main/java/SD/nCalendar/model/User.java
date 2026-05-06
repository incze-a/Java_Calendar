package SD.nCalendar.model;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name ="app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalTime userDayStart;
    @Column(nullable = false)
    private LocalTime userDayEnd;

    public User(Long id, String username, String password, String email, LocalTime userDayStart, LocalTime userDayEnd) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.userDayStart = userDayStart;
        this.userDayEnd = userDayEnd;
    }

    public User() {

    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public LocalTime getUserDayStart() {
        return userDayStart;
    }

    public void setUserDayStart(LocalTime userDayStart) {
        this.userDayStart = userDayStart;
    }

    public String getEmail() {
        return email;
    }

    public LocalTime getUserDayEnd() {
        return userDayEnd;
    }

    public void setUserDayEnd(LocalTime userDayEnd) {
        this.userDayEnd = userDayEnd;
    }
}
