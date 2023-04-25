package hupiat.intranet.server.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Short> {

    Optional<Account> findByName(String username);
}
