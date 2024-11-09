package hupiat.djinn.core.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import hupiat.djinn.core.entities.AbstractCommonEntity;

public interface ICommonController<E extends AbstractCommonEntity> {

	static final String API_PREFIX = "api";
	static final String API_ACCOUNTS = "accounts";

	@GetMapping
	List<E> getAll();

	@GetMapping("/{id}")
	E getById(long id);

	@PostMapping
	E add(E entity);

	@PutMapping
	E update(E entity);

	@DeleteMapping("/{id}")
	void delete(long id);
}
