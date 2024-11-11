package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserCourseRequestDto {
    private List<Waypoint> waypoints;
    private double distance;
    private int duration;
    private double pace;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Waypoint {
        private double lat;
        private double lon;
        private String timestamp;
    }

    public UserCourse toEntity(User user) {
        return UserCourse.builder()
                .user(user)
                .distance(this.distance)
                .duration(this.duration)
                .pace(this.pace)
                .build();
    }
}