/*
 * package opensourceProject.opensource.repository;
 * 
 * import org.assertj.core.api.Assertions;
 * import org.junit.jupiter.api.AfterEach;
 * import org.junit.jupiter.api.Test;
 * 
 * import opensourceProject.opensource.domain.Users;
 * import opensourceProject.opensource.repository.MemoryUsersRepository;
 * 
 * public class memoryUsersRepository {
 * MemoryUsersRepository repository = new MemoryUsersRepository();
 * 
 * @AfterEach
 * public void afterEach() {
 * repository.clearStore();
 * }
 * 
 * @Test
 * public void save() {
 * Users users = new Users();
 * users.setName("윤지환");
 * 
 * repository.save(users);
 * 
 * Users result = repository.findById(users.getId()).get();
 * Assertions.assertThat(users).isEqualTo(result);
 * 
 * }
 * 
 * @Test
 * public void findByName() {
 * Users users1 = new Users();
 * users1.setName("이다원");
 * repository.save(users1);
 * 
 * Users users2 = new Users();
 * users2.setName("정재훈");
 * repository.save(users2);
 * 
 * Users result = repository.findByName("이다원").get();
 * 
 * Assertions.assertThat(result).isEqualTo(users2);
 * }
 * 
 * }
 */