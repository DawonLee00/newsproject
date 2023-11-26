package opensourceProject.opensource.service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import opensourceProject.opensource.domain.Users;
import opensourceProject.opensource.repository.UsersRepository;

@Transactional
public class UsersService {
    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    // 회원가입
    public String join(Users users) {

        validateDuplicateUsers(users);

        usersRepository.save(users);
        return users.getId();
    }

    // 회원중복 검사
    private void validateDuplicateUsers(Users users) {
        usersRepository.findById(users.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디 입니다.");
                });
    }

    // 회원조회
    public List<Users> findUsers() {
        return usersRepository.findAll();
    }

    // 이름으로 유저 정보 찾기
    public Optional<Users> findOne(String name) {
        return usersRepository.findByName(name);
    }

    public Boolean login(String id, String passwd){
        if(usersRepository.login(id, passwd))
            return true;
        return false;
    }

}
