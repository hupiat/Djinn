package hupiat.djinn.core.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@GetMapping("/{path:[^\\.]*}")
	public String forward() {
		return "forward:/index.html";
	}
}
