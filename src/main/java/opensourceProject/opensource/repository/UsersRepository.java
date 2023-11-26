package opensourceProject.opensource.repository;

import java.util.List;
import java.util.Optional;

import opensourceProject.opensource.domain.Users;

public interface UsersRepository {
    Users save(Users users); // 사용자 저장

    Optional<Users> findById(String id);// 아이디 찾아오기

    Optional<Users> findByName(String name);// 이름 찾아오기

    Optional<Users> findByOld(int old);

    Optional<Users> findByPasswd(String passwd);

    Boolean login(String id, String passwd);

    List<Users> findAll();
}
