package opensourceProject.opensource.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class area {

    @Id
    private final String id;
    @Id
    private String region;

    public area(Users users) {
        id = users.getId();
    }

    public String getId() {
        return this.id;
    }

    public String getRegion() {
        return this.region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

}
