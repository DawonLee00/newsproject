package opensourceProject.opensource.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {

    @GetMapping("/api/hello")
    public String hello(Model model) {
        return "hello World";
    }

}