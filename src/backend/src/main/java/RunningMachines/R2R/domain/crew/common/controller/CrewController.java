package RunningMachines.R2R.domain.crew.common.controller;

import RunningMachines.R2R.domain.crew.common.dto.CrewCreateCommandDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewJoinRequestDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewMemberResponseDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewResponseDto;
import RunningMachines.R2R.domain.crew.common.service.CrewCommandService;
import RunningMachines.R2R.domain.crew.common.service.CrewQueryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/crew")
@RequiredArgsConstructor
public class CrewController {
    private final CrewCommandService crewCommandService;
    private final CrewQueryService crewQueryService;

    @PostMapping("/create")
    public ResponseEntity<Integer> createCrew(@RequestParam String title, @RequestPart MultipartFile certificationImage,@RequestPart MultipartFile profileImage) {
        CrewCreateCommandDto crewCreateCommandDto = CrewCreateCommandDto.builder()
                .title(title)
                .profileImage(profileImage)
                .certificationImage(certificationImage)
                .build();

        crewCreateCommandDto.validate();

        Integer crewPasscode = crewCommandService.createCrew(crewCreateCommandDto);

        return ResponseEntity.ok(crewPasscode);
    }

    @PostMapping("/{crewId}/join")
    public ResponseEntity<String> joinCrew(@PathVariable Long crewId, @RequestBody CrewJoinRequestDto crewJoinRequestDto) {
        crewCommandService.joinCrew(crewId, crewJoinRequestDto.getPasscode());
        return ResponseEntity.ok("크루에 성공적으로 가입했습니다.");
    }

    @GetMapping
    public ResponseEntity<List<CrewResponseDto>> getCrewList() {
        List<CrewResponseDto> crewResponseDtoList = crewQueryService.getAllCrews();
        return ResponseEntity.ok(crewResponseDtoList);
    }

    @GetMapping("/{crewId}/member")
    public ResponseEntity<CrewMemberResponseDto> getCrewMember(@PathVariable Long crewId) {
        CrewMemberResponseDto responseDto = crewQueryService.getCrewMember(crewId);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "크루 멤버 프로필 조회")
    @GetMapping("/{crewId}/member/{memberId}/{year}/{month}")
    public ResponseEntity<CrewMemberResponseDto> getCrewMember(
            @PathVariable Long crewId,
            @PathVariable Long memberId,
            @PathVariable int year,
            @PathVariable int month) {

        CrewMemberResponseDto responseDto = crewQueryService.getCrewMemberProfile(crewId, memberId, year, month);
        return ResponseEntity.ok(responseDto);
    }
}
