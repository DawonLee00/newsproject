package opensourceProject.opensource.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Keyword {

    @Id
    private final String id;
    @Id
    private String word;

    private int filter;

    // 외래키
    public Keyword(Users users) {
        this.id = users.getId();
    }

    public String getId() {
        return this.id;
    }

    public String getWord() {
        return this.word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public int getFilter() {
        return this.filter;
    }

    public void setFilter(int filter) {
        this.filter = filter;
    }

}
