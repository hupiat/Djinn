package hupiat.djinn.core.controllers;

import org.springframework.web.bind.annotation.GetMapping;

public class IndexController {

	@GetMapping("/{path:[^\\.]*}")
	public String forward() {
		return "forward:/index.html";
	}
}
