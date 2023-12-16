package opensourceProject.opensource.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;

import jakarta.servlet.http.HttpSession;
import opensourceProject.opensource.domain.Keyword;
import opensourceProject.opensource.domain.Users;
import opensourceProject.opensource.service.KeywordService;

@RestController
@RequestMapping("/keyword")
@CrossOrigin(origins = "http://localhost:3000")
public class KeywordController {
    private final KeywordService keywordService;
    private final Users users;

    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
        users = new Users();
    }

    @PostMapping("new")
    public String create(@RequestBody List<KeywordForm> forms) {
        JsonObject jo = new JsonObject();

        keywordService.dropAllKeywords();

        for (KeywordForm form : forms) {
            Keyword keyword = new Keyword(users);
            keyword.setId(form.getId());
            keyword.setWord(form.getWord());
            System.out.println(form.getWord());

            int filter = form.getFilter();
            keyword.setFilter(filter);
            System.out.println("-------------------------------------------------------");
            System.out.println(form.getId());
            System.out.println(form.getWord());
            System.out.println(filter);
            System.out.println("-------------------------------------------------------");
            String result = keywordService.join(keyword);

            if ("duplicate".equals(result)) {
                jo.addProperty("Message", "Keyword duplication error.");
                return jo.toString();
            }
        }

        jo.addProperty("Message", "Signin success.");
        return jo.toString();
    }

}
