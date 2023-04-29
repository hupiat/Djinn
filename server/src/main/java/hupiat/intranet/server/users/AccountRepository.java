package hupiat.intranet.server.users;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Short> {

	Optional<Account> findByName(String username);

	List<Account> findByNameIn(Set<String> usernames);
}
