package opensourceProject.opensource.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import opensourceProject.opensource.domain.Users;
import opensourceProject.opensource.service.UsersService;

@Controller
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/users/new")
    public String createForm() {
        return "users/createUsersForm";
    }

    @PostMapping("/users/new")
    public String create(UsersForm form) {
        Users users = new Users();

        users.setId(form.getId());
        users.setPasswd(form.getPasswd());
        users.setName(form.getName());
        users.setOld(form.getOld());

        usersService.join(users);
        return "redirect:/";
    }

    @PostMapping("/users/login")
    public ResponseEntity<String> login(UsersForm form) {
        Users users = new Users();
        users.setId(form.getId());
        users.setPasswd(form.getPasswd());

        if (usersService.login(users.getId(), users.getPasswd())) {
            return ResponseEntity.ok("로그인 성공했습니다.");
        } else {
            return ResponseEntity.status(401).body("로그인 실패했습니다."); // 401은 Unauthorized 상태 코드입니다.
        }
    }

    @GetMapping("/users")
    public String list(org.springframework.ui.Model model) {
        List<Users> users = usersService.findUsers();
        model.addAttribute("users", users);
        return "users/usersList";
    }
}
