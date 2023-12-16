package opensourceProject.opensource.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.IdClass;
import jakarta.persistence.IdClass;

@Entity
@IdClass(KeywordId.class)
public class Keyword {

    @Id
    @Column(name = "id")
    private String id;

    @Id
    @Column(name = "word")
    private String word;

    private int filter;

    public Keyword() {
        this.id = "admin";
    }

    // 외래키
    public Keyword(Users users) {
        this.id = users.getId();
    }

    public Keyword(String id, String word, int filter) {
        this.id = id;
        this.word = word;
        this.filter = filter;
    }

    public void setId(String id) {
        this.id = id;
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
