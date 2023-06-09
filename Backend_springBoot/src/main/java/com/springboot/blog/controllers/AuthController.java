package com.springboot.blog.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.blog.entities.User;
import com.springboot.blog.exceptions.ApiException;
import com.springboot.blog.payloads.JwtAuthRequest;
import com.springboot.blog.payloads.JwtAuthResponse;
import com.springboot.blog.payloads.UserDto;
import com.springboot.blog.security.JwtTokenHelper;
import com.springboot.blog.services.UserService;

@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception{
		this.authenticate(request.getUsername(), request.getPassword());
		
		UserDetails userDetails= this.userDetailsService.loadUserByUsername(request.getUsername());
		
		String token = this.jwtTokenHelper.generateToken(userDetails);
		
		
		
		JwtAuthResponse response=new JwtAuthResponse();
		response.setToken(token);
		response.setUser(this.modelMapper.map((User)userDetails,UserDto.class));
	
		
		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception {
		UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username, password);
	
		try {
			this.authenticationManager.authenticate(authenticationToken);
			
		}
		catch(BadCredentialsException e) {
			System.out.println("Invalid details");
			throw new ApiException("Invalid username or password");
		}
		
	}
	//register new user api
	@PostMapping("/register")
	public ResponseEntity<Integer> registerUser(@RequestBody UserDto userDto){
		System.out.println("This is inside controller"+userDto.toString());
		int registeredUserId = this.userService.registerNewUser(userDto);
		
		return new ResponseEntity<Integer>(registeredUserId,HttpStatus.CREATED);
	}
}
