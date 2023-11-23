/*
 * package opensourceProject.opensource.service;
 * 
 * import static org.junit.jupiter.api.Assertions.assertThrows;
 * import static org.junit.jupiter.api.Assertions.fail;
 * 
 * import org.assertj.core.api.Assertions;
 * import org.junit.jupiter.api.AfterEach;
 * import org.junit.jupiter.api.BeforeEach;
 * import org.junit.jupiter.api.Test;
 * 
 * import opensourceProject.opensource.domain.Users;
 * import opensourceProject.opensource.repository.MemoryUsersRepository;
 * 
 * public class UsersServiceTest {
 * 
 * UsersService usersService;
 * MemoryUsersRepository usersRepository;
 * 
 * @BeforeEach
 * public void BeforeEach() {
 * usersRepository = new MemoryUsersRepository();
 * usersService = new UsersService(usersRepository);
 * }
 * 
 * @AfterEach
 * public void afterEach() {
 * usersRepository.clearStore();
 * }
 * 
 * @Test
 * void testFindOne() {
 * // given
 * Users users = new Users();
 * users.setName("hello");
 * 
 * // when
 * Long saveId = usersService.join(users);
 * 
 * // then
 * Users findUsers = usersService.findOne(saveId).get();
 * Assertions.assertThat(users.getName()).isEqualTo(findUsers.getName());
 * }
 * 
 * @Test
 * public void 중복_회원_예외() {
 * // given
 * Users users1 = new Users();
 * users1.setName("spring");
 * 
 * Users users2 = new Users();
 * users2.setName("spring");
 * 
 * // when
 * usersService.join(users1);
 * IllegalStateException e = assertThrows(IllegalStateException.class, () ->
 * usersService.join(users2));
 * 
 * /*
 * try {
 * usersService.join(users2);
 * fail();
 * } catch (IllegalStateException e) {
 * Assertions.assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
 * }
 *
 * // then
 * 
 * }
 * 
 * @Test
 * void testFindUsers() {
 * 
 * }
 * 
 * @Test
 * void testJoin() {
 * 
 * }
 * }
 */