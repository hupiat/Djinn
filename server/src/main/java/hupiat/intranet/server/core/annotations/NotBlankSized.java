package hupiat.intranet.server.core.annotations;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@NotBlank
@Size
public @interface NotBlankSized {

	int min() default 0;

	int max() default Integer.MAX_VALUE;
}
