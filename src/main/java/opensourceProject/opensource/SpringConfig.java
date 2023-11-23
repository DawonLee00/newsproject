package opensourceProject.opensource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.persistence.EntityManager;
import opensourceProject.opensource.repository.JpaUsersRepository;
import opensourceProject.opensource.repository.UsersRepository;
import opensourceProject.opensource.service.UsersService;

@Configuration
public class SpringConfig {

    private EntityManager em;

    public SpringConfig(EntityManager em) {
        this.em = em;
    }

    @Bean
    public UsersService usersService() {
        return new UsersService(usersRepository());
    }

    @Bean
    public UsersRepository usersRepository() {
        return new JpaUsersRepository(em);
    }
}
