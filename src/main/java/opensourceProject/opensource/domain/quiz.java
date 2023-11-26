package opensourceProject.opensource.domain;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class quiz {

    @Id
    private final String id;
    @Id
    private String question;

    private String answer;
    private Date date;
    private int isChceked;

    public quiz(Users users) {
        id = users.getId();
    }

    public String getId() {
        return id;
    }

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return this.answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getIsChceked() {
        return this.isChceked;
    }

    public void setIsChceked(int isChceked) {
        this.isChceked = isChceked;
    }
}
