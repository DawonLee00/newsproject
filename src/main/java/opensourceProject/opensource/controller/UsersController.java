package opensourceProject.opensource.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.JsonObject;

import opensourceProject.opensource.domain.Users;
import opensourceProject.opensource.service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("new")
    public String create(@RequestBody UsersForm form) {
        Users users = new Users();

        users.setId(form.getId());
        users.setPasswd(form.getPasswd());
        users.setName(form.getName());
        users.setOld(form.getOld());

        usersService.join(users);

        JsonObject jo = new JsonObject();

        jo.addProperty("Message", "Signin success.");
        return jo.toString();
    }

    @PostMapping("login")
    public String login(@RequestBody UsersForm form) {
        Users users = new Users();
        users.setId(form.getId());
        users.setPasswd(form.getPasswd());

        JsonObject jo = new JsonObject();

        if (usersService.login(users.getId(), users.getPasswd())) {

            jo.addProperty("Message", "lonin success.");
            return jo.toString();

        } else {
            jo.addProperty("Message", "lonin failed.");
            return jo.toString();
        }
    }

}
