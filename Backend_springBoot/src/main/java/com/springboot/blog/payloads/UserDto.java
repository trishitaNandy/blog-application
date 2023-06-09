package com.springboot.blog.payloads;



import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.springboot.blog.entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	
	@Override
	public String toString() {
		return "UserDto [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", about="
				+ about + ", roles=" + roles + "]";
	}

	private int id;
	
	@NotBlank
	@Size(min=4, message="Username must be min of 4 characters")
	private String name;
	
	@NotBlank
	@Email(message="Email address is not valid !!")
	private String email;
	
	@NotBlank
	@Size(min=3, max=10, message="Password must be minimum of 3 chars and maximum of 10 chars !!")
	private String password;
	
	@NotBlank
	private String about;
	
	private Set<RoleDto> roles=new HashSet<>();
	
	@JsonIgnore
	public String getPassString() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password=password;
	}
}
