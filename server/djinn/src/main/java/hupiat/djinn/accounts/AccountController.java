package hupiat.djinn.accounts;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.djinn.core.controllers.ICommonController;

@RestController
@RequestMapping(ICommonController.API_PREFIX + "/" + ICommonController.API_ACCOUNTS)
public class AccountController implements ICommonController<AccountEntity> {

	private final AccountRepository accountRepository;
	private final AccountService accountService;

	public AccountController(AccountRepository accountRepository, AccountService accountService) {
		super();
		this.accountRepository = accountRepository;
		this.accountService = accountService;
	}

	@Override
	public List<AccountEntity> getAll() {
		return accountRepository.findAll();
	}

	@Override
	public AccountEntity getById(long id) {
		return accountRepository.findById(id).orElseThrow();
	}

	@Override
	public AccountEntity add(AccountEntity entity) {
		return accountService.insert(entity.getUsername(), entity.getEmail(), entity.getPassword());
	}

	@Override
	public AccountEntity update(AccountEntity entity) {
		return accountService.update(entity, true);
	}

	@Override
	public void delete(long id) {
		accountRepository.deleteById(id);
	}

}
