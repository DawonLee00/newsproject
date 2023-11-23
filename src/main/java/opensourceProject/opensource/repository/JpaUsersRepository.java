package opensourceProject.opensource.repository;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import opensourceProject.opensource.domain.Users;

public class JpaUsersRepository implements UsersRepository {

    private final EntityManager em;

    public JpaUsersRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Users save(Users users) {
        em.persist(users);
        return users;
    }

    @Override
    public Optional<Users> findById(String id) {
        List<Users> result = em.createQuery("select u from Users u where u.id = :id", Users.class)
                .setParameter("id", id)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Optional<Users> findByPasswd(String passwd) {
        Users users = em.find(Users.class, passwd);
        return Optional.ofNullable(users);
    }

    @Override
    public Optional<Users> findByName(String name) {
        Users users = em.find(Users.class, name);
        return Optional.ofNullable(users);
    }

    @Override
    public Optional<Users> findByOld(int old) {
        Users users = em.find(Users.class, old);
        return Optional.ofNullable(users);
    }

    @Override
    public List<Users> findAll() {
        return em.createQuery("select u from Users u", Users.class)
                .getResultList();
    }
}
