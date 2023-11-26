/*
 * package opensourceProject.opensource.repository;
 * 
 * import java.util.ArrayList;
 * import java.util.HashMap;
 * import java.util.List;
 * import java.util.Map;
 * import java.util.Optional;
 * 
 * import org.springframework.stereotype.Repository;
 * 
 * import opensourceProject.opensource.domain.Users;
 * 
 * 
 * public class MemoryUsersRepository implements UsersRepository {
 * 
 * private static Map<Long, Users> store = new HashMap<>();
 * private static long sequence = 0l;
 * 
 * @Override
 * public Users save(Users users) {
 * users.setId(++sequence);
 * store.put(users.getId(), users);
 * return users;
 * }
 * 
 * @Override
 * public Optional<Users> findById(Long id) {
 * return Optional.ofNullable(store.get(id));
 * }
 * 
 * @Override
 * public Optional<Users> findByName(String name) {
 * return store.values().stream()
 * .filter(users -> users.getName().equals(name))
 * .findAny();
 * }
 * 
 * @Override
 * public List<Users> findAll() {
 * return new ArrayList<>(store.values());
 * }
 * 
 * public void clearStore() {
 * store.clear();
 * }
 * }
 */