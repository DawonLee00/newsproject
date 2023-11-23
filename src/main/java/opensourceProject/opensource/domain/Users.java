package opensourceProject.opensource.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Users {

    // 주키
    @Id
    private String id;
    private String passwd;
    private int old;
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public int getOld() {
        return old;
    }

    public void setOld(int old) {
        this.old = old;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
